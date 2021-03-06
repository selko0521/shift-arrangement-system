const path = require('path');
const webpack = require('webpack');

let config = {
  entry: {
    main: path.resolve(__dirname, '../src/main/main.js')
  },
  output: {
    filename: 'main.js',
    path: path.join(__dirname, '../dist/electron')
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production',
  },
  target: 'electron-main',
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
