const merge = require('webpack-merge')

const parts = require('../parts')
const PATHS = require('../../PATHS').renderer

module.exports = merge([
  {
    output: {
      chunkFilename: '[name].js',
      filename: '[name].js',
      path: PATHS.build
    }
  },

  parts.cleanPaths(['build/development/renderer']),

  parts.setupDevServer({
    host: process.env.HOST,
    port: process.env.PORT,
    historyApiFallback: true,
    hot: true
  }),

  parts.loadStyles(),

  parts.loadImgs(),

  parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
])
