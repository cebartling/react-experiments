import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

interface BuildingProps {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  color: string;
}

function Building({ position, width, height, depth, color }: BuildingProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Main building */}
      <mesh
        position={[0, height / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Building windows (facade detail) */}
      {Array.from({ length: Math.floor(height / 0.8) }).map((_, floor) => (
        <group key={floor}>
          {Array.from({ length: 3 }).map((_, col) => (
            <mesh
              key={col}
              position={[
                (col - 1) * (width / 4),
                floor * 0.8 + 0.4,
                depth / 2 + 0.01,
              ]}
            >
              <boxGeometry args={[0.2, 0.3, 0.02]} />
              <meshStandardMaterial
                color={hovered ? '#ffff00' : '#87ceeb'}
                emissive={hovered ? '#ffff00' : '#4a90a4'}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#2d2d2d" roughness={0.8} />
    </mesh>
  );
}

function Street() {
  return (
    <>
      {/* Main street running north-south */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[4, 50]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Street markings */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.01, i * 5 - 22.5]}
        >
          <planeGeometry args={[0.2, 2]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>
      ))}

      {/* Cross street running east-west */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </>
  );
}

function DowntownScene() {
  const buildings = [
    // Left side of street
    {
      position: [-6, 0, -10] as [number, number, number],
      width: 3,
      height: 8,
      depth: 3,
      color: '#4a5568',
    },
    {
      position: [-6, 0, -4] as [number, number, number],
      width: 2.5,
      height: 12,
      depth: 2.5,
      color: '#2d3748',
    },
    {
      position: [-7, 0, 2] as [number, number, number],
      width: 4,
      height: 6,
      depth: 4,
      color: '#1a202c',
    },
    {
      position: [-6, 0, 8] as [number, number, number],
      width: 3,
      height: 10,
      depth: 3,
      color: '#2c5282',
    },

    // Right side of street
    {
      position: [6, 0, -12] as [number, number, number],
      width: 3.5,
      height: 15,
      depth: 3.5,
      color: '#744210',
    },
    {
      position: [7, 0, -5] as [number, number, number],
      width: 3,
      height: 7,
      depth: 3,
      color: '#553c9a',
    },
    {
      position: [6, 0, 1] as [number, number, number],
      width: 2.8,
      height: 9,
      depth: 2.8,
      color: '#2f855a',
    },
    {
      position: [6.5, 0, 7] as [number, number, number],
      width: 4,
      height: 11,
      depth: 4,
      color: '#742a2a',
    },

    // Behind - creating depth
    {
      position: [-12, 0, -8] as [number, number, number],
      width: 3,
      height: 5,
      depth: 3,
      color: '#4a5568',
    },
    {
      position: [-12, 0, 5] as [number, number, number],
      width: 2.5,
      height: 7,
      depth: 2.5,
      color: '#2d3748',
    },
    {
      position: [12, 0, -10] as [number, number, number],
      width: 3.5,
      height: 6,
      depth: 3.5,
      color: '#2c5282',
    },
    {
      position: [12, 0, 3] as [number, number, number],
      width: 3,
      height: 8,
      depth: 3,
      color: '#553c9a',
    },
  ];

  return (
    <>
      <Ground />
      <Street />
      {buildings.map((building, index) => (
        <Building key={index} {...building} />
      ))}
    </>
  );
}

function Second() {
  return (
    <div className="w-screen h-screen">
      <h1 className="absolute top-4 left-4 z-10 text-white text-3xl font-bold drop-shadow-lg">
        Downtown Scene
      </h1>
      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-4 rounded-lg">
        <p className="text-sm">Click and drag to rotate</p>
        <p className="text-sm">Scroll to zoom</p>
        <p className="text-sm">Hover over buildings</p>
      </div>
      <Canvas camera={{ position: [15, 15, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ffa500" />
        <pointLight position={[10, 5, 10]} intensity={0.3} color="#4a90e2" />

        <DowntownScene />

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
}

export default Second;
