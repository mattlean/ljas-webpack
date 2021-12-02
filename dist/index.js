const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
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
 *
 * Supports the following LJAS presets:
 * - "default": Sets up @babel/preset-env with the modules option set to false
 * - "ts": Sets up @babel/preset-env & @babel/preset-typescript. Because Babel does not support type checking, Fork TS Checker Webpack Plugin is enabled.
 *
 * @param {'default'|'ts'|Object} [arg='default'] Can be passed in an argument object or a string corresponding to a supported LJAS preset
 * @param {Object} [arg.rule] webpack rule. Overrides options when a conflict occurs.
 * @param {RegExp} [arg.rule.test=/\.m?js$/i] webpack rule test assertion
 * @param {Object} [arg.options] babel-loader options
 * @param {Object} [arg.plugins] webpack plugins options
 * @param {Object} [arg.resolve] webpack resolve options
 * @return {Object} babel-loader config
 */
exports.compileBabel = (arg) => {
  const babelRule = {
    test: /\.m?js$/i,
    use: {
      loader: 'babel-loader',
    },
  }

  const config = {
    module: {
      rules: [babelRule],
    },
  }

  if (
    arg === 'default' ||
    !arg ||
    (typeof arg === 'object' && Object.keys(arg).length === 0)
  ) {
    babelRule.use.options = {
      presets: [['@babel/preset-env', { modules: false }]],
    }
  } else if (arg === 'ts') {
    config.plugins = [new ForkTsCheckerWebpackPlugin()]
    config.resolve = {
      extensions: ['.mjs', '.js', '.ts'],
    }
    babelRule.test = /\.(m?j|t)s$/i
    babelRule.use.options = {
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-typescript',
      ],
    }
  } else if (typeof arg === 'object') {
    for (const argKey of Object.keys(arg)) {
      if (argKey === 'options') {
        babelRule.use.options = arg.options
      } else if (argKey === 'rule') {
        for (const ruleKey of Object.keys(arg.rule)) {
          babelRule[ruleKey] = arg.rule[ruleKey]
        }
      } else if (argKey === 'plugins') {
        config.plugins = arg.plugins
      } else if (argKey === 'resolve') {
        config.resolve = arg.resolve
      }
    }
  }

  return config
}

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

/**
 * Setup webpack-dev-server.
 * @param {Object} [devServer] webpack-dev-server options
 * @return {Object} devServer config
 */
exports.setupDevServer = (devServer) => ({ devServer })
