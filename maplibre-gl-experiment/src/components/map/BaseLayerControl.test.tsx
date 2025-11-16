import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseLayerControl } from './BaseLayerControl';
import { useLocationStore } from '../../stores/locationStore';

// Mock the location store
vi.mock('../../stores/locationStore');

describe('BaseLayerControl', () => {
   const mockSetBaseLayer = vi.fn();

   beforeEach(() => {
      vi.clearAllMocks();
      vi.useRealTimers();

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: '-93.5272',
         baseLayer: 'satellite',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: vi.fn(),
         setLonInput: vi.fn(),
         setLocation: vi.fn(),
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });
   });

   it('should render all three layer options', () => {
      render(<BaseLayerControl />);

      expect(screen.getByRole('button', { name: /switch to street view/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /switch to satellite view/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /switch to hybrid view/i })).toBeInTheDocument();
   });

   it('should display correct labels and icons', () => {
      render(<BaseLayerControl />);

      expect(screen.getByText('Street')).toBeInTheDocument();
      expect(screen.getByText('Satellite')).toBeInTheDocument();
      expect(screen.getByText('Hybrid')).toBeInTheDocument();

      expect(screen.getByText('🗺️')).toBeInTheDocument();
      expect(screen.getByText('🛰️')).toBeInTheDocument();
      expect(screen.getByText('🌍')).toBeInTheDocument();
   });

   it('should mark satellite button as active by default', () => {
      render(<BaseLayerControl />);

      const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
      expect(satelliteButton).toHaveClass('bg-blue-600');
      expect(satelliteButton).toHaveAttribute('aria-pressed', 'true');
   });

   it('should mark street button as active when street is selected', () => {
      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: '-93.5272',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: vi.fn(),
         setLonInput: vi.fn(),
         setLocation: vi.fn(),
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<BaseLayerControl />);

      const streetButton = screen.getByRole('button', { name: /switch to street view/i });
      expect(streetButton).toHaveClass('bg-blue-600');
      expect(streetButton).toHaveAttribute('aria-pressed', 'true');
   });

   it('should mark hybrid button as active when hybrid is selected', () => {
      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: '-93.5272',
         baseLayer: 'hybrid',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: vi.fn(),
         setLonInput: vi.fn(),
         setLocation: vi.fn(),
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<BaseLayerControl />);

      const hybridButton = screen.getByRole('button', { name: /switch to hybrid view/i });
      expect(hybridButton).toHaveClass('bg-blue-600');
      expect(hybridButton).toHaveAttribute('aria-pressed', 'true');
   });

   it('should call setBaseLayer with "street" when street button is clicked', async () => {
      const user = userEvent.setup();
      render(<BaseLayerControl />);

      const streetButton = screen.getByRole('button', { name: /switch to street view/i });
      await user.click(streetButton);

      expect(mockSetBaseLayer).toHaveBeenCalledWith('street');
   });

   it('should call setBaseLayer with "satellite" when satellite button is clicked', async () => {
      const user = userEvent.setup();
      render(<BaseLayerControl />);

      const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
      await user.click(satelliteButton);

      expect(mockSetBaseLayer).toHaveBeenCalledWith('satellite');
   });

   it('should call setBaseLayer with "hybrid" when hybrid button is clicked', async () => {
      const user = userEvent.setup();
      render(<BaseLayerControl />);

      const hybridButton = screen.getByRole('button', { name: /switch to hybrid view/i });
      await user.click(hybridButton);

      expect(mockSetBaseLayer).toHaveBeenCalledWith('hybrid');
   });

   it('should apply hover styles to inactive buttons', () => {
      render(<BaseLayerControl />);

      const streetButton = screen.getByRole('button', { name: /switch to street view/i });
      expect(streetButton).toHaveClass('hover:bg-white/30');
   });

   it('should apply active styles to selected button', () => {
      render(<BaseLayerControl />);

      const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
      expect(satelliteButton).toHaveClass('bg-blue-600');
      expect(satelliteButton).toHaveClass('text-white');
   });

   it('should switch between layers when different buttons are clicked', async () => {
      const user = userEvent.setup();
      render(<BaseLayerControl />);

      // Click street
      await user.click(screen.getByRole('button', { name: /switch to street view/i }));
      expect(mockSetBaseLayer).toHaveBeenCalledWith('street');

      // Click hybrid
      await user.click(screen.getByRole('button', { name: /switch to hybrid view/i }));
      expect(mockSetBaseLayer).toHaveBeenCalledWith('hybrid');

      // Click satellite
      await user.click(screen.getByRole('button', { name: /switch to satellite view/i }));
      expect(mockSetBaseLayer).toHaveBeenCalledWith('satellite');

      expect(mockSetBaseLayer).toHaveBeenCalledTimes(3);
   });
});
