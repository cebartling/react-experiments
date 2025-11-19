import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const Scene = () => {
  return (
    <Canvas>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Camera Controls */}
      <PerspectiveCamera makeDefault position={[10, 10, 10]} />
      <OrbitControls />

      {/* Add your content here */}
    </Canvas>
  );
};

export default Scene;
