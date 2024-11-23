import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';
import { VitePluginRadar } from 'vite-plugin-radar';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    svgr(), // SVG 파일을 React 컴포넌트로 변환하는 플러그인
    react(),
    VitePluginRadar({
      analytics: {
        id: 'G-EZPQMV95QJ',
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg}'], // SVG 포함
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.svg'), // .svg 파일만 캐시
            handler: 'CacheFirst', // 캐시 정책 설정
            options: {
              cacheName: 'svg-cache',
              expiration: {
                maxEntries: 10, // 캐시할 파일 수
                maxAgeSeconds: 60 * 60 * 24, // 1일
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      // SVG 파일을 PWA 자산에 포함하지 않도록 수정
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'humanzipyo',
        short_name: 'humanzipyo',
        theme_color: '#ffffff',
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
