import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom'],
          // Define additional manual chunks as needed
        }
      }
    }
  }
})
