import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'NAMMA KARNATAKA',
        short_name: 'NK',
        description: 'Public Services Platform for Karnataka',
        theme_color: '#1647b6',
        background_color: '#f9fafb',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          { urlPattern: /open-meteo/, handler: 'NetworkFirst', options: { cacheName: 'weather', expiration: { maxAgeSeconds: 1800 } } },
          { urlPattern: /rss2json/, handler: 'NetworkFirst', options: { cacheName: 'news', expiration: { maxAgeSeconds: 600 } } },
          { urlPattern: /data\.gov\.in/, handler: 'NetworkFirst', options: { cacheName: 'market', expiration: { maxAgeSeconds: 3600 } } },
          { urlPattern: /overpass-api/, handler: 'NetworkFirst', options: { cacheName: 'osm', expiration: { maxAgeSeconds: 3600 } } },
          { urlPattern: /fonts\.googleapis/, handler: 'CacheFirst', options: { cacheName: 'fonts', expiration: { maxAgeSeconds: 2592000 } } }
        ]
      }
    })
  ]
})
