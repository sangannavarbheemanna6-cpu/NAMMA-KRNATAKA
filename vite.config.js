import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'offline.html'],
      manifest: {
        id: '/',
        name: 'NAMMA KARNATAKA',
        short_name: 'Namma KTK',
        description: 'Public Services Platform for Karnataka — weather, market prices, farmer hub, education, health, emergency services, and more.',
        theme_color: '#1647b6',
        background_color: '#f9fafb',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        lang: 'en-IN',
        dir: 'ltr',
        categories: ['government', 'utilities', 'news', 'education', 'health'],
        icons: [
          { src: '/icon-48.png', sizes: '48x48', type: 'image/png' },
          { src: '/icon-72.png', sizes: '72x72', type: 'image/png' },
          { src: '/icon-96.png', sizes: '96x96', type: 'image/png' },
          { src: '/icon-144.png', sizes: '144x144', type: 'image/png' },
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-192-maskable.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png}'],
        runtimeCaching: [
          { urlPattern: /open-meteo/, handler: 'NetworkFirst', options: { cacheName: 'weather', expiration: { maxAgeSeconds: 1800 } } },
          { urlPattern: /rss2json/, handler: 'NetworkFirst', options: { cacheName: 'news', expiration: { maxAgeSeconds: 600 } } },
          { urlPattern: /data\.gov\.in/, handler: 'NetworkFirst', options: { cacheName: 'market', expiration: { maxAgeSeconds: 3600 } } },
          { urlPattern: /overpass-api/, handler: 'NetworkFirst', options: { cacheName: 'osm', expiration: { maxAgeSeconds: 3600 } } },
          { urlPattern: /fonts\.googleapis/, handler: 'CacheFirst', options: { cacheName: 'fonts', expiration: { maxAgeSeconds: 2592000 } } },
          { urlPattern: /fonts\.gstatic/, handler: 'CacheFirst', options: { cacheName: 'fonts-static', expiration: { maxAgeSeconds: 2592000 } } }
        ]
      }
    })
  ]
})
