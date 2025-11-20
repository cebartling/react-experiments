import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef } from 'react';
import type { Group } from 'three';

interface StorageTankProps {
  position: [number, number, number];
  radius: number;
  height: number;
  color: string;
}

function StorageTank({ position, radius, height, color }: StorageTankProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Main cylindrical tank */}
      <mesh
        position={[0, height / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Top dome */}
      <mesh position={[0, height, 0]}>
        <sphereGeometry args={[radius * 0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={hovered ? '#e0e0e0' : '#555555'}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Ladder */}
      <mesh position={[radius * 0.9, height / 2, 0]}>
        <boxGeometry args={[0.1, height, 0.1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Tank bands (horizontal stripes) */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, (height / 4) * (i + 1), 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[radius + 0.02, 0.05, 8, 32]} />
          <meshStandardMaterial color="#222222" metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

interface DistillationTowerProps {
  position: [number, number, number];
  radius: number;
  height: number;
}

function DistillationTower({ position, radius, height }: DistillationTowerProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<Group>(null);

  // Gentle rotation animation
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main tower */}
      <mesh
        position={[0, height / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[radius, radius * 1.2, height, 16]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#7a7a7a'}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Multiple trays/platforms */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[0, (height / 9) * (i + 1), 0]}>
          {/* Platform ring */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[radius * 1.3, 0.08, 8, 24]} />
            <meshStandardMaterial color="#444444" metalness={0.8} />
          </mesh>

          {/* Pipes extending from tower */}
          {i % 2 === 0 && (
            <mesh position={[radius * 1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, radius * 0.8, 8]} />
              <meshStandardMaterial color="#666666" metalness={0.9} />
            </mesh>
          )}
        </group>
      ))}

      {/* Top cap */}
      <mesh position={[0, height + radius * 0.5, 0]}>
        <coneGeometry args={[radius * 0.8, radius, 16]} />
        <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Exhaust pipe */}
      <mesh position={[0, height + radius * 1.2, 0]}>
        <cylinderGeometry args={[0.2, 0.2, radius * 1.5, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.8} />
      </mesh>

      {/* Flame (emissive) */}
      <mesh position={[0, height + radius * 2, 0]}>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff3300"
          emissiveIntensity={hovered ? 2 : 1}
        />
      </mesh>

      {/* Light from flame */}
      <pointLight
        position={[0, height + radius * 2, 0]}
        color="#ff6600"
        intensity={hovered ? 4 : 2}
        distance={10}
      />
    </group>
  );
}

interface PipelineProps {
  start: [number, number, number];
  end: [number, number, number];
  radius?: number;
  color?: string;
}

function Pipeline({ start, end, radius = 0.15, color = '#555555' }: PipelineProps) {
  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) +
    Math.pow(end[1] - start[1], 2) +
    Math.pow(end[2] - start[2], 2)
  );

  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  // Calculate rotation
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];

  const theta = Math.atan2(dx, dz);
  const phi = Math.atan2(Math.sqrt(dx * dx + dz * dz), dy);

  return (
    <mesh position={midpoint} rotation={[phi, theta, 0]}>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.3} />
    </mesh>
  );
}

function CoolingTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main hyperboloid shape (approximated with cylinders) */}
      {Array.from({ length: 10 }).map((_, i) => {
        const t = i / 10;
        const y = t * 12;
        // Hyperboloid shape: narrower in middle
        const radius = 2 + Math.pow(Math.abs(t - 0.5) * 2, 1.5) * 1.5;

        return (
          <mesh key={i} position={[0, y, 0]}>
            <cylinderGeometry args={[radius, radius, 1.3, 16]} />
            <meshStandardMaterial
              color="#8a8a8a"
              metalness={0.3}
              roughness={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        );
      })}

      {/* Steam effect (white spheres) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[Math.sin(i) * 0.5, 13 + i * 0.5, Math.cos(i) * 0.5]}>
          <sphereGeometry args={[0.4 + i * 0.1, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.6 - i * 0.1}
            emissive="#ffffff"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#3a3a3a" roughness={0.9} />
    </mesh>
  );
}

function OilRefineryScene() {
  return (
    <>
      <Ground />

      {/* Storage Tanks */}
      <StorageTank position={[-15, 0, -10]} radius={3} height={6} color="#c0c0c0" />
      <StorageTank position={[-15, 0, -3]} radius={3} height={6} color="#b0b0b0" />
      <StorageTank position={[-15, 0, 4]} radius={2.5} height={5} color="#d0d0d0" />
      <StorageTank position={[-8, 0, -8]} radius={2.8} height={7} color="#a8a8a8" />
      <StorageTank position={[-8, 0, 0]} radius={3.2} height={5.5} color="#c8c8c8" />

      {/* Distillation Towers */}
      <DistillationTower position={[0, 0, -5]} radius={1.5} height={18} />
      <DistillationTower position={[5, 0, -5]} radius={1.2} height={16} />
      <DistillationTower position={[10, 0, -3]} radius={1.8} height={20} />

      {/* Cooling Towers */}
      <CoolingTower position={[15, 0, 8]} />
      <CoolingTower position={[22, 0, 8]} />

      {/* Pipelines connecting structures */}
      <Pipeline start={[-15, 3, -10]} end={[0, 8, -5]} radius={0.2} color="#666666" />
      <Pipeline start={[-15, 3, -3]} end={[5, 7, -5]} radius={0.2} color="#666666" />
      <Pipeline start={[0, 10, -5]} end={[15, 6, 8]} radius={0.18} color="#555555" />
      <Pipeline start={[5, 9, -5]} end={[22, 6, 8]} radius={0.18} color="#555555" />

      {/* Ground-level pipes */}
      <Pipeline start={[-20, 0.5, -15]} end={[25, 0.5, -15]} radius={0.25} color="#777777" />
      <Pipeline start={[-20, 0.5, 15]} end={[25, 0.5, 15]} radius={0.25} color="#777777" />
    </>
  );
}

function Third() {
  return (
    <div className="w-screen h-screen bg-gray-900">
      <h1 className="absolute top-4 left-4 z-10 text-white text-3xl font-bold drop-shadow-lg">
        Oil Refinery Complex
      </h1>
      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-60 text-white p-4 rounded-lg max-w-xs">
        <h2 className="text-lg font-semibold mb-2">Controls</h2>
        <p className="text-sm mb-1">🖱️ Click + Drag: Rotate view</p>
        <p className="text-sm mb-1">🔍 Scroll: Zoom in/out</p>
        <p className="text-sm mb-3">👆 Hover: Highlight structures</p>
        <h2 className="text-lg font-semibold mb-2">Features</h2>
        <p className="text-sm mb-1">• 5 Storage tanks with domes</p>
        <p className="text-sm mb-1">• 3 Distillation towers with flames</p>
        <p className="text-sm mb-1">• 2 Cooling towers with steam</p>
        <p className="text-sm">• Interconnecting pipelines</p>
      </div>

      <Canvas
        camera={{ position: [25, 20, 25], fov: 60 }}
        shadows
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[20, 30, 20]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-20, 15, -20]} intensity={0.5} color="#4a90e2" />
        <pointLight position={[20, 10, 20]} intensity={0.4} color="#ffa500" />

        {/* Atmospheric fog effect */}
        <fog attach="fog" args={['#1a1a1a', 30, 100]} />

        <OilRefineryScene />

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={15}
          maxDistance={80}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}

export default Third;
