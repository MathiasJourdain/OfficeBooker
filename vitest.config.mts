import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './') },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
    globals: true,
    include: ['tests/**/*.test.tsx', 'tests/**/*.test.ts'],
    css: false,
  }
})