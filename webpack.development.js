'use strict'

const common = require('./webpack.common')

const webpack = require('webpack')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    ...common.entry
  ],
  output: {
    filename: common.output.filename,
    path: common.output.path,
    libraryTarget: common.output.libraryTarget,
    publicPath: 'http://localhost:3000/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ],
  module: common.module,
  resolve: common.resolve,
  target: 'electron',
  externals: common.externals
}

config.target = webpackTargetElectronRenderer(config)

module.exports = config
