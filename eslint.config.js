import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import airbnb from 'eslint-config-airbnb'
import airbnbTypescript from 'eslint-config-airbnb-typescript'
import tsParser from '@typescript-eslint/parser'

export default defineConfig([
  { ignores: ['dist'] },
  {},
  {
    extends: [
      js.configs.recommended,
      ...airbnb,
      ...airbnbTypescript,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      ecmaVersion: 'latest',
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
]).concat(eslintPluginPrettier)
