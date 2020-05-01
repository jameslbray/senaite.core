const path = require("path");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const gitCmd = "git rev-list -1 HEAD -- `pwd`";
const compilePath = path.resolve(__dirname, "../src/senaite/core/browser/static");
const publicPath = "++plone++senaite.core.static/"
let gitHash = childProcess.execSync(gitCmd).toString().substring(0, 7);

module.exports = {
  entry: {
    core: path.resolve(__dirname, "./app/senaite.core.js")
  },
  output: {
    filename: `senaite.[name]-${gitHash}.js`,
    path: compilePath,
    publicPath: publicPath,
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        exclude: [/node_modules/],
        use: ["babel-loader", "coffee-loader"]
      }, {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: ["babel-loader"]
      }, {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },
  plugins: [
    // e.g. https://webpack.js.org/plugins/provide-plugin/
    new HtmlWebpackPlugin({
      inject: false,
      filename: "resources.pt",
      template: "app/resources.pt",
      publicPath: publicPath,
    })
  ],
  externals: {
    // https://webpack.js.org/configuration/externals
    // use jQuery from the outer scope
    jquery: "jQuery",
  }
};