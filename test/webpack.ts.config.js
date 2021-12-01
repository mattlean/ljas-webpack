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
    entry: path.resolve(__dirname, 'ts-main.ts'),

    output: {
      path: path.resolve(__dirname, 'ts'),
      filename: 'script.js',
    },

    mode: 'development',
  },

  compileBabel('ts'),

  buildHTML(),

  injectCSS(),

  setupDevServer({
    static: path.resolve(__dirname, 'ts'),
  }),

  cleanOutput()
)
