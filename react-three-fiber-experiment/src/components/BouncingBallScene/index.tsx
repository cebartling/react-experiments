import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Ball from '@/components/BouncingBallScene/Ball';
import Ground from '@/components/BouncingBallScene/Ground.tsx';

const Scene = () => {
    return (
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
            {/* Add lights */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
            <Physics>
                <Ground />
                <Ball />
            </Physics>
            <OrbitControls />
        </Canvas>
    );
};

export default Scene;
