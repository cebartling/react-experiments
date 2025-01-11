import { RootState, ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

export function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((_state: RootState, delta: number): void => {
        meshRef.current.rotation.x += delta;
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}
