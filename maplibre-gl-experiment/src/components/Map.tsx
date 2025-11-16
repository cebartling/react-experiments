import { useState, useRef, useEffect } from 'react';
import { Map as MapGL, NavigationControl, Source, Layer } from '@vis.gl/react-maplibre';
import type { MapRef } from '@vis.gl/react-maplibre';
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
   // Ref for the map instance
   const mapRef = useRef<MapRef>(null);

   // State for coordinates (used for fetching cell towers)
   const [latitude, setLatitude] = useState(44.7975); // Shakopee, MN
   const [longitude, setLongitude] = useState(-93.5272);

   // Form input state (separate from actual search coordinates)
   const [latInput, setLatInput] = useState('44.7975');
   const [lonInput, setLonInput] = useState('-93.5272');

   // Fetch cell towers using SWR hook
   // API limit: 4,000,000 sq.m (4 km²)
   // With radius of 0.9km, we get a ~1.8km × 1.8km box = 3.24 km² (under limit)
   const {
      data: cellTowers,
      error,
      isLoading,
   } = useCellTowers(
      latitude,
      longitude,
      0.9, // radius in km
      50 // limit
   );

   // Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const lat = parseFloat(latInput);
      const lon = parseFloat(lonInput);

      // Validate inputs
      if (isNaN(lat) || lat < -90 || lat > 90) {
         alert('Latitude must be between -90 and 90');
         return;
      }
      if (isNaN(lon) || lon < -180 || lon > 180) {
         alert('Longitude must be between -180 and 180');
         return;
      }

      setLatitude(lat);
      setLongitude(lon);
   };

   // Fly to new coordinates when they change
   useEffect(() => {
      if (mapRef.current) {
         mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            duration: 2000,
         });
      }
   }, [latitude, longitude]);

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
            ref={mapRef}
            initialViewState={{
               longitude,
               latitude,
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

         {/* Coordinate Input Form */}
         <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-3">
               <h3 className="font-semibold text-lg mb-2">Search Location</h3>
               <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                     Latitude
                  </label>
                  <input
                     type="text"
                     id="latitude"
                     value={latInput}
                     onChange={(e) => setLatInput(e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="44.7975"
                  />
               </div>
               <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                     Longitude
                  </label>
                  <input
                     type="text"
                     id="longitude"
                     value={lonInput}
                     onChange={(e) => setLonInput(e.target.value)}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="-93.5272"
                  />
               </div>
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
               >
                  Search
               </button>
            </form>
         </div>

         {/* Status indicators */}
         <div className="absolute bottom-4 left-4 space-y-2">
            {isLoading && (
               <div className="bg-white px-4 py-2 rounded-lg shadow-lg">Loading cell towers...</div>
            )}
            {errorMessage && (
               <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-lg">
                  {errorMessage}
               </div>
            )}
            {!isLoading && !errorMessage && cellTowers && cellTowers.length > 0 && (
               <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                  {cellTowers.length} cell towers
               </div>
            )}
         </div>
      </div>
   );
}

export default Map;
