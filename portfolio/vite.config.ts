import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Clean URLs (/work/cemetric). If you deploy to a sub-path — GitHub Pages
  // project sites, for example — set this to '/<repo-name>/'.
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700,
  },
})
