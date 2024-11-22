import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';
import path from 'path';
import { VitePluginRadar } from 'vite-plugin-radar';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-EZPQMV95QJ',
        disable: true,
      },
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
