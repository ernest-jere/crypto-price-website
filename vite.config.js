import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 🚀 Import path module helper utilities

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 🚀 CRITICAL FIX: Forces react-router-dom to share your exact app React module reference tree
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  }
})

