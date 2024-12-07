import dotenv from 'dotenv'
import { defineConfig } from 'vitest/config'

dotenv.config({ path: '.env.test' })

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.spec.js'],
    coverage: {
      exclude: [
        'esbuild.config.cjs',
        'eslint.config.js',
        'vitest.config.js',
        'dist/**',
        'tests/**',
      ],
    },
  },
})
