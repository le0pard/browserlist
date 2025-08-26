import path from 'path'
import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@utils': path.resolve('./src/utils')
    },
  },
  plugins: [
    svelte(),
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        maximumFileSizeToCacheInBytes: 5000000,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,wasm}']
      },
      includeAssets: [],
      manifest: {
        name: 'Browserlist WASM',
        short_name: 'Browserlist',
        description: 'Browserlist WASM',
        display: 'standalone',
        start_url: '/',
        theme_color: '#1f1f1f',
        background_color: '#f7f7f7',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
})
