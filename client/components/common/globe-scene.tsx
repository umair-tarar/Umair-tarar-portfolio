import { MutableRefObject, ReactNode, Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cssColor } from "@/lib/three-colors";

const R = 1.6;

type Place = { name: string; label?: string; lat: number; lon: number; home?: boolean; dx?: number; dy?: number };

// Faisalabad is the home base; the other countries are the markets served.
const HOME: Place = { name: "Pakistan", lat: 31.4, lon: 73.1, home: true };
const MARKETS: Place[] = [
  { name: "United Kingdom", lat: 54.0, lon: -2.5, dx: -34, dy: -14 },
  { name: "France", lat: 46.6, lon: 2.3, dx: -62, dy: 8 },
  { name: "Spain", lat: 40.2, lon: -3.6, dx: -44, dy: 34 },
  { name: "Italy", lat: 42.8, lon: 12.5, dx: 46, dy: 30 },
  { name: "USA", lat: 39.5, lon: -98.0 },
  { name: "Canada", lat: 56.5, lon: -100.0 },
  { name: "UAE", label: "Dubai · UAE", lat: 24.3, lon: 54.4, dx: -30, dy: 26 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
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

// start fetching the Earth texture as soon as this module is loaded
useLoader.preload(THREE.TextureLoader, "/earth.webp");

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
      el.style.transform = `translate(${x + (PLACES[i].dx ?? 0)}px, ${y + (PLACES[i].dy ?? 0)}px) translate(-50%, -135%)`;
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


function randomShell(count: number, rMin: number, rMax: number) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = rMin + Math.random() * (rMax - rMin);
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
    arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.8;
    arr[i * 3 + 2] = r * Math.cos(ph) - 6;
  }
  return arr;
}

function glowTexture(color: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function ShootingStar({ seed }: { seed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const st = useRef({ next: 1.5 + seed * 2.6, dur: 1.1, x: -4, y: 2 });
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const s = st.current;
    const p = (t - s.next) / s.dur;
    if (p < 0) {
      m.visible = false;
      return;
    }
    if (p > 1) {
      s.next = t + 3 + Math.random() * 5;
      s.x = Math.random() * 9 - 7;
      s.y = 1.2 + Math.random() * 3;
      m.visible = false;
      return;
    }
    m.visible = true;
    m.position.set(s.x + p * 5, s.y - p * 2.4, -3);
    (m.material as THREE.MeshBasicMaterial).opacity = Math.sin(p * Math.PI) * 0.9;
  });
  return (
    <mesh ref={ref} rotation={[0, 0, -0.45]} visible={false}>
      <planeGeometry args={[1.7, 0.025]} />
      <meshBasicMaterial color="#cfe8ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

/** Deep-space backdrop: drifting star layers, soft nebula glows, shooting stars. */
function Space() {
  const s1 = useRef<THREE.Points>(null);
  const s2 = useRef<THREE.Points>(null);
  const neb = useRef<(THREE.Sprite | null)[]>([]);
  const pos1 = useMemo(() => randomShell(520, 9, 24), []);
  const pos2 = useMemo(() => randomShell(240, 7, 18), []);
  const nebulae = useMemo(
    () => [
      { tex: glowTexture("rgba(56,120,255,0.95)"), p: [-5.5, 2.2, -9], s: 15 },
      { tex: glowTexture("rgba(125,85,255,0.85)"), p: [6.5, -2.4, -10], s: 17 },
      { tex: glowTexture("rgba(30,205,255,0.8)"), p: [1, 3.6, -11], s: 13 },
    ],
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (s1.current) {
      s1.current.rotation.y = t * 0.012;
      s1.current.rotation.x = t * 0.004;
      (s1.current.material as THREE.PointsMaterial).opacity = 0.7 + 0.25 * Math.sin(t * 1.7);
    }
    if (s2.current) {
      s2.current.rotation.y = -t * 0.02;
      (s2.current.material as THREE.PointsMaterial).opacity = 0.55 + 0.35 * Math.sin(t * 2.3 + 1);
    }
    neb.current.forEach((sp, i) => {
      if (!sp) return;
      sp.position.x = nebulae[i].p[0] + Math.sin(t * 0.08 + i * 2) * 0.9;
      sp.position.y = nebulae[i].p[1] + Math.cos(t * 0.06 + i) * 0.5;
    });
  });

  return (
    <>
      {nebulae.map((n, i) => (
        <sprite
          key={i}
          ref={(el) => (neb.current[i] = el)}
          position={n.p as [number, number, number]}
          scale={[n.s, n.s, 1]}
        >
          <spriteMaterial map={n.tex} transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      ))}
      <points ref={s1}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos1, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#BFD8FF" size={0.05} sizeAttenuation transparent opacity={0.8} depthWrite={false} />
      </points>
      <points ref={s2}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos2, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#7DD3FC" size={0.085} sizeAttenuation transparent opacity={0.7} depthWrite={false} />
      </points>
      <ShootingStar seed={0} />
      <ShootingStar seed={1} />
    </>
  );
}

/** Tilted orbit rings with satellites circling the planet. */
function Orbits() {
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g1.current) g1.current.rotation.y = t * 0.12;
    if (g2.current) g2.current.rotation.y = -t * 0.09;
    const a1 = t * 0.75;
    a.current?.position.set(Math.cos(a1) * 2.55, 0, Math.sin(a1) * 2.55);
    const a2 = t * 0.5 + 2;
    b.current?.position.set(Math.cos(a2) * 2.95, 0, Math.sin(a2) * 2.95);
    const a3 = t * 0.5 + 5;
    c.current?.position.set(Math.cos(a3) * 2.95, 0, Math.sin(a3) * 2.95);
  });

  return (
    <>
      <group ref={g1} rotation={[1.15, 0, 0.35]}>
        <mesh>
          <torusGeometry args={[2.55, 0.007, 8, 180]} />
          <meshBasicMaterial color="#7DB0FF" transparent opacity={0.5} />
        </mesh>
        <mesh ref={a}>
          <sphereGeometry args={[0.06, 14, 14]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
      <group ref={g2} rotation={[0.55, 0, -0.5]}>
        <mesh>
          <torusGeometry args={[2.95, 0.005, 8, 180]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.35} />
        </mesh>
        <mesh ref={b}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshBasicMaterial color="#9ED0FF" />
        </mesh>
        <mesh ref={c}>
          <sphereGeometry args={[0.04, 14, 14]} />
          <meshBasicMaterial color="#C4B5FD" />
        </mesh>
      </group>
    </>
  );
}

/** Moves the globe to the right on wide screens so text can sit on the left. */
function GlobeRig({ children }: { children: ReactNode }) {
  const size = useThree((s) => s.size);
  const aspect = size.width / size.height;
  const x = aspect > 1.35 ? Math.min(3.3, 1.08 * aspect) : 0;
  return (
    <group position={[x, 0, 0]} scale={aspect > 1.35 ? 0.8 : 1}>
      {children}
    </group>
  );
}

/** Camera drifts slightly with the mouse for depth. */
function ParallaxCamera() {
  const { camera } = useThree();
  const p = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      p.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame(() => {
    camera.position.x += (p.current.x * 0.7 - camera.position.x) * 0.03;
    camera.position.y += (-p.current.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
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

export default function GlobeScene({ active = true }: { active?: boolean }) {
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
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.4]}
        camera={{ position: [0, 0, 6.4], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 3, 6]} intensity={30} color="#9CC7FF" />
        <ParallaxCamera />
        <Space />
        <Suspense fallback={null}>
          <GlobeRig>
            <Atmosphere />
            <Orbits />
            <Earth drag={drag} labels={labels} />
          </GlobeRig>
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
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold shadow-lg ${
                p.home
                  ? "border-white/70 bg-white text-[#0A1030]"
                  : "border-sky-300/60 bg-[#0A1030]/85 text-sky-100"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${p.home ? "bg-[#2563EB]" : "bg-sky-300"}`} />
              {p.home ? "Pakistan · Home" : p.label ?? p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
