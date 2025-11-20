import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { CellTowerLayer } from './CellTowerLayer';
import type { CellTower } from '../../services/cellTowerService';

// Mock the MapLibre components
vi.mock('@vis.gl/react-maplibre', () => ({
   Source: ({ children, data, cluster, clusterMaxZoom, clusterRadius }: any) => (
      <div
         data-testid="source"
         data-geojson={JSON.stringify(data)}
         data-cluster={cluster}
         data-cluster-max-zoom={clusterMaxZoom}
         data-cluster-radius={clusterRadius}
      >
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
      const { getByTestId, getAllByTestId } = render(<CellTowerLayer cellTowers={mockCellTowers} />);

      expect(getByTestId('source')).toBeInTheDocument();
      const layers = getAllByTestId('layer');
      expect(layers).toHaveLength(3); // cluster, cluster-count, and unclustered-point layers
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

   it('should render cluster layers with correct ids', () => {
      const { getAllByTestId } = render(<CellTowerLayer cellTowers={mockCellTowers} />);

      const layers = getAllByTestId('layer');
      expect(layers[0].getAttribute('data-layer-id')).toBe('clusters');
      expect(layers[1].getAttribute('data-layer-id')).toBe('cluster-count');
      expect(layers[2].getAttribute('data-layer-id')).toBe('unclustered-point');
   });

   it('should enable clustering with correct configuration', () => {
      const { getByTestId } = render(<CellTowerLayer cellTowers={mockCellTowers} />);

      const source = getByTestId('source');
      expect(source.getAttribute('data-cluster')).toBe('true');
      expect(source.getAttribute('data-cluster-max-zoom')).toBe('14');
      expect(source.getAttribute('data-cluster-radius')).toBe('50');
   });
});
