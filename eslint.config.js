import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'dist/**',
      'public/assets/**',
      'node_modules/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
      'src/utils/test.js',
      'src/utils/worker/**',
      'src/utils/wasm/**',
    ],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/prefer-stateless-function': 0,
      'react/jsx-filename-extension': 0,
      'react/jsx-one-expression-per-line': 0,
      'no-nested-ternary': 0,
      'react/prop-types': 0,
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
