import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['setupTests.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/out-tsc/**',
      '**/build/**',
      '**/.angular/**'
    ]

  }
});