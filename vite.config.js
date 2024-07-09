// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'nm',
      formats:['es']
    },
    rollupOptions: {
      output: {
        globals: {
        },
      },
    },
  },
})