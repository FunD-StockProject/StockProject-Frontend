import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
// import { VitePluginRadar } from 'vite-plugin-radar';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    // VitePluginRadar({
    //   analytics: {
    //     id: 'G-EZPQMV95QJ',
    //   },
    // }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      // workbox: {
      //   clientsClaim: true,
      //   skipWaiting: true,
      // },
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        name: 'humanzipyo',
        short_name: 'humanzipyo',
        description: '프로젝트 설명',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        prefer_related_applications: true,
        lang: 'ko',
        display: 'standalone',
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
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
