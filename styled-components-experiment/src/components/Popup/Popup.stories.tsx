import type { Meta, StoryObj } from '@storybook/react';
import { Popup } from './index';
import styled from 'styled-components';

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  tags: ['autodocs'],
  argTypes: {
    popupMode: {
      control: 'select',
      options: ['popup', 'hint', 'modal'],
      description:
        'The mode of the popup (uses native Popup API when supported)',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the popup is open by default',
    },
    position: {
      control: 'object',
      description: 'Custom position coordinates',
    },
    dimensions: {
      control: 'object',
      description: 'Custom dimensions for the popup',
    },
    onOpen: {
      action: 'opened',
      description: 'Callback when popup opens',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when popup closes',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible popup component that uses the native Popup API when available, with fallback support for older browsers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popup>;

// Styled components for the stories
const PopupContent = styled.div`
  padding: 20px;
  max-width: 300px;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }
`;

const Card = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
`;

// Basic popup story
export const Basic: Story = {
  args: {
    trigger: <StyledButton>Open Popup</StyledButton>,
    children: (
      <PopupContent>
        <h3>Basic Popup</h3>
        <p>This is a basic popup with default settings.</p>
      </PopupContent>
    ),
    popupMode: 'popup',
    defaultOpen: false,
  },
};

// Hint popup
export const Hint: Story = {
  args: {
    trigger: <StyledButton>Hover for Hint</StyledButton>,
    children: (
      <PopupContent>
        <p>This is a hint popup that appears on hover.</p>
      </PopupContent>
    ),
    popupMode: 'hint',
    defaultOpen: false,
  },
};

// Modal popup
export const Modal: Story = {
  args: {
    trigger: <StyledButton>Open Modal</StyledButton>,
    children: (
      <PopupContent>
        <h3>Modal Popup</h3>
        <p>This popup appears as a modal dialog.</p>
        <StyledButton
          onClick={() => document.querySelector('[popup]')?.hidePopup?.()}
        >
          Close
        </StyledButton>
      </PopupContent>
    ),
    popupMode: 'modal',
    dimensions: { width: 400, height: 'auto' },
  },
};

// Custom positioned popup
export const CustomPosition: Story = {
  args: {
    trigger: <StyledButton>Custom Position</StyledButton>,
    children: (
      <PopupContent>
        <h3>Custom Position</h3>
        <p>This popup appears at specific coordinates.</p>
      </PopupContent>
    ),
    position: { x: 100, y: 100 },
  },
};

// Rich content popup
export const RichContent: Story = {
  args: {
    trigger: <StyledButton>Show Details</StyledButton>,
    children: (
      <Card>
        <h3>Product Details</h3>
        <img
          src="/api/placeholder/260/180"
          alt="Product"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '4px',
            marginBottom: '16px',
          }}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Grid>
          <div>
            <strong>Price:</strong>
            <p>$99.99</p>
          </div>
          <div>
            <strong>Rating:</strong>
            <p>★★★★☆</p>
          </div>
        </Grid>
        <StyledButton
          onClick={() => document.querySelector('[popup]')?.hidePopup?.()}
          style={{ marginTop: '16px', width: '100%' }}
        >
          Close
        </StyledButton>
      </Card>
    ),
    dimensions: { width: 300, height: 'auto' },
  },
};

// Interactive form popup
export const FormPopup: Story = {
  args: {
    trigger: <StyledButton>Open Form</StyledButton>,
    children: (
      <Card>
        <h3>Contact Form</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            document.querySelector('[popup]')?.hidePopup?.();
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            <label
              htmlFor="name"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              style={{ display: 'block', marginBottom: '4px' }}
            >
              Message:
            </label>
            <textarea
              id="message"
              rows={4}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            ></textarea>
          </div>
          <StyledButton type="submit">Submit</StyledButton>
        </form>
      </Card>
    ),
    dimensions: { width: 400, height: 'auto' },
    popupMode: 'modal',
  },
};

// Multi-step popup
export const MultiStep: Story = {
  args: {
    trigger: <StyledButton>Start Tutorial</StyledButton>,
    children: (
      <PopupContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#007AFF',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              1
            </div>
            <h3 style={{ margin: 0 }}>Welcome to the Tutorial</h3>
          </div>
          <p>This is the first step of the tutorial. Click next to continue.</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '16px',
            }}
          >
            <StyledButton
              onClick={() => document.querySelector('[popup]')?.hidePopup?.()}
              style={{ background: '#666' }}
            >
              Skip
            </StyledButton>
            <StyledButton>Next →</StyledButton>
          </div>
        </div>
      </PopupContent>
    ),
    dimensions: { width: 300, height: 'auto' },
  },
};
