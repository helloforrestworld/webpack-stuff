const merge = require('webpack-merge')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const commonConfig = require('./webpack.common')

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
]

const files = fs.readdirSync(path.resolve(__dirname, '../dll/'))
files.forEach(file => {
  if (/\.dll\.js$/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll/', file)
    }))
  }
  if (/\.manifest\.json$/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/', file)
    }))
  }
})

const prodConfig = {
  mode: 'production',
  devtool: false,
  bail: true,
  output: {
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].js'
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  }
}

module.exports = merge(commonConfig(true), prodConfig)
