// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ rollupTypes: true,  name: "main"  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
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