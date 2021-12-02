const path = require('path')
const { merge } = require('webpack-merge')
const {
  buildHTML,
  cleanOutput,
  compileBabel,
  injectCSS,
  setupDevServer,
} = require('../dist')

module.exports = merge(
  {
    entry: path.resolve(__dirname, 'index.ts'),

    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'ts-script.js',
    },

    mode: 'development',
  },

  compileBabel('ts'),

  buildHTML(),

  injectCSS(),

  setupDevServer(),

  cleanOutput()
)
