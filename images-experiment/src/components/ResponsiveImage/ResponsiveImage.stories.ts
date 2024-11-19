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
  argTypes: {
    aspectRatio: {
      control: 'number',
      description: 'Aspect ratio of the image container',
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill'],
      description: 'How the image should fit within its container',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ResponsiveImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example stories using MSW-handled images
export const Default: Story = {
  args: {
    sources: [
      { src: '/images/small.jpg', width: 400 },
      { src: '/images/medium.jpg', width: 800 },
      { src: '/images/large.jpg', width: 1200 },
    ],
    alt: 'Responsive placeholder image',
    aspectRatio: 16 / 9,
  },
};

export const Square: Story = {
  args: {
    sources: [
      { src: '/api/placeholder/400/400', width: 400 },
      { src: '/api/placeholder/800/800', width: 800 },
      { src: '/api/placeholder/1200/1200', width: 1200 },
    ],
    alt: 'Square placeholder image',
    aspectRatio: 1,
  },
};

export const WithContainFit: Story = {
  args: {
    ...Default.args,
    objectFit: 'contain',
    className: 'bg-gray-100',
  },
};

export const ErrorState: Story = {
  args: {
    sources: [{ src: 'nonexistent-image.jpg', width: 400 }],
    alt: 'Image that will fail to load',
  },
};

export const Portrait: Story = {
  args: {
    sources: [
      { src: '/api/placeholder/300/400', width: 300 },
      { src: '/api/placeholder/600/800', width: 600 },
      { src: '/api/placeholder/900/1200', width: 900 },
    ],
    alt: 'Portrait placeholder image',
    aspectRatio: 3 / 4,
  },
};

export const CustomSizes: Story = {
  args: {
    sources: [
      { src: '/images/400x300.jpg', width: 400 },
      { src: '/images/800x600.jpg', width: 800 },
      { src: '/images/1200x900.jpg', width: 1200 },
    ],
    alt: 'Custom sized placeholder image',
    aspectRatio: 4 / 3,
  },
};
