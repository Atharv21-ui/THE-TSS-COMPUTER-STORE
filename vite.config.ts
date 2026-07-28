import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: process.env.GITHUB_ACTIONS === 'true' ? '/THE-TSS-COMPUTER-STORE/' : './', // Use repo subpath for GitHub Pages, relative for local/other
  server: {
    host: true, // Allow mobile network access
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
