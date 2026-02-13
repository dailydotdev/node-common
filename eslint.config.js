import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettier,
  {
    ignores: ['dist/', 'node_modules/'],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Node.js builtins prefixed with `node:`.
            ['^node:'],
            // Packages (start with letter/digit/underscore, or `@` followed by letter).
            ['^@?\\w'],
            // @dailydotdev scoped packages.
            ['^@dailydotdev/?\\w'],
            // Absolute imports and other imports not matched above.
            ['^'],
            // Relative imports (start with a dot).
            ['^\\.'],
          ],
        },
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
);
