module.exports = {
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 6,
    parser: 'babel-eslint'
  },

  rules: {
    semi: ['error', 'always']
  }
};
