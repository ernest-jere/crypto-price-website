import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  configLoader: 'runner', 
  build: {
    chunkSizeWarningLimit: 1000,
  }
})

