import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';
import { VitePluginRadar } from 'vite-plugin-radar';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePluginRadar({
      analytics: {
        id: 'G-EZPQMV95QJ',
        disable: true,
      },
    }),
  ],
  base: '/',
});
