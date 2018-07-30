module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/standard',
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  rules: {
    'eol-last': ['error', 'always'],
    'prettier/prettier': 'error',

    'react/jsx-indent': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-filename-extension': 0,
    'react/destructuring-assignment': 0,
    'import/no-extraneous-dependencies': 0,
  }
}