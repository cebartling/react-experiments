import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Box } from './Box';

export function Scene() {
    return (
        <div className="h-screen w-full">
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Box position={[0, 0, 0]} />
                <OrbitControls />
            </Canvas>
        </div>
    );
}
