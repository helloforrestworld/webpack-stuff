const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

const getStyleLoaders = (cssOption, ...args) => {
  let loaders = [
    'style-loader',
    { loader: 'css-loader', options: cssOption },
    'postcss-loader',
  ]
  if (args.length) {
    loaders = [...loaders, ...args]
  }
  return loaders
}

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          },
        }),
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders({
          importLoaders: 2,
        }, 'less-loader'),
      },
      {
        test: lessModuleRegex,
        use: getStyleLoaders({
          importLoaders: 2,
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          },
        }, 'less-loader'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 3001,
    overlay: true,
    contentBase: path.resolve(__dirname, 'dist'),
    proxy: {
      changeOrigin: true,
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'eval-source-map',
}
