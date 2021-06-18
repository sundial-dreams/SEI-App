const path = require('path');

module.exports = {
  mode: 'development',

  externalsPresets: {node: true},

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.m?[tj]sx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),

        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      }
    ]
  },

  resolve: {
    extensions: [
      '.js', '.jsx', '.json', '.ts', '.tsx', '.node'
    ],
    alias: {
      '~assets': path.resolve(__dirname, 'assets')
    },
    symlinks: false,
    cacheWithContext: false
  },
  // node: {
  //   global: true,
  //   __dirname: true,
  //   __filename: true
  // }

};