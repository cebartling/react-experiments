import styled from 'styled-components';

import { Card } from './index';

import type { Meta, StoryObj } from '@storybook/react';

// Create a wrapper for dark theme preview
const DarkThemeWrapper = styled.div`
  padding: 20px;
  background: #1a1a1a;
`;

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['low', 'medium', 'high'],
      description: 'Controls the shadow elevation of the card',
    },
    title: {
      control: 'text',
      description: 'Main heading of the card',
    },
    subtitle: {
      control: 'text',
      description: 'Secondary text below the title',
    },
    width: {
      control: 'text',
      description: 'Width of the card (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Height of the card (CSS value)',
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler',
    },
    children: {
      control: 'text',
      description: 'Content inside the card',
    },
  },
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Base Card story
export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    children: 'This is the main content of the card.',
    elevation: 'low',
    width: '300px',
  },
};

// Different elevation levels
export const LowElevation: Story = {
  args: {
    ...Default.args,
    elevation: 'low',
  },
};

export const MediumElevation: Story = {
  args: {
    ...Default.args,
    elevation: 'medium',
  },
};

export const HighElevation: Story = {
  args: {
    ...Default.args,
    elevation: 'high',
  },
};

// Interactive card
export const Clickable: Story = {
  args: {
    ...Default.args,
    onClick: () => alert('Card clicked!'),
  },
};

// Card without title and subtitle
export const ContentOnly: Story = {
  args: {
    children: 'A card with just content and no title or subtitle.',
    elevation: 'low',
    width: '300px',
  },
};

// Card with custom dimensions
export const CustomSize: Story = {
  args: {
    ...Default.args,
    width: '400px',
    height: '200px',
  },
};

// Card with long content
export const LongContent: Story = {
  args: {
    title: 'Long Content Example',
    subtitle: 'This card contains a longer piece of content',
    children: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
      enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat.
    `,
    width: '300px',
  },
};

// Card with rich content
export const RichContent: Story = {
  args: {
    title: 'Rich Content Card',
    subtitle: 'Contains different types of content',
    children: (
      <>
        <img
          src="/api/placeholder/280/160"
          alt="Placeholder"
          style={{ marginBottom: '16px', width: '100%', borderRadius: '4px' }}
        />
        <p>This card contains an image and text content.</p>
        <button
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Action Button
        </button>
      </>
    ),
    width: '300px',
  },
};

// Dark theme example
export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <DarkThemeWrapper>
        <Story />
      </DarkThemeWrapper>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    theme: 'dark',
  },
  args: {
    ...Default.args,
    title: 'Dark Theme Card',
    subtitle: 'Card with dark theme styling',
  },
};
