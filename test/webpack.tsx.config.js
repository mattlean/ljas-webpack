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
    entry: path.resolve(__dirname, 'tsx-main.tsx'),

    output: {
      path: path.resolve(__dirname, 'tsx'),
      filename: 'script.js',
    },

    mode: 'development',
  },

  compileBabel('ts+react'),

  buildHTML(),

  injectCSS(),

  setupDevServer({
    static: path.resolve(__dirname, 'tsx'),
  }),

  cleanOutput()
)
