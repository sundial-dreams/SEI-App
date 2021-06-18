const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const {merge} = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");

const devConfig = require('./webpack.backend.dev.config');


module.exports = merge(devConfig, {
  mode: 'production',
  devtool: 'eval',

  output: {
    path: path.join(__dirname, 'build/backend/'),
    filename: '[name].prod.js'
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      include: path.resolve(__dirname, "src"),
      parallel: true,
      extractComments: true
    })]
  }
});