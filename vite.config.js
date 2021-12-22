import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false
  },
  plugins: [
    svelte({}),
    VitePWA({
      strategies: 'injectManifest',
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
        name: 'Browserlist',
        short_name: 'Browserlist',
        description: 'Browserlist wasm',
        theme_color: '#ffffff'
        // icons: [
        //   {
        //     src: 'pwa-192x192.png',
        //     sizes: '192x192',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //     purpose: 'any maskable',
        //   }
        // ]
      }
    })
  ]
})
