import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Reads a space-separated RGB CSS variable (e.g. "255 0 176") as a THREE.Color. */
function cssColor(name: string, fallback: string) {
  try {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    const [r, g, b] = raw.split(/\s+/).map(Number);
    if ([r, g, b].some((v) => Number.isNaN(v))) return new THREE.Color(fallback);
    return new THREE.Color(r / 255, g / 255, b / 255);
  } catch {
    return new THREE.Color(fallback);
  }
}

/** Slowly drifting particle field that reacts a little to the mouse. */
function Particles({ color }: { color: THREE.Color }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 140;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi) - 1;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.07;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

/** A faint rotating wireframe shape behind the pin for a techy feel. */
function WireShape({ color }: { color: THREE.Color }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.22;
  });
  return (
    <mesh ref={ref} position={[0, 0.3, -1.2]}>
      <icosahedronGeometry args={[2.1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.13} />
    </mesh>
  );
}

/** Camera glides toward the mouse so the whole scene feels three-dimensional. */
function CameraRig() {
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
    camera.position.x += (p.current.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (0.5 - p.current.y * 0.8 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.3, 0);
  });
  return null;
}

function MapPin({ brand, accent }: { brand: THREE.Color; accent: THREE.Color }) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Mesh[]>([]);
  const orbs = useRef<THREE.Mesh[]>([]);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.6 + pointer.current.x * 0.9 + window.scrollY * 0.004;
      group.current.rotation.x = pointer.current.y * 0.35;
      group.current.position.y = Math.sin(t * 1.4) * 0.12;
    }
    rings.current.forEach((ring, i) => {
      const phase = (t * 0.5 + i / 3) % 1;
      const scale = 0.6 + phase * 1.6;
      ring.scale.set(scale, scale, scale);
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.55;
    });
    orbs.current.forEach((orb, i) => {
      const angle = t * (0.9 + i * 0.25) + (i * Math.PI * 2) / 3;
      orb.position.set(
        Math.cos(angle) * 1.55,
        0.4 + Math.sin(t + i) * 0.35,
        Math.sin(angle) * 1.55,
      );
    });
  });

  return (
    <>
      <group ref={group} rotation={[0, 0, 0]}>
        {/* pin head */}
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.62, 48, 48]} />
          <meshStandardMaterial
            color={brand}
            metalness={0.35}
            roughness={0.32}
            emissive={brand}
            emissiveIntensity={0.12}
          />
        </mesh>
        {/* pin tip */}
        <mesh position={[0, -0.32, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.5, 1.15, 48]} />
          <meshStandardMaterial
            color={brand}
            metalness={0.35}
            roughness={0.32}
            emissive={brand}
            emissiveIntensity={0.12}
          />
        </mesh>
        {/* inner dot */}
        <mesh position={[0, 0.55, 0.52]}>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>

      {/* ripple rings on the ground */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) rings.current[i] = m;
          }}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.9, 1, 64]} />
          <meshBasicMaterial color={brand} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* orbiting spheres */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`orb-${i}`}
          ref={(m) => {
            if (m) orbs.current[i] = m;
          }}
        >
          <sphereGeometry args={[0.13 + i * 0.03, 24, 24]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.6}
            metalness={0.3}
            roughness={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const brand = useMemo(() => cssColor("--pin", "#1d4ed8"), []);
  const accent = useMemo(() => cssColor("--orb", "#2563eb"), []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.4]}
      camera={{ position: [0, 0.5, 6.2], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 3, 4]} intensity={22} color={brand} />
      <pointLight position={[-4, 1, 3]} intensity={16} color={accent} />
      <directionalLight position={[0, 4, 5]} intensity={0.7} />
      <CameraRig />
      <WireShape color={brand} />
      <Particles color={brand} />
      <MapPin brand={brand} accent={accent} />
    </Canvas>
  );
}
