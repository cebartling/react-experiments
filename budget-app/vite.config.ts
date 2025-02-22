import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import * as path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: './stats.html',
      template: 'sunburst', // 'treemap' or 'sunburst', 'network'
      gzipSize: true,
      brotliSize: true,
      open: false,
      title: 'Bundle Analysis',
      projectRoot: process.cwd(),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
});
