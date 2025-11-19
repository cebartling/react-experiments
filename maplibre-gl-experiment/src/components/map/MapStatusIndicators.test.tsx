import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapStatusIndicators } from './MapStatusIndicators';
import type { CellTower } from '../../services/cellTowerService';

describe('MapStatusIndicators', () => {
   const mockCellTowers: CellTower[] = [
      {
         cellid: 123,
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
         cellid: 456,
         radio: 'LTE',
         mcc: 310,
         mnc: 260,
         lat: 44.8,
         lon: -93.53,
         range: 1500,
         lac: 1,
         samples: 150,
         changeable: 1,
         created: 1234567890,
         updated: 1234567890,
         averageSignal: -80,
      },
   ];

   it('should display loading indicator when loading', () => {
      render(<MapStatusIndicators isLoading={true} error={null} cellTowers={undefined} />);

      expect(screen.getByText('Loading cell towers...')).toBeInTheDocument();
   });

   it('should display error message when there is an error', () => {
      const error = new Error('Network error');

      render(<MapStatusIndicators isLoading={false} error={error} cellTowers={undefined} />);

      const errorElement = screen.getByText('Network error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveClass('bg-red-100', 'text-red-800');
   });

   it('should display generic error message for non-Error objects', () => {
      // Type assertion to test the fallback case
      const error = 'string error' as any;

      render(<MapStatusIndicators isLoading={false} error={error} cellTowers={undefined} />);

      expect(screen.getByText('Failed to load cell towers')).toBeInTheDocument();
   });

   it('should display cell tower count when data is loaded', () => {
      render(<MapStatusIndicators isLoading={false} error={null} cellTowers={mockCellTowers} />);

      expect(screen.getByText('2 cell towers')).toBeInTheDocument();
   });

   it('should display singular count for one cell tower', () => {
      render(
         <MapStatusIndicators isLoading={false} error={null} cellTowers={[mockCellTowers[0]]} />
      );

      expect(screen.getByText('1 cell towers')).toBeInTheDocument();
   });

   it('should not display anything when no data and no error', () => {
      const { container } = render(
         <MapStatusIndicators isLoading={false} error={null} cellTowers={undefined} />
      );

      expect(container.querySelector('.bg-white')).not.toBeInTheDocument();
   });

   it('should not display anything when cell towers array is empty', () => {
      const { container } = render(
         <MapStatusIndicators isLoading={false} error={null} cellTowers={[]} />
      );

      expect(container.querySelector('.bg-white')).not.toBeInTheDocument();
   });

   it('should show both loading and error when both are present', () => {
      const error = new Error('Network error');

      render(<MapStatusIndicators isLoading={true} error={error} cellTowers={undefined} />);

      expect(screen.getByText('Loading cell towers...')).toBeInTheDocument();
      expect(screen.getByText('Network error')).toBeInTheDocument();
   });

   it('should prioritize error state over success', () => {
      const error = new Error('Network error');

      render(<MapStatusIndicators isLoading={false} error={error} cellTowers={mockCellTowers} />);

      expect(screen.getByText('Network error')).toBeInTheDocument();
      expect(screen.queryByText('2 cell towers')).not.toBeInTheDocument();
   });

   it('should not display count during loading even if data exists', () => {
      render(<MapStatusIndicators isLoading={true} error={null} cellTowers={mockCellTowers} />);

      expect(screen.getByText('Loading cell towers...')).toBeInTheDocument();
      expect(screen.queryByText('2 cell towers')).not.toBeInTheDocument();
   });
});
