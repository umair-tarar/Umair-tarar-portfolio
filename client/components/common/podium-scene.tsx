import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cssColor } from "@/lib/three-colors";

const BARS = [
  { x: -1.5, h: 1.7, place: 2 },
  { x: 0, h: 2.6, place: 1 },
  { x: 1.5, h: 1.2, place: 3 },
];

function Scene({ rank }: { rank: number }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const pin = useRef<THREE.Group>(null);
  const brand = useMemo(() => new THREE.Color("#2563EB"), []);
  const dim = useMemo(() => new THREE.Color("#1E3A8A"), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const hi = rank <= 3 ? BARS.findIndex((b) => b.place === rank) : -1;

    BARS.forEach((b, i) => {
      const m = meshes.current[i];
      if (!m) return;
      const targetScale = i === hi ? b.h * 1.18 : b.h;
      m.scale.y += (targetScale - m.scale.y) * 0.08;
      m.position.y = m.scale.y / 2;
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.color.lerp(i === hi ? brand : dim, 0.08);
      mat.emissive.lerp(i === hi ? brand : dim, 0.08);
      mat.emissiveIntensity += ((i === hi ? 0.3 : 0.1) - mat.emissiveIntensity) * 0.08;
    });

    if (pin.current) {
      const tx = hi >= 0 ? BARS[hi].x : -3.1;
      const ty = (hi >= 0 ? BARS[hi].h * 1.18 + 0.75 : 0.85) + Math.sin(t * 2.2) * 0.12;
      pin.current.position.x += (tx - pin.current.position.x) * 0.07;
      pin.current.position.y += (ty - pin.current.position.y) * 0.07;
      pin.current.rotation.y = t * 0.8;
    }
  });

  return (
    <>
      {/* platform */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[3.4, 3.4, 0.12, 64]} />
        <meshStandardMaterial color="#0B1750" roughness={0.6} metalness={0.3} />
      </mesh>

      {BARS.map((b, i) => (
        <mesh key={b.place} ref={(m) => (meshes.current[i] = m)} position={[b.x, b.h / 2, 0]} scale={[1, b.h, 1]}>
          <boxGeometry args={[1.1, 1, 1.1]} />
          <meshStandardMaterial color="#1E3A8A" emissive="#1E3A8A" emissiveIntensity={0.12} roughness={0.35} metalness={0.4} />
        </mesh>
      ))}

      {/* "you" pin */}
      <group ref={pin} position={[-3.1, 0.85, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial color={brand} emissive={brand} emissiveIntensity={0.5} metalness={0.3} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.12, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.24, 0.5, 24]} />
          <meshStandardMaterial color={brand} emissive={brand} emissiveIntensity={0.5} metalness={0.3} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.25, 0.22]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </>
  );
}

/** 3D podium for the top three Map Pack spots. `rank` is the business position. */
export default function PodiumScene({ rank, active = true }: { rank: number; active?: boolean }) {
  return (
    <div className="relative h-[340px] w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.3]}
        camera={{ position: [0, 3.2, 10.8], fov: 36 }}
        onCreated={({ camera }) => camera.lookAt(0, 1.2, 0)}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 5, 5]} intensity={22} color="#8FBFFF" />
        <pointLight position={[-4, 2, 3]} intensity={16} color="#38BDF8" />
        <Scene rank={rank} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-10 text-sm font-bold text-white/80">
        <span className="w-16 text-center">#2</span>
        <span className="w-16 text-center">#1</span>
        <span className="w-16 text-center">#3</span>
      </div>
    </div>
  );
}
