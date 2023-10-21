module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:perfectionist/recommended-natural',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['@typescript-eslint', 'zod'],
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       extensions: ['.js', '.ts', '.tsx'],
  //       moduleDirectory: ['src', 'node_modules'],
  //     },
  //   },
  // },
  rules: {
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'always',
      },
    ],
    'import/no-unresolved': 'off', // https://stackoverflow.com/questions/71998932/make-import-extensions-require-the-js-extension-in-a-node-js-typescript-proje
    '@typescript-eslint/consistent-type-imports': 'warn',
  },
};
