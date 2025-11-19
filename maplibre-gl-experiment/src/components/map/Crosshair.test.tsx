import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Crosshair } from './Crosshair';

describe('Crosshair', () => {
   it('should render crosshair when visible is true', () => {
      const { container } = render(<Crosshair visible={true} />);

      // Check that the crosshair container is rendered
      const crosshairContainer = container.querySelector('.absolute.inset-0');
      expect(crosshairContainer).toBeInTheDocument();

      // Check for horizontal and vertical lines
      const lines = container.querySelectorAll('.bg-red-500');
      expect(lines).toHaveLength(2);

      // Check for center circle
      const circle = container.querySelector('.rounded-full');
      expect(circle).toBeInTheDocument();
   });

   it('should not render when visible is false', () => {
      const { container } = render(<Crosshair visible={false} />);

      // Should return null, so no elements should be rendered
      const crosshairContainer = container.querySelector('.absolute.inset-0');
      expect(crosshairContainer).not.toBeInTheDocument();
   });

   it('should have pointer-events-none to not interfere with map interactions', () => {
      const { container } = render(<Crosshair visible={true} />);

      const crosshairContainer = container.querySelector('.pointer-events-none');
      expect(crosshairContainer).toBeInTheDocument();
   });
});
