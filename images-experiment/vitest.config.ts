import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test/setup.ts'],
        // This ensures console.log works in tests
        testTransformMode: { web: ['/.[jt]sx?$/'] }
    }
})