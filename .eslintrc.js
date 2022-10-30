module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'no-restricted-exports': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-import-module-exports': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'no-param-reassign': 0,
  },
};
