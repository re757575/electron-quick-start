var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
  entry: {
    mainWindow: ['./app/index.js']
  },
  output: {
    path: './app/built',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', ['fs']),
    new webpack.IgnorePlugin(/vertx/)
  ]
}

config.target = webpackTargetElectronRenderer(config);
module.exports = config;
