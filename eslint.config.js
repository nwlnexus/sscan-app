import eslintConfig from '@nwlnexus/config/eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['**/node_modules/**', 'apps/**', 'packages/**', 'tooling/**', '.turbo/**'],
  },
  ...eslintConfig,
]
