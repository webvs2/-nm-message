import { defineConfig } from 'vite'
export default defineConfig({
   mode:"production",
   base:'/-nm-message/',
   build:{
    target:"modules",
    outDir:'docs',

   }
  })