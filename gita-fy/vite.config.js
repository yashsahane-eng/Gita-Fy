import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',   // 👈 add this line
  server: {
    proxy: {
      '/api': {
        target: 'https://gita-fy.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
