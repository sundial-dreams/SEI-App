const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const {merge} = require('webpack-merge');

const TerserPlugin = require("terser-webpack-plugin");

const baseConfig = require('./webpack.base.config');


const entry = {
  main: './src/view/main/index.tsx',

};

const htmlWebpackPlugins = Object.keys(entry).map(name => new HtmlWebpackPlugin({
  inject: 'body',
  scriptLoading: 'defer',
  minify: true,
  filename: `${name}/index.html`,
  template: path.join(__dirname, 'assets/template/index.html'),
  chunks: [name]
}));


module.exports = merge(baseConfig, {
  entry,

  output: {
    path: path.join(__dirname, 'build/view/'),
    publicPath: '../',
    filename: '[name]/index.js',
    clean: true
  },

  devtool: "eval",

  target: 'electron-preload',

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.g\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader', options: {sourceMap: false}},
          {loader: 'resolve-url-loader'}
        ]
      },
      {
        test: /^((?!\.g).)*\.css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: 'css-loader',
            options: {
              modules: {localIdentName: '[name]__[local]__[hash:base64:5]'},
              sourceMap: false,
              importLoaders: 1
            }
          },
          {loader: 'resolve-url-loader'}
        ]
      },
      {
        test: /\.g\.(scss|sass)$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader', options: {sourceMap: false}},
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /^((?!\.g).)*\.(scss|sass)$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {
            loader: 'css-loader',
            options: {
              modules: {localIdentName: '[name]_[local]_[hash:base64:5]'},
              sourceMap: false,
              importLoaders: 1
            }
          },
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/index.css'
    }),
    new ForkTsCheckerWebpackPlugin(),
    ...htmlWebpackPlugins
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
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,

  }
});