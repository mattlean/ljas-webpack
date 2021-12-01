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
    entry: path.resolve(__dirname, 'react-main.jsx'),

    output: {
      path: path.resolve(__dirname, 'react'),
      filename: 'script.js',
    },

    mode: 'development',
  },

  compileBabel('react'),

  buildHTML(),

  injectCSS(),

  setupDevServer({
    static: path.resolve(__dirname, 'react'),
  }),

  cleanOutput()
)
