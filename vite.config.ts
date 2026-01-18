import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { VitePluginRadar } from 'vite-plugin-radar';
import svgr from 'vite-plugin-svgr';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    wasm(),
    VitePluginRadar({
      analytics: {
        id: 'G-EZPQMV95QJ',
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true, // 이전 캐시 삭제
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // 필요한 파일만 포함
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB로 상향 조정
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' || request.destination === 'style' || request.destination === 'document',
            handler: 'NetworkOnly', // 네트워크만 사용
          },
        ],
      },
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
            purpose: 'maskable',
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
      { find: '@constants', replacement: '/src/constants' },
      { find: '@controllers', replacement: '/src/controllers' },
      { find: '@components', replacement: '/src/components' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@config', replacement: '/src/config' },
    ],
  },
});
