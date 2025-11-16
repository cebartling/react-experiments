import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { CellTowerLayer } from './CellTowerLayer';
import type { CellTower } from '../../services/cellTowerService';

// Mock the MapLibre components
vi.mock('@vis.gl/react-maplibre', () => ({
   Source: ({ children, data }: any) => (
      <div data-testid="source" data-geojson={JSON.stringify(data)}>
         {children}
      </div>
   ),
   Layer: (props: any) => <div data-testid="layer" data-layer-id={props.id} />,
}));

describe('CellTowerLayer', () => {
   const mockCellTowers: CellTower[] = [
      {
         cellid: 123,
         radio: 'LTE',
         mcc: 310,
         mnc: 260,
         lat: 44.7975,
         lon: -93.5272,
         range: 1000,
      } as unknown as CellTower,
      {
         cellid: 456,
         radio: 'GSM',
         mcc: 310,
         mnc: 260,
         lat: 44.8,
         lon: -93.53,
         range: 1500,
      } as unknown as CellTower,
   ];

   it('should render Source and Layer components', () => {
      const { getByTestId } = render(<CellTowerLayer cellTowers={mockCellTowers} />);

      expect(getByTestId('source')).toBeInTheDocument();
      expect(getByTestId('layer')).toBeInTheDocument();
   });

   it('should convert cell towers to GeoJSON format', () => {
      const { getByTestId } = render(<CellTowerLayer cellTowers={mockCellTowers} />);

      const source = getByTestId('source');
      const geoJSON = JSON.parse(source.getAttribute('data-geojson') || '{}');

      expect(geoJSON.type).toBe('FeatureCollection');
      expect(geoJSON.features).toHaveLength(2);
   });

   it('should create correct GeoJSON features with coordinates', () => {
      const { getByTestId } = render(<CellTowerLayer cellTowers={mockCellTowers} />);

      const source = getByTestId('source');
      const geoJSON = JSON.parse(source.getAttribute('data-geojson') || '{}');

      const feature1 = geoJSON.features[0];
      expect(feature1.type).toBe('Feature');
      expect(feature1.geometry.type).toBe('Point');
      expect(feature1.geometry.coordinates).toEqual([-93.5272, 44.7975]);
   });

   it('should include cell tower properties in features', () => {
      const { getByTestId } = render(<CellTowerLayer cellTowers={mockCellTowers} />);

      const source = getByTestId('source');
      const geoJSON = JSON.parse(source.getAttribute('data-geojson') || '{}');

      const feature1 = geoJSON.features[0];
      expect(feature1.properties).toEqual({
         cellid: 123,
         radio: 'LTE',
         mcc: 310,
         mnc: 260,
         range: 1000,
      });

      const feature2 = geoJSON.features[1];
      expect(feature2.properties).toEqual({
         cellid: 456,
         radio: 'GSM',
         mcc: 310,
         mnc: 260,
         range: 1500,
      });
   });

   it('should handle undefined cell towers', () => {
      const { getByTestId } = render(<CellTowerLayer cellTowers={undefined} />);

      const source = getByTestId('source');
      const geoJSON = JSON.parse(source.getAttribute('data-geojson') || '{}');

      expect(geoJSON.type).toBe('FeatureCollection');
      expect(geoJSON.features).toHaveLength(0);
   });

   it('should handle empty cell towers array', () => {
      const { getByTestId } = render(<CellTowerLayer cellTowers={[]} />);

      const source = getByTestId('source');
      const geoJSON = JSON.parse(source.getAttribute('data-geojson') || '{}');

      expect(geoJSON.type).toBe('FeatureCollection');
      expect(geoJSON.features).toHaveLength(0);
   });

   it('should render layer with correct id', () => {
      const { getByTestId } = render(<CellTowerLayer cellTowers={mockCellTowers} />);

      const layer = getByTestId('layer');
      expect(layer.getAttribute('data-layer-id')).toBe('cell-towers');
   });
});
