const path = require('path');
const webpack = require('webpack');
const { spawn } = require("child_process");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const {merge} = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

const hot = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080/',
  'webpack/hot/only-dev-server'
];

const entry = {
  main: hot.concat('./src/view/main/index.tsx'),

};

const htmlWebpackPlugins = Object.keys(entry).map(name => new HtmlWebpackPlugin({
  inject: 'body',
  scriptLoading: 'defer',
  minify: false,
  filename: `${name}/index.html`,
  template: path.join(__dirname, 'assets/template/index.html'),
  chunks: [name]
}));


module.exports = merge(baseConfig, {

  entry,

  devtool: 'eval-cheap-module-source-map',

  output: {
    path: path.join(__dirname, 'build/view/'),
    publicPath: '../',
    filename: '[name]/index.js',
    clean: true,
    pathinfo: false
  },

  target: 'electron-renderer',

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.g\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {sourceMap: false}},
          {loader: 'resolve-url-loader'}
        ]
      },
      {
        test: /^((?!\.g).)*\.css$/,
        use: [
          {loader: 'style-loader'},
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
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {sourceMap: false}},
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /^((?!\.g).)*\.(scss|sass)$/,
        use: [
          {loader: 'style-loader'},
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
      NODE_ENV: 'development'
    }),
    new ForkTsCheckerWebpackPlugin(),
    ...htmlWebpackPlugins
  ],

  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },

  devServer: {
    contentBase: path.join(__dirname, "./build/view"),

    hot: true,

    port: 8080,

    noInfo: true,

    stats: 'errors-only',

    publicPath: "http://localhost:8080/",

    compress: true,

    lazy: false,

    headers: {'Access-Control-Allow-Origin': '*'},

    watchOptions: {
      aggregateTimeout: 300,
      ignored: [
        path.posix.resolve(__dirname, "./node_modules"),
        path.posix.resolve(__dirname, "./src/backend"),
        path.posix.resolve(__dirname, "./build"),
      ],
      poll: 100
    },

    before() {
      console.log("START MAIN PROCESS ...");
      spawn('npm', ['run', 'dev-backend'], { shell: true, env: process.env, stdio: 'inherit' })
        .on('close', (code) => process.exit(code))
        .on('error', console.error);
    }

  }

});