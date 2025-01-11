import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Box } from '../BoxScene/Box.tsx';
import { Canvas } from '@react-three/fiber';

describe('Box', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Canvas>
                <Box position={[0, 0, 0]} />
            </Canvas>,
        );
        expect(container).toBeTruthy();
    });
});
