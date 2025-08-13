import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/fapi':'http://localhost:3000',
      '/ftex':'http://localhost:3000'
    }
  },
  plugins: [react(),tailwindcss()],
})
