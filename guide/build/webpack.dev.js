const merge = require('webpack-merge')
const path = require('path')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3001,
    overlay: true,
    contentBase: path.resolve(__dirname, '../dist'),
    proxy: {
      changeOrigin: true,
    },
  },
}

module.exports = merge(commonConfig, devConfig)
