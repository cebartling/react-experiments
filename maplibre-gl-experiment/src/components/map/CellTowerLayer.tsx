import { Source, Layer } from '@vis.gl/react-maplibre';
import type { CellTower } from '../../services/cellTowerService';

interface CellTowerLayerProps {
   cellTowers: CellTower[] | undefined;
}

// Layer style for cell tower markers
const cellTowerLayerStyle = {
   id: 'cell-towers',
   type: 'circle' as const,
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
      <Source id="cell-towers" type="geojson" data={cellTowerGeoJSON}>
         <Layer {...cellTowerLayerStyle} />
      </Source>
   );
}
