import { MutableRefObject, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cssColor } from "@/lib/three-colors";

const R = 1.6;
const HOME = { lat: 31.4, lon: 73.1 }; // Faisalabad
const MARKETS = [
  { name: "London", lat: 51.5, lon: -0.1 },
  { name: "New York", lat: 40.7, lon: -74.0 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "Toronto", lat: 43.7, lon: -79.4 },
  { name: "Sydney", lat: -33.9, lon: 151.2 },
];

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

function Globe({ drag }: { drag: MutableRefObject<DragState> }) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const brand = useMemo(() => cssColor("--brand", "#3B82F6"), []);
  const light = useMemo(() => cssColor("--brand-light", "#7DB0FF"), []);
  const accent = useMemo(() => cssColor("--accent2", "#38BDF8"), []);

  const data = useMemo(() => {
    // dotted sphere (Fibonacci distribution)
    const N = 1500;
    const dots = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * golden;
      dots[i * 3] = Math.cos(th) * r * R * 1.004;
      dots[i * 3 + 1] = y * R * 1.004;
      dots[i * 3 + 2] = Math.sin(th) * r * R * 1.004;
    }

    const home = latLon(HOME.lat, HOME.lon, R);
    const arcs = MARKETS.map((m) => {
      const end = latLon(m.lat, m.lon, R);
      const mid = home.clone().add(end).normalize().multiplyScalar(R * (1.35 + home.distanceTo(end) * 0.08));
      return new THREE.QuadraticBezierCurve3(home, mid, end).getPoints(60);
    });
    const lines = arcs.map(
      (pts) =>
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: light, transparent: true, opacity: 0.7 }),
        ),
    );
    const pins = MARKETS.map((m) => latLon(m.lat, m.lon, R * 1.01));
    const baseRotation = Math.atan2(home.z, home.x) - Math.PI / 2;
    return { dots, arcs, lines, pins, home, baseRotation };
  }, [light]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (drag.current.pending) {
      g.rotation.y += drag.current.pending;
      drag.current.pending = 0;
    }
    if (!drag.current.active) {
      g.rotation.y += delta * 0.12 + drag.current.vel;
      drag.current.vel *= 0.94;
    }
    const t = state.clock.elapsedTime;
    pulses.current.forEach((m, i) => {
      if (!m) return;
      const pts = data.arcs[i];
      const k = (t * 0.22 + i * 0.19) % 1;
      m.position.copy(pts[Math.min(pts.length - 1, Math.floor(k * pts.length))]);
    });
  });

  return (
    <group ref={group} rotation={[0.38, data.baseRotation, 0]}>
      {/* body */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial color="#071236" metalness={0.2} roughness={0.8} emissive="#0B1B5A" emissiveIntensity={0.35} />
      </mesh>
      {/* dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.dots, 3]} />
        </bufferGeometry>
        <pointsMaterial color={light} size={0.026} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
      </points>
      {/* atmosphere */}
      <mesh scale={1.07}>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color={brand} transparent opacity={0.07} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* connection arcs */}
      {data.lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
      {data.arcs.map((_, i) => (
        <mesh key={`p${i}`} ref={(m) => (pulses.current[i] = m)}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* market pins */}
      {data.pins.map((p, i) => (
        <mesh key={`m${i}`} position={p}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      ))}
      {/* home pin */}
      <mesh position={data.home.clone().multiplyScalar(1.01)}>
        <sphereGeometry args={[0.085, 20, 20]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={data.home.clone().multiplyScalar(1.01)}>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshBasicMaterial color={brand} transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function GlobeScene() {
  const drag = useRef<DragState>({ active: false, vel: 0, pending: 0 });
  const last = useRef<{ x: number; id: number } | null>(null);

  return (
    <div
      className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={(e) => {
        drag.current.active = true;
        last.current = { x: e.clientX, id: e.pointerId };
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
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 3, 5]} intensity={30} color="#7DB0FF" />
        <pointLight position={[-4, -2, 3]} intensity={14} color="#38BDF8" />
        <Globe drag={drag} />
      </Canvas>
    </div>
  );
}
