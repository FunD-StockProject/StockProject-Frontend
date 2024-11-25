import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { VitePluginRadar } from 'vite-plugin-radar';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePluginRadar({
      analytics: {
        id: 'G-EZPQMV95QJ',
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'humanzipyo',
        short_name: 'humanzipyo',
        theme_color: '#5270FF',
        background_color: '#000000',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'c',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@ts', replacement: '/src/ts' },
      { find: '@base', replacement: '/src/base' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@router', replacement: '/src/router' },
      { find: '@layout', replacement: '/src/layout' },
      { find: '@common', replacement: '/src/common' },
      { find: '@recoils', replacement: '/src/recoils' },
      { find: '@controllers', replacement: '/src/controllers' },
      { find: '@components', replacement: '/src/components' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@assets', replacement: '/src/assets' },
    ],
  },
});
