import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ 
    rollupTypes: true, 
    name: "main",
    cleanVueFileName: true,
    insertTypesEntry: true,
    outDir: 'dist'
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'nm',
      formats: ['es'],
      fileName: (format) => `nm.js`
    },
    rollupOptions: {
      output: {
        globals: {
        },
        preserveModules: false,
        compact: true
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false
      }
    },
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: false,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 10,
    emptyOutDir: true
  },
  esbuild: {
    drop: ['console', 'debugger'],
    treeShaking: true
  }
})