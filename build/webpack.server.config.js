const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = merge(baseConfig, {
  entry: path.join(__dirname, '..', 'src/entry-server.js'),
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    allowlist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.VUE_ENV': '"server"',
      'process.env.API_BASE_URL': '"https://zxctb.top/restful"',
    }),
    new VueSSRServerPlugin()
  ]
})
