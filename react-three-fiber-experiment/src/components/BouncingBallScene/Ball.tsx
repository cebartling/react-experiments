import { useSphere } from '@react-three/cannon';
import { BufferGeometry, Mesh, NormalBufferAttributes } from 'three';
import { Ref } from 'react';

const Ball = () => {
    // Use a sphere for the ball and give it dynamic physics
    const [ref] = useSphere(() => ({
        mass: 1,
        position: [0, 5, 0], // Start position
        args: [0.5], // Sphere radius
        restitution: 0.8, // Bounciness
    }));
    const typeSafeRef = ref as unknown as Ref<Mesh<BufferGeometry<NormalBufferAttributes>>>;

    return (
        <mesh ref={typeSafeRef} castShadow>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="blue" />
        </mesh>
    );
};

export default Ball;
