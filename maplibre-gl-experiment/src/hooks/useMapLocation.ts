import { useEffect, useState, useRef } from 'react';
import type { MapRef } from '@vis.gl/react-maplibre';
import { useLocationStore } from '../stores/locationStore';

/**
 * Custom hook for managing map location interactions
 * Handles flying to new coordinates and updating location on map drag
 */
export function useMapLocation(mapRef: React.RefObject<MapRef | null>) {
   const { latitude, longitude, isHydrated, setLocation, setLatInput, setLonInput } =
      useLocationStore();
   const [isDragging, setIsDragging] = useState(false);
   const isUserDragging = useRef(false);

   // Fly to new coordinates when they change (only after hydration and not from user drag)
   useEffect(() => {
      if (mapRef.current && isHydrated && !isUserDragging.current) {
         mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            duration: 2000,
         });
      }
   }, [latitude, longitude, isHydrated, mapRef]);

   // Handle drag start - show crosshair
   const handleDragStart = () => {
      isUserDragging.current = true;
      setIsDragging(true);
   };

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

      // Hide crosshair after drag ends
      setIsDragging(false);
      // Reset the flag after a brief delay to allow programmatic changes
      setTimeout(() => {
         isUserDragging.current = false;
      }, 100);
   };

   return {
      handleDragStart,
      handleMoveEnd,
      isDragging,
   };
}
