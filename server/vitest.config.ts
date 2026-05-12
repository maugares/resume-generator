import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.ts'],
    coverage: {
      include: ['**/*.ts'],
      exclude: ['**/*.test.ts', 'vitest.config.ts'],
    },
  },
})
