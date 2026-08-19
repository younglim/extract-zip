const js = require('@eslint/js')
const globals = require('globals')
const nodePlugin = require('eslint-plugin-n')
const promisePlugin = require('eslint-plugin-promise')
const avaPlugin = require('eslint-plugin-ava')
const importPlugin = require('eslint-plugin-import')

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      '.nyc_output/**',
      '*.zip'
    ]
  },
  js.configs.recommended,
  nodePlugin.configs['flat/recommended-script'],
  promisePlugin.configs['flat/recommended'],
  importPlugin.flatConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // extract-zip supports the callback API of yauzl via promisify, so it
      // occasionally uses `new Promise` around emitter events. That's fine.
      'promise/avoid-new': 'off',
      // n/no-unsupported-features triggers on Node APIs newer than the
      // "engines" range; we bumped engines to >=18 which covers everything.
      'n/no-unsupported-features/node-builtins': 'error'
    }
  },
  {
    files: ['test/**/*.js'],
    plugins: { ava: avaPlugin },
    rules: {
      ...avaPlugin.configs['flat/recommended'].rules
    }
  }
]
