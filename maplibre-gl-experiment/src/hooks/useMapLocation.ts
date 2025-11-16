import { useEffect } from 'react';
import type { MapRef } from '@vis.gl/react-maplibre';
import { useLocationStore } from '../stores/locationStore';

/**
 * Custom hook for managing map location interactions
 * Handles flying to new coordinates and updating location on map drag
 */
export function useMapLocation(mapRef: React.RefObject<MapRef | null>) {
   const { latitude, longitude, isHydrated, setLocation, setLatInput, setLonInput } = useLocationStore();

   // Fly to new coordinates when they change (only after hydration)
   useEffect(() => {
      if (mapRef.current && isHydrated) {
         mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            duration: 2000,
         });
      }
   }, [latitude, longitude, isHydrated, mapRef]);

   // Handle map move/drag end - update location when user pans the map
   const handleMoveEnd = () => {
      if (mapRef.current) {
         const center = mapRef.current.getCenter();
         const newLat = center.lat;
         const newLon = center.lng;

         // Update location in store and persist to IndexedDB
         setLocation(newLat, newLon);

         // Also update the input fields to reflect the new center
         setLatInput(newLat.toFixed(4));
         setLonInput(newLon.toFixed(4));
      }
   };

   return {
      handleMoveEnd,
   };
}
