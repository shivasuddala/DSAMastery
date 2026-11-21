import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: change this to your GitHub repo name, e.g. '/dsa-mastery/'
  base: '/dsa-mastery/',
})
