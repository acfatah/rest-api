import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },

    rules: {
      'no-console': 'off',
    },

    ignores: [
      'esbuild.config.cjs',
      '**/dist',
    ],
  },
)
