import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Crosshair } from './Crosshair';

describe('Crosshair', () => {
   const defaultProps = {
      visible: true,
      latitude: 44.7975,
      longitude: -93.5272,
   };

   it('should render crosshair when visible is true', () => {
      const { container } = render(<Crosshair {...defaultProps} />);

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
      const { container } = render(<Crosshair {...defaultProps} visible={false} />);

      // Should return null, so no elements should be rendered
      const crosshairContainer = container.querySelector('.absolute.inset-0');
      expect(crosshairContainer).not.toBeInTheDocument();
   });

   it('should have pointer-events-none to not interfere with map interactions', () => {
      const { container } = render(<Crosshair {...defaultProps} />);

      const crosshairContainer = container.querySelector('.pointer-events-none');
      expect(crosshairContainer).toBeInTheDocument();
   });

   it('should display latitude and longitude in coordinate popup', () => {
      render(<Crosshair {...defaultProps} />);

      expect(screen.getByText('Lat: 44.7975')).toBeInTheDocument();
      expect(screen.getByText('Lon: -93.5272')).toBeInTheDocument();
   });

   it('should format coordinates to 4 decimal places', () => {
      render(<Crosshair visible={true} latitude={40.71283456789} longitude={-74.00598765432} />);

      expect(screen.getByText('Lat: 40.7128')).toBeInTheDocument();
      expect(screen.getByText('Lon: -74.0060')).toBeInTheDocument();
   });

   it('should display negative coordinates correctly', () => {
      render(<Crosshair visible={true} latitude={-33.8688} longitude={151.2093} />);

      expect(screen.getByText('Lat: -33.8688')).toBeInTheDocument();
      expect(screen.getByText('Lon: 151.2093')).toBeInTheDocument();
   });
});
