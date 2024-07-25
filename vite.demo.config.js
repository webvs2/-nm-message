import { defineConfig } from 'vite'
export default defineConfig({
   mode:"production",
   build:{
    target:"modules",
    outDir:'docs',
    
   }
  })