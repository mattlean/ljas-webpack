const path = require('path')
const { merge } = require('webpack-merge')
const { buildHTML, cleanOutput, injectCSS, setupDevServer } = require('../dist')

module.exports = merge(
  {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'script.js',
    },
    mode: 'development',
  },

  buildHTML(),

  injectCSS(),

  setupDevServer(),

  cleanOutput()
)
