import type { Meta, StoryObj } from '@storybook/react';
import ResponsiveImage from './index';

const meta = {
  title: 'Components/ResponsiveImage',
  component: ResponsiveImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: 'number',
      description: 'Aspect ratio of the image container',
      defaultValue: 16 / 9,
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill'],
      description: 'How the image should fit within its container',
      defaultValue: 'cover',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    sources: {
      control: 'object',
      description: 'Array of image sources with their widths',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image',
      required: true,
    },
    fallbackSrc: {
      control: 'text',
      description: 'Fallback image source if main image fails to load',
    },
  },
} satisfies Meta<typeof ResponsiveImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sources: [
      { src: '/api/placeholder/400/300', width: 400 },
      { src: '/api/placeholder/800/600', width: 800 },
      { src: '/api/placeholder/1200/900', width: 1200 },
    ],
    alt: 'Example image',
    aspectRatio: 16 / 9,
  },
};

export const Square: Story = {
  args: {
    ...Default.args,
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

export const CustomStyling: Story = {
  args: {
    ...Default.args,
    className:
      'border-4 border-blue-500 rounded-lg overflow-hidden max-w-md mx-auto',
  },
};

export const Portrait: Story = {
  args: {
    ...Default.args,
    aspectRatio: 3 / 4,
  },
};
