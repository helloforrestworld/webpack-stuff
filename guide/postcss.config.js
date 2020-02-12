module.exports = {
  plugins: {
    'postcss-import': {}, // 让css文件能直接@import "normalize.css";
    'postcss-preset-env': {}, // 包含一些autoprefixer css-next等。
    cssnano: {}, // 压缩css
  },
}
