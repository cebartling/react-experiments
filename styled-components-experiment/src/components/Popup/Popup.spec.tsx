import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { Popup } from './index';
import React from 'react';

// Mock window.HTMLPopupElement
const mockShowPopup = vi.fn();
const mockHidePopup = vi.fn();

// Setup and cleanup
beforeEach(() => {
  vi.resetAllMocks();
  // Clear any previous mock implementations
  delete (window as any).HTMLPopupElement;
});

// Helper function to mock Popup API support
const mockPopupSupport = () => {
  (window as any).HTMLPopupElement = class HTMLPopupElement extends (
    HTMLElement
  ) {
    showPopup = mockShowPopup;
    hidePopup = mockHidePopup;
  };
};

// Mock theme for styled-components
const theme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
  },
};

// Wrapper component for styled-components
const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// Custom render method
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe('Popup Component', () => {
  describe('Basic Rendering', () => {
    it('renders trigger element correctly', () => {
      customRender(<Popup trigger={<button>Open</button>}>Content</Popup>);

      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('initially hides popup content when defaultOpen is false', () => {
      customRender(
        <Popup trigger={<button>Open</button>}>
          <div>Popup Content</div>
        </Popup>
      );

      expect(screen.queryByText('Popup Content')).not.toBeVisible();
    });

    it('shows popup content when defaultOpen is true', () => {
      customRender(
        <Popup trigger={<button>Open</button>} defaultOpen>
          <div>Popup Content</div>
        </Popup>
      );

      expect(screen.getByText('Popup Content')).toBeVisible();
    });
  });

  describe('Interactions', () => {
    it('opens popup when trigger is clicked', async () => {
      const user = userEvent.setup();

      customRender(
        <Popup trigger={<button>Open</button>}>
          <div>Popup Content</div>
        </Popup>
      );

      await user.click(screen.getByText('Open'));
      expect(screen.getByText('Popup Content')).toBeVisible();
    });

    it('closes popup when close button is clicked', async () => {
      const user = userEvent.setup();

      customRender(
        <Popup trigger={<button>Open</button>} defaultOpen>
          <div>Popup Content</div>
        </Popup>
      );

      await user.click(screen.getByLabelText('Close popup'));
      expect(screen.queryByText('Popup Content')).not.toBeVisible();
    });

    it('closes popup when clicking outside', async () => {
      const user = userEvent.setup();

      customRender(
        <>
          <div data-testid="outside">Outside</div>
          <Popup trigger={<button>Open</button>} defaultOpen>
            <div>Popup Content</div>
          </Popup>
        </>
      );

      await user.click(screen.getByTestId('outside'));
      expect(screen.queryByText('Popup Content')).not.toBeVisible();
    });

    it('calls onOpen callback when popup opens', async () => {
      const onOpen = vi.fn();
      const user = userEvent.setup();

      customRender(
        <Popup trigger={<button>Open</button>} onOpen={onOpen}>
          Content
        </Popup>
      );

      await user.click(screen.getByText('Open'));
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('calls onClose callback when popup closes', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      customRender(
        <Popup trigger={<button>Open</button>} defaultOpen onClose={onClose}>
          Content
        </Popup>
      );

      await user.click(screen.getByLabelText('Close popup'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Modern Popup API Support', () => {
    beforeEach(() => {
      mockPopupSupport();
    });

    // it('uses native popup API when supported', async () => {
    //   const user = userEvent.setup();
    //
    //   customRender(<Popup trigger={<button>Open</button>}>Content</Popup>);
    //
    //   await user.click(screen.getByText('Open'));
    //   expect(mockShowPopup).toHaveBeenCalled();
    // });

    // it('calls native hidePopup when closing', async () => {
    //   const user = userEvent.setup();
    //
    //   customRender(
    //     <Popup trigger={<button>Open</button>} defaultOpen>
    //       Content
    //     </Popup>
    //   );
    //
    //   await user.click(screen.getByLabelText('Close popup'));
    //   expect(mockHidePopup).toHaveBeenCalled();
    // });

    it('applies popup mode attribute correctly', () => {
      const { container } = customRender(
        <Popup trigger={<button>Open</button>} popupMode="hint">
          Content
        </Popup>
      );

      const popupElement = container.querySelector('[popup]');

      expect(popupElement?.getAttribute('popup')).toBe('hint');
    });
  });

  describe('Positioning and Dimensions', () => {
    it('applies custom position when provided', () => {
      const position = { x: 100, y: 200 };
      const { container } = customRender(
        <Popup trigger={<button>Open</button>} position={position} defaultOpen>
          Content
        </Popup>
      );

      const popup = container.querySelector('[role="dialog"]');

      expect(popup).toHaveStyle({
        left: '100px',
        top: '200px',
      });
    });

    it('applies custom dimensions when provided', () => {
      const dimensions = { width: 300, height: 400 };
      const { container } = customRender(
        <Popup
          trigger={<button>Open</button>}
          dimensions={dimensions}
          defaultOpen
        >
          Content
        </Popup>
      );

      const popup = container.querySelector('[role="dialog"]');

      expect(popup).toHaveStyle({
        width: '300px',
        height: '400px',
      });
    });
  });

  describe('Accessibility', () => {
    it('sets correct ARIA attributes for modal mode', () => {
      const { container } = customRender(
        <Popup trigger={<button>Open</button>} popupMode="modal" defaultOpen>
          Content
        </Popup>
      );

      const dialog = container.querySelector('[role="dialog"]');

      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('close button has accessible label', () => {
      customRender(
        <Popup trigger={<button>Open</button>} defaultOpen>
          Content
        </Popup>
      );

      expect(screen.getByLabelText('Close popup')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      customRender(
        <Popup trigger={<button>Open</button>} defaultOpen>
          {}
        </Popup>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles rapid open/close actions', async () => {
      const user = userEvent.setup();
      const onOpen = vi.fn();
      const onClose = vi.fn();

      customRender(
        <Popup
          trigger={<button>Open</button>}
          onOpen={onOpen}
          onClose={onClose}
        >
          Content
        </Popup>
      );

      // Rapid clicking
      await user.click(screen.getByText('Open'));
      await user.click(screen.getByLabelText('Close popup'));
      await user.click(screen.getByText('Open'));

      expect(onOpen).toHaveBeenCalledTimes(2);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('handles window resize', async () => {
      customRender(
        <Popup trigger={<button>Open</button>} defaultOpen>
          Content
        </Popup>
      );

      // Simulate window resize
      act(() => {
        global.dispatchEvent(new Event('resize'));
      });

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});
