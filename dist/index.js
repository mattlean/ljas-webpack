const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Configure html-webpack-plugin to handle creation of HTML.
 * @param {Object} [options] html-webpack-plugin options
 * @return {Object} html-webpack-plugin config
 */
exports.buildHTML = (options) => ({
  plugins: [new HtmlWebpackPlugin(options)],
})

/**
 * Configure clean option for output.
 * @param {boolean|Object} [clean=true] clean option
 * @return {Object} Output config
 */
exports.cleanOutput = (clean = true) => ({
  output: { clean },
})

/**
 * Transpile JavaScript files using Babel with babel-loader.
 * @param {Object} [argObj] Argument object
 * @param {Object} [argObj.rule] webpack rule. Overrides styleLoaderOptions & cssLoaderOptions when a conflict occurs.
 * @param {RegExp} [argObj.rule.test=/\.m?js$/i] webpack rule test assertion
 * @param {Object} [argObj.options] babel-loader options
 * @return {Object} babel-loader config
 */
exports.compileBabel = ({ rule = {}, options } = {}) => ({
  module: {
    rules: [
      {
        test: (rule && rule.test) || /\.m?js$/i,
        use: {
          loader: 'babel-loader',
          options,
        },
        ...rule,
      },
    ],
  },
})

/**
 * Setup webpack-dev-server.
 * @param {Object} [devServer] webpack-dev-server options
 * @return {Object} devServer config
 */
exports.setupDevServer = (devServer) => ({ devServer })

/**
 * Handle CSS and inject into the DOM.
 * @param {Object} [argObj] Argument object
 * @param {Object} [argObj.rule] webpack rule. Overrides styleLoaderOptions & cssLoaderOptions when a conflict occurs.
 * @param {RegExp} [argObj.rule.test=/\.css$/i] webpack rule test assertion
 * @param {Object} [argObj.styleLoaderOptions] style-loader options
 * @param {Object} [argObj.cssLoaderOptions] css-loader options
 * @return {Object} webpack module that configures css-loader & style-loader
 */
exports.injectCSS = ({
  rule = {},
  cssLoaderOptions,
  styleLoaderOptions,
} = {}) => ({
  module: {
    rules: [
      {
        test: (rule && rule.test) || /\.css$/i,
        use: [
          { loader: 'style-loader', options: styleLoaderOptions },
          { loader: 'css-loader', options: cssLoaderOptions },
        ],
        ...rule,
      },
    ],
  },
})
