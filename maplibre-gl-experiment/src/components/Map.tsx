import { useRef, useEffect } from 'react';
import { Map as MapGL, NavigationControl } from '@vis.gl/react-maplibre';
import type { MapRef } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useCellTowers } from '../services/cellTowerService';
import { useLocationStore } from '../stores/locationStore';
import { useMapLocation } from '../hooks/useMapLocation';
import { getStyleByType } from '../config/mapStyles';
import { LocationSearchForm } from './map/LocationSearchForm';
import { CellTowerLayer } from './map/CellTowerLayer';

function Map() {
   // Ref for the map instance
   const mapRef = useRef<MapRef>(null);

   // Get location state from Zustand store
   const { latitude, longitude, baseLayer, hydrateFromStorage } = useLocationStore();

   // Custom hook for map location interactions
   const { handleMoveEnd } = useMapLocation(mapRef);

   // Hydrate state from IndexedDB on mount
   useEffect(() => {
      void hydrateFromStorage();
   }, [hydrateFromStorage]);

   // Fetch cell towers using SWR hook
   // API limit: 4,000,000 sq.m (4 km²)
   // With radius of 0.9km, we get a ~1.8km × 1.8km box = 3.24 km² (under limit)
   const { data: cellTowers } = useCellTowers(
      latitude,
      longitude,
      0.9, // radius in km
      50 // limit
   );

   return (
      <div className="flex-1 w-full h-full relative">
         <MapGL
            ref={mapRef}
            initialViewState={{
               longitude,
               latitude,
               zoom: 12,
            }}
            mapStyle={getStyleByType(baseLayer)}
            style={{ width: '100%', height: '100%' }}
            onMoveEnd={handleMoveEnd}
         >
            <NavigationControl position="top-right" />
            <CellTowerLayer cellTowers={cellTowers} />
         </MapGL>

         <LocationSearchForm />
      </div>
   );
}

export default Map;
