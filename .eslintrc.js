module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:eslint-comments/recommended',
    'plugin:@tanstack/query/recommended',
  ],
  ignorePatterns: [
    '.eslintrc.js',
    '.prettierrc.js',
    'babel.config.js',
    'commitlint.config.js',
    'jest.config.js',
    'jest.setup.ts',
    'metro.config.js',
    'react-native.config.js',
    '/@types/*',
    '__mocks__',
    '/coverage/*',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['autofix', 'import', 'react-func', '@tanstack/query'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'default', format: ['camelCase'] },
      { selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
      {
        selector: 'variable',
        types: ['function'],
        format: ['PascalCase', 'camelCase'],
      },
      { selector: 'function', format: ['PascalCase', 'camelCase'] },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      { selector: 'enumMember', format: ['UPPER_CASE'] },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'import', format: ['PascalCase', 'camelCase'] },
      {
        selector: [
          'classProperty',
          'objectLiteralProperty',
          'typeProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
          'enumMember',
        ],
        format: null,
        modifiers: ['requiresQuotes'],
      },
      {
        selector: ['objectLiteralProperty'],
        format: null,
        filter: { regex: '(firebase)', match: true },
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'autofix/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    'import/no-unresolved': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          { pattern: '@src/**/**', group: 'parent', position: 'before' },
          { pattern: '@modules/**/**', group: 'parent', position: 'before' },
        ],
        alphabetize: { order: 'asc' },
      },
    ],
    'no-restricted-imports': ['error', { patterns: ['../'] }],
    eqeqeq: [1, 'allow-null'],

    'eslint-comments/no-use': ['error', { allow: [] }],
    'react-hooks/exhaustive-deps': 1,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': { typescript: true, node: true },
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      // API response files - allow snake_case for OAuth2 and API responses
      files: ['**/Api/responses/**/*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'typeProperty',
            format: ['camelCase', 'snake_case'],
          },
        ],
      },
    },
  ],
};
