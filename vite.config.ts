import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { FRONTEND_PORT } from './endpoints.config.ts'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: FRONTEND_PORT,
  },
  plugins: [react()],
})
