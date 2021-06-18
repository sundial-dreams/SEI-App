const path = require('path');
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");


const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  entry: path.join(__dirname, 'src/backend/index.ts'),

  output: {
    path: path.join(__dirname, 'build/backend/'),
    filename: 'main.dev.js',
    pathinfo: false,
  },

  target: 'electron-main',

  mode: 'development',

  externals: [nodeExternals()],

  node: {
    __dirname: false,
    __filename: false
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  stats: 'errors-only'

});