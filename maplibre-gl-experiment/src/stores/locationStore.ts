import { create } from 'zustand';
import localforage from 'localforage';
import type { BaseLayerType } from '../config/mapStyles';

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
   baseLayer: BaseLayerType;
   isHydrated: boolean;
   setLatitude: (latitude: number) => void;
   setLongitude: (longitude: number) => void;
   setLatInput: (latInput: string) => void;
   setLonInput: (lonInput: string) => void;
   setLocation: (latitude: number, longitude: number) => void;
   setBaseLayer: (baseLayer: BaseLayerType) => void;
   hydrateFromStorage: () => Promise<void>;
}

// Default location: Shakopee, MN
const DEFAULT_LATITUDE = 44.7975;
const DEFAULT_LONGITUDE = -93.5272;
const DEFAULT_BASE_LAYER: BaseLayerType = 'satellite';

export const useLocationStore = create<LocationState>()((set) => ({
   latitude: DEFAULT_LATITUDE,
   longitude: DEFAULT_LONGITUDE,
   latInput: String(DEFAULT_LATITUDE),
   lonInput: String(DEFAULT_LONGITUDE),
   baseLayer: DEFAULT_BASE_LAYER,
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

   setBaseLayer: (baseLayer: BaseLayerType) => {
      set({ baseLayer });
      locationStorage.setItem('baseLayer', baseLayer);
   },

   hydrateFromStorage: async () => {
      try {
         const [storedLat, storedLon, storedBaseLayer] = await Promise.all([
            locationStorage.getItem<number>('latitude'),
            locationStorage.getItem<number>('longitude'),
            locationStorage.getItem<BaseLayerType>('baseLayer'),
         ]);

         if (storedLat !== null && storedLon !== null) {
            set({
               latitude: storedLat,
               longitude: storedLon,
               latInput: String(storedLat),
               lonInput: String(storedLon),
               baseLayer: storedBaseLayer || DEFAULT_BASE_LAYER,
               isHydrated: true,
            });
         } else {
            set({
               baseLayer: storedBaseLayer || DEFAULT_BASE_LAYER,
               isHydrated: true,
            });
         }
      } catch (error) {
         console.error('Failed to hydrate location state from storage:', error);
         set({ isHydrated: true });
      }
   },
}));
