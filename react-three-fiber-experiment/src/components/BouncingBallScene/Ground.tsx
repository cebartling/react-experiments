import { usePlane } from '@react-three/cannon';
import { Ref } from 'react';
import { BufferGeometry, Mesh, NormalBufferAttributes } from 'three';

const Ground = () => {
    // Use a plane for the ground with static physics
    const [ref] = usePlane(() => ({
        position: [0, 0, 0],
        rotation: [-Math.PI / 2, 0, 0], // Rotate to be horizontal
    }));
    const typeSafeRef = ref as unknown as Ref<Mesh<BufferGeometry<NormalBufferAttributes>>>;

    return (
        <mesh ref={typeSafeRef} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="green" />
        </mesh>
    );
};

export default Ground;
