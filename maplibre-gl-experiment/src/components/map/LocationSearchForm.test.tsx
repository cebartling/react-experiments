import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationSearchForm } from './LocationSearchForm';
import { useLocationStore } from '../../stores/locationStore';

// Mock the location store
vi.mock('../../stores/locationStore');

describe('LocationSearchForm', () => {
   const mockSetLatInput = vi.fn();
   const mockSetLonInput = vi.fn();
   const mockSetLocation = vi.fn();
   const mockSetBaseLayer = vi.fn();

   beforeEach(() => {
      vi.clearAllMocks();
      vi.useRealTimers(); // Ensure we're using real timers for each test

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: '-93.5272',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });
   });

   it('should render the form with default values', () => {
      render(<LocationSearchForm />);

      expect(screen.getByText('Search Location')).toBeInTheDocument();
      expect(screen.getByLabelText('Latitude')).toHaveValue('44.7975');
      expect(screen.getByLabelText('Longitude')).toHaveValue('-93.5272');
      expect(screen.getByRole('button', { name: /^search$/i })).toBeInTheDocument();
   });

   it('should call setLatInput when user types in latitude field', async () => {
      const user = userEvent.setup();
      render(<LocationSearchForm />);

      const latInput = screen.getByLabelText('Latitude') as HTMLInputElement;
      await user.type(latInput, '1');

      // Should be called for each character typed
      expect(mockSetLatInput).toHaveBeenCalled();
   });

   it('should call setLonInput when user types in longitude field', async () => {
      const user = userEvent.setup();
      render(<LocationSearchForm />);

      const lonInput = screen.getByLabelText('Longitude') as HTMLInputElement;
      await user.type(lonInput, '1');

      // Should be called for each character typed
      expect(mockSetLonInput).toHaveBeenCalled();
   });

   it('should submit valid coordinates', async () => {
      const user = userEvent.setup();

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '40.7128',
         lonInput: '-74.006',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });
      await user.click(submitButton);

      expect(mockSetLocation).toHaveBeenCalledWith(40.7128, -74.006);
   });

   it('should show alert for invalid latitude (too high)', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '95',
         lonInput: '-93.5272',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });
      await user.click(submitButton);

      expect(alertSpy).toHaveBeenCalledWith('Latitude must be between -90 and 90');
      expect(mockSetLocation).not.toHaveBeenCalled();

      alertSpy.mockRestore();
   });

   it('should show alert for invalid latitude (too low)', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '-95',
         lonInput: '-93.5272',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });
      await user.click(submitButton);

      expect(alertSpy).toHaveBeenCalledWith('Latitude must be between -90 and 90');
      expect(mockSetLocation).not.toHaveBeenCalled();

      alertSpy.mockRestore();
   });

   it('should show alert for invalid longitude (too high)', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: '185',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });
      await user.click(submitButton);

      expect(alertSpy).toHaveBeenCalledWith('Longitude must be between -180 and 180');
      expect(mockSetLocation).not.toHaveBeenCalled();

      alertSpy.mockRestore();
   });

   it('should show alert for invalid longitude (too low)', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: '-185',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });
      await user.click(submitButton);

      expect(alertSpy).toHaveBeenCalledWith('Longitude must be between -180 and 180');
      expect(mockSetLocation).not.toHaveBeenCalled();

      alertSpy.mockRestore();
   });

   it('should show alert for non-numeric latitude', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: 'invalid',
         lonInput: '-93.5272',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });
      await user.click(submitButton);

      expect(alertSpy).toHaveBeenCalledWith('Latitude must be between -90 and 90');
      expect(mockSetLocation).not.toHaveBeenCalled();

      alertSpy.mockRestore();
   });

   it('should show alert for non-numeric longitude', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '44.7975',
         lonInput: 'invalid',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });
      await user.click(submitButton);

      expect(alertSpy).toHaveBeenCalledWith('Longitude must be between -180 and 180');
      expect(mockSetLocation).not.toHaveBeenCalled();

      alertSpy.mockRestore();
   });

   it('should start with the accordion expanded', () => {
      render(<LocationSearchForm />);

      const accordionContent = screen.getByText('Search Location').closest('#location-form-content');
      expect(accordionContent).toBeInTheDocument();

      // Form fields should be visible
      expect(screen.getByLabelText('Latitude')).toBeInTheDocument();
      expect(screen.getByLabelText('Longitude')).toBeInTheDocument();
   });

   it('should collapse the accordion when header is clicked', async () => {
      const user = userEvent.setup();
      render(<LocationSearchForm />);

      // Find the accordion toggle button (the chevron button)
      const accordionButton = screen.getByRole('button', { expanded: true });

      // Click to collapse
      await user.click(accordionButton);

      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
   });

   it('should expand the accordion when clicked while collapsed', async () => {
      const user = userEvent.setup();
      render(<LocationSearchForm />);

      // Find the accordion toggle button (the chevron button)
      const accordionButton = screen.getByRole('button', { expanded: true });

      // Collapse first
      await user.click(accordionButton);
      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');

      // Expand again
      await user.click(accordionButton);
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
   });

   it('should toggle accordion multiple times', async () => {
      const user = userEvent.setup();
      render(<LocationSearchForm />);

      // Find the accordion toggle button (the chevron button)
      const accordionButton = screen.getByRole('button', { expanded: true });

      // Toggle multiple times
      await user.click(accordionButton); // collapse
      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(accordionButton); // expand
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');

      await user.click(accordionButton); // collapse
      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(accordionButton); // expand
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
   });

   it('should show green background when form is submitted successfully', async () => {
      const user = userEvent.setup();

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '40.7128',
         lonInput: '-74.006',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });

      // Button should have blue background initially
      expect(submitButton).toHaveClass('bg-blue-600');
      expect(submitButton).not.toHaveClass('bg-green-600');

      await user.click(submitButton);

      // Button should have green background immediately after submission
      expect(submitButton).toHaveClass('bg-green-600');
      expect(submitButton).not.toHaveClass('bg-blue-600');
   });

   it('should return to blue background after 800ms', async () => {
      vi.useFakeTimers();

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '40.7128',
         lonInput: '-74.006',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });

      // Click to submit
      act(() => {
         submitButton.click();
      });

      // Should be green immediately
      expect(submitButton).toHaveClass('bg-green-600');

      // Fast-forward time by 800ms and wait for state update
      await act(async () => {
         vi.advanceTimersByTime(800);
      });

      // Should return to blue after 800ms
      expect(submitButton).toHaveClass('bg-blue-600');
      expect(submitButton).not.toHaveClass('bg-green-600');

      vi.useRealTimers();
   });

   it('should not show green background for invalid submissions', async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      vi.mocked(useLocationStore).mockReturnValue({
         latitude: 44.7975,
         longitude: -93.5272,
         latInput: '95',
         lonInput: '-93.5272',
         baseLayer: 'street',
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
         setBaseLayer: mockSetBaseLayer,
         hydrateFromStorage: vi.fn(),
      });

      render(<LocationSearchForm />);

      const submitButton = screen.getByRole('button', { name: /^search$/i });

      await user.click(submitButton);

      // Button should remain blue (not turn green) for invalid input
      expect(submitButton).toHaveClass('bg-blue-600');
      expect(submitButton).not.toHaveClass('bg-green-600');
      expect(mockSetLocation).not.toHaveBeenCalled();

      alertSpy.mockRestore();
   });

   describe('Base Layer Control', () => {
      it('should render all three base layer options', () => {
         render(<LocationSearchForm />);

         expect(screen.getByText('Map Layer')).toBeInTheDocument();
         expect(screen.getByRole('button', { name: /switch to street view/i })).toBeInTheDocument();
         expect(screen.getByRole('button', { name: /switch to satellite view/i })).toBeInTheDocument();
         expect(screen.getByRole('button', { name: /switch to hybrid view/i })).toBeInTheDocument();
      });

      it('should highlight the current base layer', () => {
         render(<LocationSearchForm />);

         const streetButton = screen.getByRole('button', { name: /switch to street view/i });
         expect(streetButton).toHaveAttribute('aria-pressed', 'true');
         expect(streetButton).toHaveClass('bg-blue-600');
      });

      it('should call setBaseLayer when street button is clicked', async () => {
         const user = userEvent.setup();

         vi.mocked(useLocationStore).mockReturnValue({
            latitude: 44.7975,
            longitude: -93.5272,
            latInput: '44.7975',
            lonInput: '-93.5272',
            baseLayer: 'satellite',
            isHydrated: true,
            setLatitude: vi.fn(),
            setLongitude: vi.fn(),
            setLatInput: mockSetLatInput,
            setLonInput: mockSetLonInput,
            setLocation: mockSetLocation,
            setBaseLayer: mockSetBaseLayer,
            hydrateFromStorage: vi.fn(),
         });

         render(<LocationSearchForm />);

         const streetButton = screen.getByRole('button', { name: /switch to street view/i });
         await user.click(streetButton);

         expect(mockSetBaseLayer).toHaveBeenCalledWith('street');
      });

      it('should call setBaseLayer when satellite button is clicked', async () => {
         const user = userEvent.setup();
         render(<LocationSearchForm />);

         const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
         await user.click(satelliteButton);

         expect(mockSetBaseLayer).toHaveBeenCalledWith('satellite');
      });

      it('should call setBaseLayer when hybrid button is clicked', async () => {
         const user = userEvent.setup();
         render(<LocationSearchForm />);

         const hybridButton = screen.getByRole('button', { name: /switch to hybrid view/i });
         await user.click(hybridButton);

         expect(mockSetBaseLayer).toHaveBeenCalledWith('hybrid');
      });

      it('should highlight satellite layer when it is active', () => {
         vi.mocked(useLocationStore).mockReturnValue({
            latitude: 44.7975,
            longitude: -93.5272,
            latInput: '44.7975',
            lonInput: '-93.5272',
            baseLayer: 'satellite',
            isHydrated: true,
            setLatitude: vi.fn(),
            setLongitude: vi.fn(),
            setLatInput: mockSetLatInput,
            setLonInput: mockSetLonInput,
            setLocation: mockSetLocation,
            setBaseLayer: mockSetBaseLayer,
            hydrateFromStorage: vi.fn(),
         });

         render(<LocationSearchForm />);

         const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
         expect(satelliteButton).toHaveAttribute('aria-pressed', 'true');
         expect(satelliteButton).toHaveClass('bg-blue-600');
      });

      it('should highlight hybrid layer when it is active', () => {
         vi.mocked(useLocationStore).mockReturnValue({
            latitude: 44.7975,
            longitude: -93.5272,
            latInput: '44.7975',
            lonInput: '-93.5272',
            baseLayer: 'hybrid',
            isHydrated: true,
            setLatitude: vi.fn(),
            setLongitude: vi.fn(),
            setLatInput: mockSetLatInput,
            setLonInput: mockSetLonInput,
            setLocation: mockSetLocation,
            setBaseLayer: mockSetBaseLayer,
            hydrateFromStorage: vi.fn(),
         });

         render(<LocationSearchForm />);

         const hybridButton = screen.getByRole('button', { name: /switch to hybrid view/i });
         expect(hybridButton).toHaveAttribute('aria-pressed', 'true');
         expect(hybridButton).toHaveClass('bg-blue-600');
      });

      it('should show inactive styling for non-selected layers', () => {
         render(<LocationSearchForm />);

         const satelliteButton = screen.getByRole('button', { name: /switch to satellite view/i });
         const hybridButton = screen.getByRole('button', { name: /switch to hybrid view/i });

         expect(satelliteButton).toHaveAttribute('aria-pressed', 'false');
         expect(satelliteButton).toHaveClass('bg-white/20');
         expect(satelliteButton).not.toHaveClass('bg-blue-600');

         expect(hybridButton).toHaveAttribute('aria-pressed', 'false');
         expect(hybridButton).toHaveClass('bg-white/20');
         expect(hybridButton).not.toHaveClass('bg-blue-600');
      });
   });
});
