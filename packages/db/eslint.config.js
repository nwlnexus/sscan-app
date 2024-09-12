import baseConfig from '@nwlnexus/config/eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist/**/*'],
  },
  ...baseConfig,
]
