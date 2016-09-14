const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const path = require('path');

const config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'app/build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app')
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['fs']),
    new webpack.IgnorePlugin(/vertx/)
  ],
};

config.target = webpackTargetElectronRenderer(config);
module.exports = config;

