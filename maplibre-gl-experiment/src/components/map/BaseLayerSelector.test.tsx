import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseLayerSelector } from './BaseLayerSelector';
import { useLocationStore } from '../../stores/locationStore';

// Mock the location store
vi.mock('../../stores/locationStore');

describe('BaseLayerSelector', () => {
   const mockSetBaseLayer = vi.fn();

   beforeEach(() => {
      vi.clearAllMocks();
      vi.useRealTimers();

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
   });

   it('should render all three base layer options', () => {
      render(<BaseLayerSelector />);

      expect(screen.getByText('Map Layer')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /switch to street view/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /switch to satellite view/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /switch to hybrid view/i })).toBeInTheDocument();
   });

   it('should highlight the current base layer', () => {
      render(<BaseLayerSelector />);

      const streetButton = screen.getByRole('button', { name: /switch to street view/i });
      expect(streetButton).toHaveAttribute('aria-pressed', 'true');
      expect(streetButton).toHaveClass('bg-blue-600');
   });

   it('should call setBaseLayer when street button is clicked', async () => {
      const user = userEvent.setup();

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

      render(<BaseLayerSelector />);

      const streetButton = screen.getByRole('button', { name: /switch to street view/i });
      await user.click(streetButton);

      expect(mockSetBaseLayer).toHaveBeenCalledWith('street');
   });

   it('should call setBaseLayer when satellite button is clicked', async () => {
      const user = userEvent.setup();
      render(<BaseLayerSelector />);

      const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
      await user.click(satelliteButton);

      expect(mockSetBaseLayer).toHaveBeenCalledWith('satellite');
   });

   it('should call setBaseLayer when hybrid button is clicked', async () => {
      const user = userEvent.setup();
      render(<BaseLayerSelector />);

      const hybridButton = screen.getByRole('button', { name: /switch to hybrid view/i });
      await user.click(hybridButton);

      expect(mockSetBaseLayer).toHaveBeenCalledWith('hybrid');
   });

   it('should highlight satellite layer when it is active', () => {
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

      render(<BaseLayerSelector />);

      const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
      expect(satelliteButton).toHaveAttribute('aria-pressed', 'true');
      expect(satelliteButton).toHaveClass('bg-blue-600');
   });

   it('should highlight hybrid layer when it is active', () => {
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

      render(<BaseLayerSelector />);

      const hybridButton = screen.getByRole('button', { name: /switch to hybrid view/i });
      expect(hybridButton).toHaveAttribute('aria-pressed', 'true');
      expect(hybridButton).toHaveClass('bg-blue-600');
   });

   it('should show inactive styling for non-selected layers', () => {
      render(<BaseLayerSelector />);

      const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
      const hybridButton = screen.getByRole('button', { name: /switch to hybrid view/i });

      expect(satelliteButton).toHaveAttribute('aria-pressed', 'false');
      expect(satelliteButton).toHaveClass('bg-white/20');
      expect(satelliteButton).not.toHaveClass('bg-blue-600');

      expect(hybridButton).toHaveAttribute('aria-pressed', 'false');
      expect(hybridButton).toHaveClass('bg-white/20');
      expect(hybridButton).not.toHaveClass('bg-blue-600');
   });

   it('should display layer icons', () => {
      render(<BaseLayerSelector />);

      expect(screen.getByText('🗺️')).toBeInTheDocument();
      expect(screen.getByText('🛰️')).toBeInTheDocument();
      expect(screen.getByText('🌍')).toBeInTheDocument();
   });

   it('should display layer labels', () => {
      render(<BaseLayerSelector />);

      expect(screen.getByText('Street')).toBeInTheDocument();
      expect(screen.getByText('Satellite')).toBeInTheDocument();
      expect(screen.getByText('Hybrid')).toBeInTheDocument();
   });
});
