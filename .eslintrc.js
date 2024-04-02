module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxt/eslint-config'
  ],
  plugins: [
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'debug', 'log'] }],
    'no-trailing-spaces': 'off'
  }
}
