import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it, vi } from 'vitest';

import { Card } from './index';

// Mock theme for testing
const theme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
  },
};

// Wrapper component for styled-components theme
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// Custom render method that includes the ThemeProvider
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe('Card Component', () => {
  // Basic Rendering Tests
  describe('Rendering', () => {
    it('renders children content correctly', () => {
      customRender(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
      customRender(<Card title="Test Title">Content</Card>);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders subtitle when provided', () => {
      customRender(<Card subtitle="Test Subtitle">Content</Card>);
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('does not render title when not provided', () => {
      const { container } = customRender(<Card>Content</Card>);

      expect(container.querySelector('h2')).not.toBeInTheDocument();
    });

    it('does not render subtitle when not provided', () => {
      customRender(<Card>Content</Card>);
      const paragraphs = screen.queryAllByText(
        (_, element) => element?.tagName.toLowerCase() === 'p'
      );

      expect(paragraphs.length).toBe(0);
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();

      customRender(<Card onClick={handleClick}>Clickable Card</Card>);

      fireEvent.click(screen.getByText('Clickable Card'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when no handler provided', () => {
      const handleClick = vi.fn();

      customRender(<Card>Non-clickable Card</Card>);

      fireEvent.click(screen.getByText('Non-clickable Card'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Style Tests
  describe('Styling', () => {
    it('applies custom width when provided', () => {
      const { container } = customRender(<Card width="500px">Wide Card</Card>);
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveStyle({ width: '500px' });
    });

    it('applies custom height when provided', () => {
      const { container } = customRender(<Card height="300px">Tall Card</Card>);
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveStyle({ height: '300px' });
    });

    it('applies different elevation styles', () => {
      const { rerender, container } = customRender(
        <Card elevation="low">Content</Card>
      );
      const getCard = () => container.firstChild as HTMLElement;

      // Test low elevation (default)
      expect(getCard()).toHaveStyle({
        'box-shadow':
          '0 2px 4px rgba(0, 0, 0, 0.05),0 1px 2px rgba(0, 0, 0, 0.04)',
      });

      // Test medium elevation
      rerender(
        <AllTheProviders>
          <Card elevation="medium">Content</Card>
        </AllTheProviders>
      );
      expect(getCard()).toHaveStyle({
        'box-shadow':
          '0 8px 16px rgba(0, 0, 0, 0.10),0 4px 8px rgba(0, 0, 0, 0.08)',
      });

      // Test high elevation
      rerender(
        <AllTheProviders>
          <Card elevation="high">Content</Card>
        </AllTheProviders>
      );
      expect(getCard()).toHaveStyle({
        'box-shadow':
          '0 16px 24px rgba(0, 0, 0, 0.14),0 6px 12px rgba(0, 0, 0, 0.12)',
      });
    });
  });

  // Theme Tests
  describe('Theme Integration', () => {
    it('uses theme colors correctly', () => {
      const customTheme = {
        colors: {
          background: '#f0f0f0',
          text: '#222222',
          textSecondary: '#444444',
        },
      };

      const { container } = render(
        <ThemeProvider theme={customTheme}>
          <Card title="Themed Title" subtitle="Themed Subtitle">
            Content
          </Card>
        </ThemeProvider>
      );

      const card = container.firstChild as HTMLElement;
      const title = screen.getByText('Themed Title');
      const subtitle = screen.getByText('Themed Subtitle');

      expect(card).toHaveStyle({ background: '#f0f0f0' });
      expect(title).toHaveStyle({ color: '#222222' });
      expect(subtitle).toHaveStyle({ color: '#444444' });
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    // it('has correct ARIA role when clickable', () => {
    //   const { container } = customRender(
    //     <Card onClick={() => {}}>Clickable Card</Card>
    //   );
    //   const card = container.firstChild as HTMLElement;
    //
    //   expect(card).toHaveAttribute('role', 'button');
    // });

    it('maintains heading hierarchy', () => {
      customRender(
        <Card title="Test Title" subtitle="Test Subtitle">
          Content
        </Card>
      );
      const heading = screen.getByText('Test Title');

      expect(heading.tagName).toBe('H2');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = customRender(<Card></Card>);

      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles very long content', () => {
      const longText = 'a'.repeat(1000);
      const { container } = customRender(<Card>{longText}</Card>);

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles HTML content in children', () => {
      customRender(
        <Card>
          <div data-testid="nested">
            <span>Nested Content</span>
          </div>
        </Card>
      );
      expect(screen.getByTestId('nested')).toBeInTheDocument();
      expect(screen.getByText('Nested Content')).toBeInTheDocument();
    });
  });
});
