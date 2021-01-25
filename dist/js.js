const TerserPlugin = require("terser-webpack-plugin");

/**
 * Compile JavaScript using babel-loader
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.exclude] Rule exclude value
 * @param {Object} [FnParams.include] Rule include value
 * @param {Object} [FnParams.options] babel-loader options
 * @param {RegExp} [FnParams.test=/\.m?jsx?$/i] Rule test value
 * @return {Object} Module config for babel-loader
 */
exports.compileJS = ({ exclude, include, options, test } = {}) => {
  if (!test) test = /\.m?jsx?$/i;

  return {
    module: {
      rules: [
        {
          test,
          exclude,
          include,
          use: {
            loader: "babel-loader",
            options,
          },
        },
      ],
    },
  };
};

/**
 * Generate JavaScript source maps
 *
 * @param {string} [type] Option to control how source maps are generated
 * @return {Object} devtool config
 */
exports.genSourceMaps = (type) => ({
  devtool: type,
});

/**
 * Minify JavaScript with terser-webpack-plugin
 *
 * @param {Object} options terser-webpack-plugin options
 * @return {Object} optimization config
 */
exports.minifyJS = (options) => ({
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(options)],
  },
});
