import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/creative/' : '/',
  server: {
    port: 5174,
    strictPort: true,
  },
  plugins: [react()],
}))
