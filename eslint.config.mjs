import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['**/dist', '**/.eslintrc.cjs', '**/node_modules', '**/dist', '**/.eslintrc.js']
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended'
    )
  ),
  {
    plugins: {
      'react-refresh': reactRefresh,
      '@typescript-eslint': fixupPluginRules(typescriptEslint)
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },

    settings: {
      react: {
        version: '18.2'
      }
    },

    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': [
        'error',
        {
          extendDefaults: true,
          types: {
            '{}': false
          }
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  }
];
