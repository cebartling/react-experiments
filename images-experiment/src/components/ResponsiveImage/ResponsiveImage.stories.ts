import type { Meta, StoryObj } from '@storybook/react';
import { handlers } from '../../mocks/handlers';
import ResponsiveImage from './index';

const meta = {
  title: 'Components/ResponsiveImage',
  component: ResponsiveImage,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: handlers,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResponsiveImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using real images
export const WithRealImages: Story = {
  args: {
    sources: [
      { src: '/images/small.jpg', width: 400 },
      { src: '/images/medium.jpg', width: 800 },
      { src: '/images/large.jpg', width: 1200 },
    ],
    alt: 'Real images example',
    aspectRatio: 16 / 9,
  },
};

// Using placeholder images
export const WithPlaceholders: Story = {
  args: {
    sources: [
      { src: '/api/placeholder/400/300', width: 400 },
      { src: '/api/placeholder/800/600', width: 800 },
      { src: '/api/placeholder/1200/900', width: 1200 },
    ],
    alt: 'Placeholder images example',
    aspectRatio: 16 / 9,
  },
};

// Mixed usage
export const MixedImages: Story = {
  args: {
    sources: [
      { src: '/images/small.jpg', width: 400 }, // Real image
      { src: '/api/placeholder/800/600', width: 800 }, // Placeholder
      { src: '/images/large.jpg', width: 1200 }, // Real image
    ],
    alt: 'Mixed real and placeholder images',
    aspectRatio: 16 / 9,
  },
};
