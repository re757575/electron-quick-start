const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const path = require('path');

const plugins = [
  new webpack.ExternalsPlugin('commonjs', ['fs']),
  new webpack.IgnorePlugin(/vertx/)
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:3000');
    sources.push('webpack/hot/only-dev-server');
  }
  return sources;
}

const config = {
  devtool: 'eval',
  entry: {
    bundle: getEntrySources([
      './app/index.js'
    ])
  }, output: {
    path: path.join(__dirname, 'app/build'),
    filename: '[name].js',
    publicPath: 'http://localhost:3000/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app')
    }]
  },
  plugins: plugins
};

config.target = webpackTargetElectronRenderer(config);
module.exports = config;

