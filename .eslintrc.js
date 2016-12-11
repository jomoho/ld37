module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'indent': 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'padded-blocks': 0,
    'arrow-parens': 0,
    'no-multiple-empty-lines': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': 1,
    'no-unused-vars': 1
  }
}
