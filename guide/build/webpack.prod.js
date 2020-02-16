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
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common'
        }
      }
    }
  },
}

module.exports = merge(commonConfig(true), prodConfig)
