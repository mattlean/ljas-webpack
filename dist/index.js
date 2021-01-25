const AssetListWebpackPlugin = require("asset-list-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");
const html = require("./html");
const js = require("./js");
const media = require("./media");
const react = require("./react");
const style = require("./style");

module.exports = {
  ...html,
  ...js,
  ...media,
  ...react,
  ...style,
};

/**
 * Delete contents of the output directory using clean-webpack-plugin
 *
 * @param {Object} options clean-webpack-plugin options
 * @return {Object} Plugin config for clean-webpack-plugin
 */
module.exports.cleanOutput = (options) => ({
  plugins: [new CleanWebpackPlugin(options)],
});

/**
 * Copy files from one location to another with copy-webpack-plugin
 *
 * @param {Array} [patterns] Array of patterns
 * @param {Object} [options] copy-webpack-plugin options
 * @return {Object} Plugin config for copy-webpack-plugin
 */
module.exports.copyFiles = (patterns, options) => ({
  plugins: [
    new CopyPlugin({
      patterns,
      options,
    }),
  ],
});

/**
 * Generate bundle asset list with asset-list-webpack-plugin
 *
 * @param {Object} [FnParams={}] Object of function parameters
 * @param {Object} [FnParams.format] Format of generated JSON file
 * @param {Object} [FnParams.key] Set keys used for JSON file
 * @param {Object} [FnParams.name] Name of generated JSON file
 * @return {Object} Plugin config for asset-list-webpack-plugin
 */
module.exports.genAssetList = ({ format, key, name } = {}) => ({
  plugins: [new AssetListWebpackPlugin({ format, key, name })],
});

/**
 * Exclude modules from bundle with webpack-node-externals
 *
 * @param {Object} [options] webpack-node-externals options
 * @return {Object} externals config
 */
module.exports.ignoreNodeModules = (options) => ({
  externals: [nodeExternals(options)],
});

/**
 * Set free variable with DefinePlugin
 *
 * @param {string} key Free variable key
 * @param {*} value Free variable value
 * @return {Object} Plugin config
 */
module.exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new DefinePlugin(env)],
  };
};

/**
 * Set mode to determine which webpack optimizations to use
 *
 * @param {string} [mode] webpack mode configuration optional value
 * @return {Object} mode config
 */
module.exports.setMode = (mode) => ({
  mode,
});

/**
 * Setup development server with webpack-dev-server
 *
 * @param {Object} [devServer] devServer options
 * @return {Object} devServer config
 */
module.exports.setupDevServer = (devServer) => ({
  devServer,
});

/**
 * Split vendor dependencies from main bundle
 *
 * @return {Object} optimization config
 */
module.exports.splitVendor = () => ({
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
});
