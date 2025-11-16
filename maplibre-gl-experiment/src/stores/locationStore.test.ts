import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Create the mock functions first
const createMockStorage = () => {
   const mockGetItem = vi.fn();
   const mockSetItem = vi.fn();
   return { mockGetItem, mockSetItem };
};

const { mockGetItem, mockSetItem } = createMockStorage();

// Mock localforage before importing anything
vi.mock('localforage', () => ({
   default: {
      createInstance: vi.fn(() => ({
         getItem: (...args: any[]) => mockGetItem(...args),
         setItem: (...args: any[]) => mockSetItem(...args),
      })),
   },
}));

// Import store after mocking localforage
import { useLocationStore } from './locationStore';

describe('locationStore', () => {
   beforeEach(() => {
      // Clear all mocks before each test
      vi.clearAllMocks();
      mockGetItem.mockResolvedValue(null);
      mockSetItem.mockResolvedValue(undefined);
   });

   afterEach(() => {
      // Reset store to initial state
      useLocationStore.setState({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: '-93.5272',
         baseLayer: 'satellite',
         isHydrated: false,
      });
   });

   describe('initial state', () => {
      it('should have default values', () => {
         const { result } = renderHook(() => useLocationStore());

         expect(result.current.latitude).toBe(44.7975);
         expect(result.current.longitude).toBe(-93.5272);
         expect(result.current.latInput).toBe('44.7975');
         expect(result.current.lonInput).toBe('-93.5272');
         expect(result.current.baseLayer).toBe('satellite');
         expect(result.current.isHydrated).toBe(false);
      });
   });

   describe('setLatitude', () => {
      it('should update latitude and persist to storage', () => {
         const { result } = renderHook(() => useLocationStore());

         act(() => {
            result.current.setLatitude(40.7128);
         });

         expect(result.current.latitude).toBe(40.7128);
         expect(mockSetItem).toHaveBeenCalledWith('latitude', 40.7128);
      });
   });

   describe('setLongitude', () => {
      it('should update longitude and persist to storage', () => {
         const { result } = renderHook(() => useLocationStore());

         act(() => {
            result.current.setLongitude(-74.006);
         });

         expect(result.current.longitude).toBe(-74.006);
         expect(mockSetItem).toHaveBeenCalledWith('longitude', -74.006);
      });
   });

   describe('setLatInput', () => {
      it('should update latitude input without persisting', () => {
         const { result } = renderHook(() => useLocationStore());

         act(() => {
            result.current.setLatInput('40.7128');
         });

         expect(result.current.latInput).toBe('40.7128');
         expect(mockSetItem).not.toHaveBeenCalled();
      });
   });

   describe('setLonInput', () => {
      it('should update longitude input without persisting', () => {
         const { result } = renderHook(() => useLocationStore());

         act(() => {
            result.current.setLonInput('-74.006');
         });

         expect(result.current.lonInput).toBe('-74.006');
         expect(mockSetItem).not.toHaveBeenCalled();
      });
   });

   describe('setLocation', () => {
      it('should update both coordinates and persist to storage', () => {
         const { result } = renderHook(() => useLocationStore());

         act(() => {
            result.current.setLocation(40.7128, -74.006);
         });

         expect(result.current.latitude).toBe(40.7128);
         expect(result.current.longitude).toBe(-74.006);
         expect(mockSetItem).toHaveBeenCalledWith('latitude', 40.7128);
         expect(mockSetItem).toHaveBeenCalledWith('longitude', -74.006);
      });
   });

   describe('setBaseLayer', () => {
      it('should update base layer and persist to storage', () => {
         const { result } = renderHook(() => useLocationStore());

         act(() => {
            result.current.setBaseLayer('street');
         });

         expect(result.current.baseLayer).toBe('street');
         expect(mockSetItem).toHaveBeenCalledWith('baseLayer', 'street');
      });

      it('should support all base layer types', () => {
         const { result } = renderHook(() => useLocationStore());

         act(() => {
            result.current.setBaseLayer('hybrid');
         });
         expect(result.current.baseLayer).toBe('hybrid');

         act(() => {
            result.current.setBaseLayer('satellite');
         });
         expect(result.current.baseLayer).toBe('satellite');

         act(() => {
            result.current.setBaseLayer('street');
         });
         expect(result.current.baseLayer).toBe('street');
      });
   });

   describe('hydrateFromStorage', () => {
      it('should load stored coordinates on hydration', async () => {
         mockGetItem.mockImplementation((key: string) => {
            if (key === 'latitude') return Promise.resolve(40.7128);
            if (key === 'longitude') return Promise.resolve(-74.006);
            return Promise.resolve(null);
         });

         const { result } = renderHook(() => useLocationStore());

         await act(async () => {
            await result.current.hydrateFromStorage();
         });

         expect(result.current.latitude).toBe(40.7128);
         expect(result.current.longitude).toBe(-74.006);
         expect(result.current.latInput).toBe('40.7128');
         expect(result.current.lonInput).toBe('-74.006');
         expect(result.current.isHydrated).toBe(true);
      });

      it('should load stored base layer on hydration', async () => {
         mockGetItem.mockImplementation((key: string) => {
            if (key === 'latitude') return Promise.resolve(40.7128);
            if (key === 'longitude') return Promise.resolve(-74.006);
            if (key === 'baseLayer') return Promise.resolve('street');
            return Promise.resolve(null);
         });

         const { result } = renderHook(() => useLocationStore());

         await act(async () => {
            await result.current.hydrateFromStorage();
         });

         expect(result.current.baseLayer).toBe('street');
         expect(result.current.isHydrated).toBe(true);
      });

      it('should use default base layer when not stored', async () => {
         mockGetItem.mockImplementation((key: string) => {
            if (key === 'latitude') return Promise.resolve(40.7128);
            if (key === 'longitude') return Promise.resolve(-74.006);
            return Promise.resolve(null);
         });

         const { result } = renderHook(() => useLocationStore());

         await act(async () => {
            await result.current.hydrateFromStorage();
         });

         expect(result.current.baseLayer).toBe('satellite');
         expect(result.current.isHydrated).toBe(true);
      });

      it('should use default values when storage is empty', async () => {
         mockGetItem.mockResolvedValue(null);

         const { result } = renderHook(() => useLocationStore());

         await act(async () => {
            await result.current.hydrateFromStorage();
         });

         expect(result.current.latitude).toBe(44.7975);
         expect(result.current.longitude).toBe(-93.5272);
         expect(result.current.baseLayer).toBe('satellite');
         expect(result.current.isHydrated).toBe(true);
      });

      it('should handle storage errors gracefully', async () => {
         mockGetItem.mockRejectedValue(new Error('Storage error'));
         const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

         const { result } = renderHook(() => useLocationStore());

         await act(async () => {
            await result.current.hydrateFromStorage();
         });

         expect(result.current.isHydrated).toBe(true);
         expect(consoleSpy).toHaveBeenCalledWith(
            'Failed to hydrate location state from storage:',
            expect.any(Error)
         );

         consoleSpy.mockRestore();
      });
   });
});
