import { Box } from '@react-three/drei';
import { Position, Size } from '@/components/DowntownBuildings/types.ts';


const Building = ({ position, size, color }: { position: Position; size: Size; color: string }) => (
    <Box args={size} position={position}>
        <meshStandardMaterial color={color} />
    </Box>
);

export default Building;
