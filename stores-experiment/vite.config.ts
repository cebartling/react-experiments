import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '~components': path.resolve(__dirname, 'src/components'),
            '~hooks': path.resolve(__dirname, 'src/hooks'),
        },
    },
    // @ts-expect-error - vite types are not up to date
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
    },
});
