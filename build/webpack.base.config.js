const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(css|scss)$/, use: ['vue-style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, 'src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ],
  },
}
