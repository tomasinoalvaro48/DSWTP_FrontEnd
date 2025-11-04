import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { FRONTEND_PORT } from './endpoints.config.ts'
import { configDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: FRONTEND_PORT,
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    pool: 'threads',
    testTimeout: 20000,
  },
})
