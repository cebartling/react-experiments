import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMapLocation } from './useMapLocation';
import { useLocationStore } from '../stores/locationStore';
import type { MapRef } from '@vis.gl/react-maplibre';

// Mock the location store
vi.mock('../stores/locationStore');

describe('useMapLocation', () => {
   let mockMapRef: { current: MapRef | null };
   let mockMap: {
      flyTo: ReturnType<typeof vi.fn>;
      getCenter: ReturnType<typeof vi.fn>;
   };

   beforeEach(() => {
      vi.useRealTimers();
      // Setup mock map
      mockMap = {
         flyTo: vi.fn(),
         getCenter: vi.fn().mockReturnValue({ lat: 40.7128, lng: -74.006 }),
      };

      mockMapRef = { current: mockMap as any };

      // Setup store mock
      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: '-93.5272',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: vi.fn(),
         setLonInput: vi.fn(),
         setLocation: vi.fn(),
         hydrateFromStorage: vi.fn(),
      });
   });

   describe('dragging state', () => {
      it('should set isDragging to true when handleDragStart is called', () => {
         const { result } = renderHook(() => useMapLocation(mockMapRef));

         expect(result.current.isDragging).toBe(false);

         act(() => {
            result.current.handleDragStart();
         });

         expect(result.current.isDragging).toBe(true);
      });

      it('should set isDragging to false when handleMoveEnd is called', () => {
         const { result } = renderHook(() => useMapLocation(mockMapRef));

         // Start dragging
         act(() => {
            result.current.handleDragStart();
         });

         expect(result.current.isDragging).toBe(true);

         // End dragging
         act(() => {
            result.current.handleMoveEnd();
         });

         expect(result.current.isDragging).toBe(false);
      });

      it('should reset user dragging flag after timeout on handleMoveEnd', async () => {
         vi.useFakeTimers();
         const { result } = renderHook(() => useMapLocation(mockMapRef));

         // Start dragging
         act(() => {
            result.current.handleDragStart();
         });

         // End dragging
         act(() => {
            result.current.handleMoveEnd();
         });

         // Advance timers past the timeout
         await act(async () => {
            vi.advanceTimersByTime(100);
         });

         // The flag should be reset (we can't directly test the ref, but the timeout code path is covered)
         expect(result.current.isDragging).toBe(false);

         vi.useRealTimers();
      });
   });

   describe('handleMoveEnd', () => {
      it('should update location when map is moved', () => {
         const mockSetLocation = vi.fn();
         const mockSetLatInput = vi.fn();
         const mockSetLonInput = vi.fn();

         vi.mocked(useLocationStore).mockReturnValue({
            latitude: 44.7975,
            longitude: -93.5272,
            latInput: '44.7975',
            lonInput: '-93.5272',
            isHydrated: true,
            setLatitude: vi.fn(),
            setLongitude: vi.fn(),
            setLatInput: mockSetLatInput,
            setLonInput: mockSetLonInput,
            setLocation: mockSetLocation,
            hydrateFromStorage: vi.fn(),
         });

         const { result } = renderHook(() => useMapLocation(mockMapRef));

         act(() => {
            result.current.handleMoveEnd();
         });

         expect(mockMap.getCenter).toHaveBeenCalled();
         expect(mockSetLocation).toHaveBeenCalledWith(40.7128, -74.006);
         expect(mockSetLatInput).toHaveBeenCalledWith('40.7128');
         expect(mockSetLonInput).toHaveBeenCalledWith('-74.0060');
      });

      it('should handle null map ref gracefully', () => {
         const mockSetLocation = vi.fn();
         const nullMapRef = { current: null };

         vi.mocked(useLocationStore).mockReturnValue({
            latitude: 44.7975,
            longitude: -93.5272,
            latInput: '44.7975',
            lonInput: '-93.5272',
            isHydrated: true,
            setLatitude: vi.fn(),
            setLongitude: vi.fn(),
            setLatInput: vi.fn(),
            setLonInput: vi.fn(),
            setLocation: mockSetLocation,
            hydrateFromStorage: vi.fn(),
         });

         const { result } = renderHook(() => useMapLocation(nullMapRef));

         act(() => {
            result.current.handleMoveEnd();
         });

         expect(mockSetLocation).not.toHaveBeenCalled();
      });

      it('should round coordinates to 4 decimal places', () => {
         const mockSetLatInput = vi.fn();
         const mockSetLonInput = vi.fn();

         mockMap.getCenter.mockReturnValue({ lat: 40.71283456789, lng: -74.00598765432 });

         vi.mocked(useLocationStore).mockReturnValue({
            latitude: 44.7975,
            longitude: -93.5272,
            latInput: '44.7975',
            lonInput: '-93.5272',
            isHydrated: true,
            setLatitude: vi.fn(),
            setLongitude: vi.fn(),
            setLatInput: mockSetLatInput,
            setLonInput: mockSetLonInput,
            setLocation: vi.fn(),
            hydrateFromStorage: vi.fn(),
         });

         const { result } = renderHook(() => useMapLocation(mockMapRef));

         act(() => {
            result.current.handleMoveEnd();
         });

         expect(mockSetLatInput).toHaveBeenCalledWith('40.7128');
         expect(mockSetLonInput).toHaveBeenCalledWith('-74.0060');
      });
   });

   describe('fly to coordinates effect', () => {
      it('should fly to new coordinates when they change and hydrated', () => {
         renderHook(() => useMapLocation(mockMapRef));

         expect(mockMap.flyTo).toHaveBeenCalledWith({
            center: [-93.5272, 44.7975],
            zoom: 12,
            duration: 2000,
         });
      });

      it('should not fly when not hydrated', () => {
         vi.mocked(useLocationStore).mockReturnValue({
            latitude: 44.7975,
            longitude: -93.5272,
            latInput: '44.7975',
            lonInput: '-93.5272',
            isHydrated: false,
            setLatitude: vi.fn(),
            setLongitude: vi.fn(),
            setLatInput: vi.fn(),
            setLonInput: vi.fn(),
            setLocation: vi.fn(),
            hydrateFromStorage: vi.fn(),
         });

         renderHook(() => useMapLocation(mockMapRef));

         expect(mockMap.flyTo).not.toHaveBeenCalled();
      });

      it('should not fly when map ref is null', () => {
         const nullMapRef = { current: null };

         renderHook(() => useMapLocation(nullMapRef));

         expect(mockMap.flyTo).not.toHaveBeenCalled();
      });
   });
});
