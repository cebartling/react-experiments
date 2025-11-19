import { useGLTF } from '@react-three/drei';

const Model = ({ path, position }) => {
    const gtlf = useGLTF(path);
    return <primitive object={gtlf.} position={position} />;
};

const Downtown = () => (
    <>
        <Model path="old_building.glb" position={[0, 0, 0]} />
        <Model path="old_building.glb" position={[4, 0, 0]} />
    </>
);

export default Downtown;
