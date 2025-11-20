import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CellTowerInfo } from './CellTowerInfo';
import { useLocationStore } from '../../stores/locationStore';
import { useCellTowers } from '../../services/cellTowerService';

// Mock the location store
vi.mock('../../stores/locationStore');

// Mock the cell tower service
vi.mock('../../services/cellTowerService');

describe('CellTowerInfo', () => {
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
         setBaseLayer: vi.fn(),
         hydrateFromStorage: vi.fn(),
      });

      // Default mock for cell tower service
      vi.mocked(useCellTowers).mockReturnValue({
         data: [
            {
               cellid: 1,
               radio: 'LTE',
               mcc: 310,
               mnc: 260,
               lat: 44.7975,
               lon: -93.5272,
               range: 1000,
               lac: 1,
               samples: 100,
               changeable: 1,
               created: 1234567890,
               updated: 1234567890,
               averageSignal: -75,
            },
            {
               cellid: 2,
               radio: 'LTE',
               mcc: 310,
               mnc: 260,
               lat: 44.7976,
               lon: -93.5273,
               range: 1500,
               lac: 1,
               samples: 150,
               changeable: 1,
               created: 1234567890,
               updated: 1234567890,
               averageSignal: -80,
            },
         ],
         error: null,
         isLoading: false,
         mutate: vi.fn(),
         isValidating: false,
      });
   });

   it('should display cell tower count when loaded', () => {
      render(<CellTowerInfo />);

      expect(screen.getByText('Cell Towers')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText(/cell towers found/i)).toBeInTheDocument();
   });

   it('should display loading state', () => {
      vi.mocked(useCellTowers).mockReturnValue({
         data: undefined,
         error: null,
         isLoading: true,
         mutate: vi.fn(),
         isValidating: false,
      });

      render(<CellTowerInfo />);

      expect(screen.getByText('Cell Towers')).toBeInTheDocument();
      expect(screen.getByText('Loading cell towers...')).toBeInTheDocument();
   });

   it('should display error state', () => {
      vi.mocked(useCellTowers).mockReturnValue({
         data: undefined,
         error: new Error('Network error'),
         isLoading: false,
         mutate: vi.fn(),
         isValidating: false,
      });

      render(<CellTowerInfo />);

      expect(screen.getByText('Cell Towers')).toBeInTheDocument();
      expect(screen.getByText('Network error')).toBeInTheDocument();
   });

   it('should display detailed error message', () => {
      vi.mocked(useCellTowers).mockReturnValue({
         data: undefined,
         error: new Error('Network connection failed'),
         isLoading: false,
         mutate: vi.fn(),
         isValidating: false,
      });

      render(<CellTowerInfo />);

      expect(screen.getByText('Network connection failed')).toBeInTheDocument();
   });

   it('should display count with correct pluralization for single tower', () => {
      vi.mocked(useCellTowers).mockReturnValue({
         data: [
            {
               cellid: 1,
               radio: 'LTE',
               mcc: 310,
               mnc: 260,
               lat: 44.7975,
               lon: -93.5272,
               range: 1000,
               lac: 1,
               samples: 100,
               changeable: 1,
               created: 1234567890,
               updated: 1234567890,
               averageSignal: -75,
            },
         ],
         error: null,
         isLoading: false,
         mutate: vi.fn(),
         isValidating: false,
      });

      render(<CellTowerInfo />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText(/cell tower found/i)).toBeInTheDocument();
   });

   it('should display zero count when no cell towers are found', () => {
      vi.mocked(useCellTowers).mockReturnValue({
         data: [],
         error: null,
         isLoading: false,
         mutate: vi.fn(),
         isValidating: false,
      });

      render(<CellTowerInfo />);

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText(/cell towers found/i)).toBeInTheDocument();
   });

   it('should handle non-Error error objects', () => {
      vi.mocked(useCellTowers).mockReturnValue({
         data: undefined,
         error: { message: 'API Error' } as Error,
         isLoading: false,
         mutate: vi.fn(),
         isValidating: false,
      });

      render(<CellTowerInfo />);

      expect(screen.getByText('Failed to load cell towers')).toBeInTheDocument();
   });

   it('should call useCellTowers with correct parameters', () => {
      render(<CellTowerInfo />);

      expect(useCellTowers).toHaveBeenCalledWith(44.7975, -93.5272, 0.9, 50);
   });

   it('should update when location changes', () => {
      const { rerender } = render(<CellTowerInfo />);

      expect(useCellTowers).toHaveBeenCalledWith(44.7975, -93.5272, 0.9, 50);

      // Change the location
      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 40.7128,
         longitude: -74.006,
         latInput: '40.7128',
         lonInput: '-74.006',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: vi.fn(),
         setLonInput: vi.fn(),
         setLocation: vi.fn(),
         setBaseLayer: vi.fn(),
         hydrateFromStorage: vi.fn(),
      });

      rerender(<CellTowerInfo />);

      expect(useCellTowers).toHaveBeenCalledWith(40.7128, -74.006, 0.9, 50);
   });
});
