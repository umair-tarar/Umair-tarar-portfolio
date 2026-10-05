import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cssColor } from "@/lib/three-colors";

// layer i spans y from TOP - i*STEP down; radii narrow towards the bottom
const TOP = 2.4;
const STEP = 1.2;
const H = 1.14;
const RADII = [2.25, 1.8, 1.38, 0.96, 0.56]; // boundaries between layers
const COLORS = ["#1B2F8A", "#2147B8", "#2563EB", "#3B82F6"];
const SHIFT = 0.3; // whole funnel sits slightly higher to leave room for the caption
const LABELS = ["Awareness", "Consideration", "Decision", "Action"];

function radiusAt(y: number) {
  const k = Math.min(1, Math.max(0, (TOP - y) / (STEP * 4)));
  const f = k * 4;
  const i = Math.min(3, Math.floor(f));
  return RADII[i] + (RADII[i + 1] - RADII[i]) * (f - i);
}

function Flow({ color }: { color: THREE.Color }) {
  const ref = useRef<THREE.Points>(null);
  const N = 110;
  const state = useMemo(
    () =>
      Array.from({ length: N }, () => ({
        y: TOP - Math.random() * STEP * 4,
        a: Math.random() * Math.PI * 2,
        rr: 0.2 + Math.random() * 0.75,
        v: 0.5 + Math.random() * 0.8,
      })),
    [],
  );
  const positions = useMemo(() => new Float32Array(N * 3), []);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    state.forEach((p, i) => {
      p.y -= delta * p.v * (0.6 + (TOP - p.y) * 0.05);
      p.a += delta * 0.6;
      if (p.y < -TOP - 0.4) {
        p.y = TOP + Math.random() * 0.3;
        p.a = Math.random() * Math.PI * 2;
      }
      const r = radiusAt(Math.max(-TOP, p.y)) * p.rr;
      positions[i * 3] = Math.cos(p.a) * r;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = Math.sin(p.a) * r;
    });
    (pts.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#DFF1FF" size={0.2} sizeAttenuation transparent opacity={1} depthWrite={false} />
    </points>
  );
}

function FunnelMesh() {
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const light = useMemo(() => cssColor("--brand-light", "#7DB0FF"), []);

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.35;
    if (glow.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.12;
      glow.current.scale.setScalar(s);
    }
  });

  return (
    <>
      <group ref={group} position={[0, SHIFT, 0]} rotation={[0.28, 0, 0]}>
        {LABELS.map((_, i) => {
          const y = TOP - i * STEP - STEP / 2 + 0.03;
          return (
            <group key={i} position={[0, y, 0]}>
              <mesh>
                <cylinderGeometry args={[RADII[i], RADII[i + 1], H, 48, 1, true]} />
                <meshStandardMaterial
                  color={COLORS[i]}
                  emissive={COLORS[i]}
                  emissiveIntensity={0.55}
                  transparent
                  opacity={0.5}
                  side={THREE.DoubleSide}
                  roughness={0.35}
                  metalness={0.3}
                />
              </mesh>
              <lineSegments>
                <edgesGeometry args={[new THREE.CylinderGeometry(RADII[i] * 1.003, RADII[i + 1] * 1.003, H, 20, 1, true), 10]} />
                <lineBasicMaterial color={light} transparent opacity={i === 3 ? 0.5 : 0.38} />
              </lineSegments>
            </group>
          );
        })}
        <Flow color={light} />
      </group>
      {/* glow at the exit */}
      <mesh position={[0, -TOP + SHIFT - 0.38, 0]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh ref={glow} position={[0, -TOP + SHIFT - 0.38, 0]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.95} depthWrite={false} />
      </mesh>
    </>
  );
}

/** 3D funnel with particles flowing from "Awareness" down to "Action". */
export default function Funnel3D() {
  return (
    <div className="relative mx-auto h-[500px] w-full max-w-md">
      <Canvas
        orthographic
        dpr={[1, 1.6]}
        camera={{ zoom: 76, position: [0, 0, 12] }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.9} />
        <pointLight position={[3, 4, 6]} intensity={35} color="#8FBFFF" />
        <FunnelMesh />
      </Canvas>

      {/* labels sit over each layer */}
      {LABELS.map((label, i) => {
        const yc = TOP - i * STEP - STEP / 2 + SHIFT;
        const top = ((3.29 - yc) / 6.58) * 100;
        return (
          <div
            key={label}
            className="pointer-events-none absolute inset-x-0 text-center text-sm font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            style={{ top: `${top}%`, transform: "translateY(-50%)" }}
          >
            {label}
          </div>
        );
      })}
      <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-sm font-bold text-brand">
        Calls · Directions · Bookings
      </p>
    </div>
  );
}
