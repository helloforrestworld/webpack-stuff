const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development'
  // const isEnvProduction = webpackEnv === 'production'

  const getStyleLoaders = (cssOption, ...args) => {
    let loaders = [
      isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      { loader: 'css-loader', options: cssOption },
      'postcss-loader',
    ]
    if (args.length) {
      loaders = [...loaders, ...args]
    }
    return loaders
  }

  return {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 2048
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                webp: {
                  quality: 75
                }
              }
            },
          ]
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
        template: path.resolve(__dirname, '../public/index.html'),
      }),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    }
  }
}
