// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: '@nm/message',
      // the proper extensions will be added
      // fileName: '@nm/message',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
    //   external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
        //   vue: 'Vue',
        },
      },
    },
  },
})