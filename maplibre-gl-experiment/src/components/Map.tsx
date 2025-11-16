import { Map as MapGL, NavigationControl, Source, Layer } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useCellTowers, type CellTower } from '../services/cellTowerService';

// Satellite style using free EOX Sentinel-2 cloudless imagery
const satelliteStyle = {
   version: 8 as const,
   sources: {
      satellite: {
         type: 'raster' as const,
         tiles: [
            'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg',
         ],
         tileSize: 256,
         attribution:
            '© <a href="https://s2maps.eu" target="_blank">Sentinel-2 cloudless</a> by <a href="https://eox.at/" target="_blank">EOX IT Services GmbH</a>',
      },
   },
   layers: [
      {
         id: 'satellite',
         type: 'raster' as const,
         source: 'satellite',
         minzoom: 0,
         maxzoom: 22,
      },
   ],
};

// Layer style for cell tower markers
const cellTowerLayer = {
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

function Map() {
   // Fetch cell towers using SWR hook
   // API limit: 4,000,000 sq.m (4 km²)
   // With radius of 0.9km, we get a ~1.8km × 1.8km box = 3.24 km² (under limit)
   const {
      data: cellTowers,
      error,
      isLoading,
   } = useCellTowers(
      44.7975, // Shakopee, MN - latitude
      -93.5272, // Shakopee, MN - longitude
      0.9, // radius in km
      50 // limit
   );

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

   const errorMessage = error
      ? error instanceof Error
         ? error.message
         : 'Failed to load cell towers'
      : null;

   return (
      <div className="flex-1 w-full h-full relative">
         <MapGL
            initialViewState={{
               longitude: -93.5272,
               latitude: 44.7975,
               zoom: 12,
            }}
            mapStyle={satelliteStyle}
            style={{ width: '100%', height: '100%' }}
         >
            <NavigationControl position="top-right" />

            {/* Cell Tower Layer */}
            <Source id="cell-towers" type="geojson" data={cellTowerGeoJSON}>
               <Layer {...cellTowerLayer} />
            </Source>
         </MapGL>

         {/* Status indicators */}
         {isLoading && (
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
               Loading cell towers...
            </div>
         )}
         {errorMessage && (
            <div className="absolute top-4 left-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg">
               {errorMessage}
            </div>
         )}
         {!isLoading && !errorMessage && cellTowers && cellTowers.length > 0 && (
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
               {cellTowers.length} cell towers
            </div>
         )}
      </div>
   );
}

export default Map;
