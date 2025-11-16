import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup after each test case
afterEach(() => {
   cleanup();
});

// Mock localforage for testing
vi.mock('localforage', () => ({
   default: {
      createInstance: () => ({
         getItem: vi.fn(),
         setItem: vi.fn(),
         removeItem: vi.fn(),
         clear: vi.fn(),
      }),
   },
}));

// Add custom matchers
expect.extend({});
