const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3001,
    overlay: true,
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    proxy: {
      changeOrigin: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig(), devConfig)
