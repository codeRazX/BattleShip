import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
 
  {
    files: ['**/*.js'], 
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser, 
    },
    rules: {
      'no-console': 'error',       
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],  
      'no-unused-vars': 'warn',      
      'eqeqeq': ['error', 'always'], 
      'prefer-const': 'error',      
      'indent': ['error', 2],        
      'no-trailing-spaces': 'error', 
    },
  },
  
  
  {
    files: ['**/*.test.js', '**/*.spec.js'], 
    plugins: ['jest'],
    extends: ['plugin:jest/recommended'], 
  },

 
  {
    files: ['webpack.*.js', 'babel.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },

  
  pluginJs.configs.recommended, 
];
