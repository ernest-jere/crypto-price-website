import { defineConfig } from 'vite'
import react from '@vitejs/plugin-vue' // or @vitejs/plugin-react based on your project setups

export default defineConfig({
  plugins: [react()],
  // Explicitly suppress the native loader warning that crashes Vercel's bundler checks
  configLoader: 'runner', 
  build: {
    chunkSizeWarningLimit: 1000, // Extends the 500kb chunk size limit warning you encountered earlier
  }
})
