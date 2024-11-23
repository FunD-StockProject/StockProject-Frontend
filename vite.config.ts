import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';
import { VitePluginRadar } from 'vite-plugin-radar';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePluginRadar({
      analytics: {
        id: 'G-EZPQMV95QJ',
      },
    }),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   workbox: {
    //     clientsClaim: true,
    //     skipWaiting: true,
    //   },
    //   devOptions: {
    //     enabled: true,
    //   },
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    //   manifest: {
    //     name: 'humanzipyo',
    //     short_name: 'humanzipyo',
    //     theme_color: '#ffffff',
    //     icons: [
    //       {
    //         src: 'pwa-64x64.png',
    //         sizes: '64x64',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any',
    //       },
    //       {
    //         src: 'maskable-icon-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'maskable',
    //       },
    //     ],
    //   },
    // }),
    svgr(),
  ],
});
