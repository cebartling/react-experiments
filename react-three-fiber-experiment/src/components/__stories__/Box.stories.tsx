import type { Meta, StoryObj } from '@storybook/react';
import { Canvas } from '@react-three/fiber';
import { Box } from '../Box';

const meta = {
    title: 'Components/Box',
    component: Box,
    decorators: [
        (Story) => (
            <div style={{ width: '100%', height: '400px' }}>
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Story />
                </Canvas>
            </div>
        ),
    ],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        position: [0, 0, 0],
    },
};
