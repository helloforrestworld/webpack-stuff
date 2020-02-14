const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common')

const prodConfig = {
  mode: 'production',
  devtool: false,
  bail: true,
  output: {
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  }
}

module.exports = merge(commonConfig(true), prodConfig)
