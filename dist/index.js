const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Build HTML with [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin).
 * @param {Object} [options] html-webpack-plugin options
 * @return {Object} html-webpack-plugin config
 */
exports.buildHTML = (options) => ({
  plugins: [new HtmlWebpackPlugin(options)],
})

/**
 * Configure [webpack's clean option for output](https://webpack.js.org/configuration/output/#outputclean).
 * @param {boolean|Object} [clean=true] clean option
 * @return {Object} webpack output config
 */
exports.cleanOutput = (clean = true) => ({
  output: { clean },
})

/**
 * Transpile JavaScript files using [Babel](https://babeljs.io) with [babel-loader](https://webpack.js.org/loaders/babel-loader).
 *
 * Supports the following LJAS presets:
 * - `"default"`: Sets up [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) with the `modules` option set to false
 * - `"react"`: Sets up [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) (with `modules` set to false) & [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react). If the `BABEL_ENV` environment variable is set to `"development"`, then [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)'s development option is enabled.
 * - `"ts"`: Sets up [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) (with `modules` set to false) & [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript). Because Babel does not support type checking, [Fork TS Checker Webpack Plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#readme) is enabled.
 * - `"ts+react"`: Sets up [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) (with `modules` set to false), [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react), and [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript). If the `BABEL_ENV` environment variable is set to `"development"`, then [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)'s development option is enabled. Because Babel does not support type checking, [Fork TS Checker Webpack Plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#readme) is enabled.
 * @param {'default'|'react'|'ts'|Object} [arg='default'] Can be passed in an argument object or a string corresponding to a supported LJAS preset
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
  } else if (arg === 'react') {
    config.resolve = {
      extensions: ['.js', '.jsx', '.mjs'],
    }
    babelRule.test = /\.m?jsx?$/i
    babelRule.use.options = {
      presets: [
        ['@babel/preset-env', { modules: false }],
        [
          '@babel/preset-react',
          { development: process.env.BABEL_ENV === 'development' },
        ],
      ],
    }
  } else if (arg === 'ts') {
    config.plugins = [new ForkTsCheckerWebpackPlugin()]
    config.resolve = {
      extensions: ['.mjs', '.js', '.jsx', '.ts'],
    }
    babelRule.test = /\.(m?j|t)s$/i
    babelRule.use.options = {
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-typescript',
      ],
    }
  } else if (arg === 'ts+react') {
    config.plugins = [new ForkTsCheckerWebpackPlugin()]
    config.resolve = {
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
    }
    babelRule.test = /\.(m?j|t)sx?$/i
    babelRule.use.options = {
      presets: [
        ['@babel/preset-env', { modules: false }],
        [
          '@babel/preset-react',
          { development: process.env.BABEL_ENV === 'development' },
        ],
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
 * Copy files to the build directory using [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin).
 * @param {Object} [options] copy-webpack-plugin options
 * @return {Object} copy-webpack-plugin config
 */
exports.copyFiles = (options) => ({
  plugins: [new CopyPlugin(options)],
})

/**
 * Handle CSS with [css-loader](https://webpack.js.org/loaders/css-loader) and inject into the DOM with [style-loader](https://webpack.js.org/loaders/style-loader).
 * @param {Object} [argObj] Argument object
 * @param {Object} [argObj.rule] webpack rule. Overrides styleLoaderOptions & cssLoaderOptions when a conflict occurs.
 * @param {RegExp} [argObj.rule.test=/\.css$/i] webpack rule test assertion
 * @param {Object} [argObj.styleLoaderOptions] style-loader options
 * @param {Object} [argObj.cssLoaderOptions] css-loader options
 * @return {Object} css-loader & style-loader configs
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
 * Setup [webpack-dev-server](https://webpack.js.org/configuration/dev-server).
 * @param {Object} [devServer] webpack-dev-server options
 * @return {Object} devServer config
 */
exports.setupDevServer = (devServer) => ({ devServer })
