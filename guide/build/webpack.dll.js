const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  // entry: {
  //   vendors: ['react', 'react-dom', 'lodash']
  // },
  entry: {
    vendors: ['lodash'],
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]_[hash]', // dll需要以库的形式导出
    path: path.resolve(__dirname, '../dll')
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.DllPlugin({
    //   name: '[name]_[hash]',
    //   path: path.resolve(__dirname, '../dll/manifest.json')
    // })
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}
