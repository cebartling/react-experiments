// Map style type definition
export type BaseLayerType = 'satellite' | 'street' | 'hybrid';

// Street style using OpenStreetMap tiles
export const streetStyle = {
   version: 8 as const,
   sources: {
      'osm-tiles': {
         type: 'raster' as const,
         tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
         tileSize: 256,
         attribution:
            '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      },
   },
   layers: [
      {
         id: 'osm-tiles',
         type: 'raster' as const,
         source: 'osm-tiles',
         minzoom: 0,
         maxzoom: 19,
      },
   ],
};

// Satellite style using free EOX Sentinel-2 cloudless imagery
export const satelliteStyle = {
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

// Hybrid style (satellite + street labels)
export const hybridStyle = {
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
      'osm-tiles': {
         type: 'raster' as const,
         tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
         tileSize: 256,
         attribution:
            '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
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
      {
         id: 'osm-overlay',
         type: 'raster' as const,
         source: 'osm-tiles',
         minzoom: 0,
         maxzoom: 19,
         paint: {
            'raster-opacity': 0.5,
         },
      },
   ],
};

// Helper function to get style by type
export function getStyleByType(type: BaseLayerType) {
   switch (type) {
      case 'street':
         return streetStyle;
      case 'satellite':
         return satelliteStyle;
      case 'hybrid':
         return hybridStyle;
      default:
         return satelliteStyle;
   }
}
