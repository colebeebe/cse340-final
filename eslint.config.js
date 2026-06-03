import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      emcaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    rules: {
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'no-console': 'warn',
    },
  },
  {
    files: ['./index.js'],
    rules: {
      'no-console': 'off',
    },
  },
]);
