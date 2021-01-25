const path = require("path");
const ljasWebpack = require("../dist");
const { merge } = require("webpack-merge");

module.exports = merge([
  {
    entry: path.resolve(__dirname, "js"),
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "output"),
    },
  },

  // index
  ljasWebpack.cleanOutput(),

  ljasWebpack.copyFiles([{ from: path.resolve(__dirname, "files/foo.txt") }]),

  ljasWebpack.genAssetList(),

  ljasWebpack.setupHTML(),

  ljasWebpack.setFreeVariable("FOO_FREE_VAR", "bar"),

  ljasWebpack.setMode("development"),

  ljasWebpack.setupDevServer(),

  // js
  ljasWebpack.compileJS(),

  ljasWebpack.genSourceMaps("cheap-module-eval-source-map"),

  ljasWebpack.minifyJS(),
]);
