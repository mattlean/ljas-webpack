const path = require('path')
const { merge } = require('webpack-merge')
const {
  buildHTML,
  cleanOutput,
  copyFiles,
  compileBabel,
  injectCSS,
  setupDevServer,
} = require('../dist')

module.exports = merge(
  {
    entry: path.resolve(__dirname, 'main.js'),

    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'script.js',
    },

    mode: 'development',
  },

  compileBabel(),

  buildHTML(),

  injectCSS(),

  setupDevServer(),

  copyFiles({
    patterns: [{ from: 'test/foo.txt', to: 'foo-copy.txt' }],
  }),

  cleanOutput()
)
