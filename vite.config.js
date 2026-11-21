import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Must match your GitHub repo name (case-sensitive) for GitHub Pages
  base: '/DSAMastery/',
})
