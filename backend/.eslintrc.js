module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['prettier'],
  rules: {
    // Enable eslint-plugin-prettier that formats content using Prettier
    'prettier/prettier': 'error',
    // Don't enforce that class methods utilize this
    'class-methods-use-this': 'off',
    // Allow unused variable for next (Express middlewares needs)
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
