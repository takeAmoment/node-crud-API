import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
// import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from "eslint-config-prettier/flat"

export default defineConfig([
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: globals.node,
    },
    ...js.configs.recommended,
    ignores: ['**/temp.js', 'config/*'],
    rules: {
      // ...prettier.rules,
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'prefer-const': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
]);
