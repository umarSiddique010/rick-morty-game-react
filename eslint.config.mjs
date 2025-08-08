import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'writable',
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off', // optional: only if you want to disable prop-types warnings
    },
  },

  {
    files: ['**/__test__/**/*.js', '**/__tests__/**/*.js', '**/__mocks__/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
  },

  prettier,
];
