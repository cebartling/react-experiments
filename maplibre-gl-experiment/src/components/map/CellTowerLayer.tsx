import { Source, Layer } from '@vis.gl/react-maplibre';
import type { CellTower } from '../../services/cellTowerService';

interface CellTowerLayerProps {
   cellTowers: CellTower[] | undefined;
}

// Layer style for clustered circles
const clusterLayerStyle = {
   id: 'clusters',
   type: 'circle' as const,
   filter: ['has', 'point_count'] as any,
   paint: {
      // Size clusters based on point count
      'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 30, 40] as any,
      // Color clusters based on point count
      'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 30, '#f28cb1'] as any,
      'circle-stroke-color': '#FFF',
      'circle-stroke-width': 2,
      'circle-opacity': 0.8,
   },
};

// Layer style for cluster count labels
const clusterCountLayerStyle = {
   id: 'cluster-count',
   type: 'symbol' as const,
   filter: ['has', 'point_count'] as any,
   layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': 12,
   },
   paint: {
      'text-color': '#000000',
   },
};

// Layer style for individual (unclustered) cell tower markers
const unclusteredPointLayerStyle = {
   id: 'unclustered-point',
   type: 'circle' as const,
   filter: ['!', ['has', 'point_count']] as any,
   paint: {
      'circle-radius': 6,
      'circle-color': '#FF6B6B',
      'circle-stroke-color': '#FFF',
      'circle-stroke-width': 2,
      'circle-opacity': 0.8,
   },
};

export function CellTowerLayer({ cellTowers }: CellTowerLayerProps) {
   // Convert cell towers to GeoJSON
   const cellTowerGeoJSON = {
      type: 'FeatureCollection' as const,
      features: (cellTowers || []).map((tower: CellTower) => ({
         type: 'Feature' as const,
         geometry: {
            type: 'Point' as const,
            coordinates: [tower.lon, tower.lat],
         },
         properties: {
            cellid: tower.cellid,
            radio: tower.radio,
            mcc: tower.mcc,
            mnc: tower.mnc,
            range: tower.range,
         },
      })),
   };

   return (
      <Source
         id="cell-towers"
         type="geojson"
         data={cellTowerGeoJSON}
         cluster={true}
         clusterMaxZoom={14}
         clusterRadius={50}
      >
         <Layer {...clusterLayerStyle} />
         <Layer {...clusterCountLayerStyle} />
         <Layer {...unclusteredPointLayerStyle} />
      </Source>
   );
}
