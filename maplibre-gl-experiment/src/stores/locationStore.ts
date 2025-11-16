import { create } from 'zustand';
import localforage from 'localforage';

// Configure localforage for IndexedDB storage
const locationStorage = localforage.createInstance({
   name: 'maplibre-experiment',
   storeName: 'location',
   description: 'Persistent storage for map location state',
});

interface LocationState {
   latitude: number;
   longitude: number;
   latInput: string;
   lonInput: string;
   isHydrated: boolean;
   setLatitude: (latitude: number) => void;
   setLongitude: (longitude: number) => void;
   setLatInput: (latInput: string) => void;
   setLonInput: (lonInput: string) => void;
   setLocation: (latitude: number, longitude: number) => void;
   hydrateFromStorage: () => Promise<void>;
}

// Default location: Shakopee, MN
const DEFAULT_LATITUDE = 44.7975;
const DEFAULT_LONGITUDE = -93.5272;

export const useLocationStore = create<LocationState>()((set) => ({
   latitude: DEFAULT_LATITUDE,
   longitude: DEFAULT_LONGITUDE,
   latInput: String(DEFAULT_LATITUDE),
   lonInput: String(DEFAULT_LONGITUDE),
   isHydrated: false,

   setLatitude: (latitude: number) => {
      set({ latitude });
      locationStorage.setItem('latitude', latitude);
   },

   setLongitude: (longitude: number) => {
      set({ longitude });
      locationStorage.setItem('longitude', longitude);
   },

   setLatInput: (latInput: string) => {
      set({ latInput });
   },

   setLonInput: (lonInput: string) => {
      set({ lonInput });
   },

   setLocation: (latitude: number, longitude: number) => {
      set({
         latitude,
         longitude,
      });
      // Persist both coordinates atomically
      Promise.all([
         locationStorage.setItem('latitude', latitude),
         locationStorage.setItem('longitude', longitude),
      ]);
   },

   hydrateFromStorage: async () => {
      try {
         const [storedLat, storedLon] = await Promise.all([
            locationStorage.getItem<number>('latitude'),
            locationStorage.getItem<number>('longitude'),
         ]);

         if (storedLat !== null && storedLon !== null) {
            set({
               latitude: storedLat,
               longitude: storedLon,
               latInput: String(storedLat),
               lonInput: String(storedLon),
               isHydrated: true,
            });
         } else {
            set({ isHydrated: true });
         }
      } catch (error) {
         console.error('Failed to hydrate location state from storage:', error);
         set({ isHydrated: true });
      }
   },
}));
