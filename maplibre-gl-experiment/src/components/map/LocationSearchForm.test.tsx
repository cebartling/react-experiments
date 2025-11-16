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

   beforeEach(() => {
      vi.clearAllMocks();
      vi.useRealTimers(); // Ensure we're using real timers for each test

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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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

      const accordionButton = screen.getByRole('button', { name: /search location/i });
      expect(accordionButton).toHaveAttribute('aria-expanded', 'true');

      // Form fields should be visible
      expect(screen.getByLabelText('Latitude')).toBeInTheDocument();
      expect(screen.getByLabelText('Longitude')).toBeInTheDocument();
   });

   it('should collapse the accordion when header is clicked', async () => {
      const user = userEvent.setup();
      render(<LocationSearchForm />);

      const accordionButton = screen.getByRole('button', { name: /search location/i });

      // Click to collapse
      await user.click(accordionButton);

      expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
   });

   it('should expand the accordion when clicked while collapsed', async () => {
      const user = userEvent.setup();
      render(<LocationSearchForm />);

      const accordionButton = screen.getByRole('button', { name: /search location/i });

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

      const accordionButton = screen.getByRole('button', { name: /search location/i });

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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
         isHydrated: true,
         setLatitude: vi.fn(),
         setLongitude: vi.fn(),
         setLatInput: mockSetLatInput,
         setLonInput: mockSetLonInput,
         setLocation: mockSetLocation,
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
});
