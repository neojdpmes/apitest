module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': 1,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/member-ordering': 1,
    '@typescript-eslint/require-await': 1,
    '@typescript-eslint/no-extra-semi': 1,
    '@typescript-eslint/prefer-includes': 1,
    '@typescript-eslint/prefer-for-of': 1,
    "@typescript-eslint/semi": ["error"],
    '@typescript-eslint/comma-spacing': 1,
    '@typescript-eslint/indent': ["error", 2],
  },
};
