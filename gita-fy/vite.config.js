import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // This is the only change:
        // It now points to your LIVE backend on Render
        target: 'https://gita-fy.onrender.com', 
        changeOrigin: true,
      },
    },
  },
})