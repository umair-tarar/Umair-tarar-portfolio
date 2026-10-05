import { MutableRefObject, Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { cssColor } from "@/lib/three-colors";

const R = 1.6;

type Place = { name: string; lat: number; lon: number; home?: boolean };

// Faisalabad is the home base; the other countries are the markets served.
const HOME: Place = { name: "Pakistan", lat: 31.4, lon: 73.1, home: true };
const MARKETS: Place[] = [
  { name: "United Kingdom", lat: 54.0, lon: -2.5 },
  { name: "USA", lat: 39.5, lon: -98.0 },
  { name: "Canada", lat: 56.5, lon: -100.0 },
  { name: "UAE", lat: 24.3, lon: 54.4 },
  { name: "Australia", lat: -25.5, lon: 134.0 },
];
const PLACES = [HOME, ...MARKETS];

function latLon(lat: number, lon: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

export type DragState = { active: boolean; vel: number; pending: number };

/** Soft blue rim light around the planet. */
const atmosphereMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
        gl_FragColor = vec4(0.30, 0.62, 1.0, 1.0) * intensity;
      }`,
  });

function Earth({
  drag,
  labels,
}: {
  drag: MutableRefObject<DragState>;
  labels: MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const texture = useLoader(THREE.TextureLoader, "/earth.webp");
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const light = useMemo(() => cssColor("--brand-light", "#7DB0FF"), []);

  const data = useMemo(() => {
    const home = latLon(HOME.lat, HOME.lon, R);
    const arcs = MARKETS.map((m) => {
      const end = latLon(m.lat, m.lon, R);
      const mid = home
        .clone()
        .add(end)
        .normalize()
        .multiplyScalar(R * (1.32 + home.distanceTo(end) * 0.09));
      return new THREE.QuadraticBezierCurve3(home, mid, end).getPoints(70);
    });
    const lines = arcs.map(
      (pts) =>
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: "#BFE3FF", transparent: true, opacity: 0.9 }),
        ),
    );
    const pins = PLACES.map((p) => latLon(p.lat, p.lon, R * 1.012));
    const baseRotation = Math.atan2(home.z, home.x) - Math.PI / 2;
    return { arcs, lines, pins, baseRotation };
  }, []);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (drag.current.pending) {
      g.rotation.y += drag.current.pending;
      drag.current.pending = 0;
    }
    if (!drag.current.active) {
      g.rotation.y += delta * 0.1 + drag.current.vel;
      drag.current.vel *= 0.94;
    }
    const t = state.clock.elapsedTime;

    // pulses travelling along the arcs
    pulses.current.forEach((m, i) => {
      if (!m) return;
      const pts = data.arcs[i];
      const k = (t * 0.2 + i * 0.17) % 1;
      m.position.copy(pts[Math.min(pts.length - 1, Math.floor(k * pts.length))]);
    });
    // expanding rings at the pins
    rings.current.forEach((m, i) => {
      if (!m) return;
      const q = (t * 0.6 + i * 0.23) % 1;
      m.scale.setScalar(0.6 + q * 1.8);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - q) * 0.7;
    });

    // keep the HTML country labels glued to their pins
    g.updateMatrixWorld();
    const cam = state.camera;
    const w = state.size.width;
    const h = state.size.height;
    data.pins.forEach((p, i) => {
      const el = labels.current[i];
      if (!el) return;
      tmp.copy(p).applyMatrix4(g.matrixWorld);
      const facing = tmp.dot(cam.position) > R * R * 1.02;
      tmp.project(cam);
      const x = (tmp.x * 0.5 + 0.5) * w;
      const y = (-tmp.y * 0.5 + 0.5) * h;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -135%)`;
      el.style.opacity = facing ? "1" : "0";
    });
  });

  return (
    <group ref={group} rotation={[0.34, data.baseRotation, 0]}>
      {/* planet */}
      <mesh>
        <sphereGeometry args={[R, 96, 96]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.55}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* connection arcs */}
      {data.lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
      {data.arcs.map((_, i) => (
        <mesh key={`p${i}`} ref={(m) => (pulses.current[i] = m)}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* pins with pulsing rings */}
      {data.pins.map((p, i) => {
        const home = PLACES[i].home;
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          p.clone().normalize(),
        );
        return (
          <group key={`pin${i}`} position={p} quaternion={quat}>
            <mesh>
              <sphereGeometry args={[home ? 0.065 : 0.045, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh ref={(m) => (rings.current[i] = m)}>
              <ringGeometry args={[home ? 0.1 : 0.07, home ? 0.12 : 0.085, 32]} />
              <meshBasicMaterial color={light} transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Atmosphere() {
  const mat = useMemo(atmosphereMaterial, []);
  return (
    <mesh scale={1.17}>
      <sphereGeometry args={[R, 64, 64]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

export default function GlobeScene() {
  const drag = useRef<DragState>({ active: false, vel: 0, pending: 0 });
  const last = useRef<{ x: number } | null>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div
      className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={(e) => {
        drag.current.active = true;
        last.current = { x: e.clientX };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current.active || !last.current) return;
        const dx = e.clientX - last.current.x;
        last.current.x = e.clientX;
        drag.current.pending += dx * 0.006;
        drag.current.vel = dx * 0.004;
      }}
      onPointerUp={() => {
        drag.current.active = false;
        last.current = null;
      }}
      onPointerCancel={() => {
        drag.current.active = false;
        last.current = null;
      }}
    >
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6.4], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 3, 6]} intensity={30} color="#9CC7FF" />
        <Suspense fallback={null}>
          <Atmosphere />
          <Earth drag={drag} labels={labels} />
        </Suspense>
      </Canvas>

      {/* country names that follow their pins */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PLACES.map((p, i) => (
          <div
            key={p.name}
            ref={(el) => (labels.current[i] = el)}
            className="absolute left-0 top-0 whitespace-nowrap opacity-0 transition-opacity duration-300"
          >
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold shadow-lg ${
                p.home
                  ? "border-white/70 bg-white text-[#0A1030]"
                  : "border-sky-300/60 bg-[#0A1030]/85 text-sky-100"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${p.home ? "bg-[#2563EB]" : "bg-sky-300"}`} />
              {p.home ? "Pakistan · Home" : p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
