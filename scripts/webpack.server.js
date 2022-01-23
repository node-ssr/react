const { resolve } = require('path')

const { DefinePlugin } = require('webpack')
const NodemonWebpackPlugin = require('nodemon-webpack-plugin')

const webpackNodeExternals = require('webpack-node-externals')
const { merge } = require('webpack-merge')

const webpackCommon = require('./webpack.common')

module.exports = merge(webpackCommon, {

  target: 'node',

  node: {
    __dirname: false
  },

  entry: './src/server/index.ts',

  output: {
    path: resolve(__dirname, '../dist/server'),

    libraryTarget: 'commonjs2'
  },

  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: [
    /scripts/,
    webpackNodeExternals({
      // do not externalize CSS files in case we need to import it from a dep
      allowlist: /\.css$/
    })
  ],

  plugins: [

    new DefinePlugin({
      'process.env.REACT_ENV': '"server"',
    }),

    new NodemonWebpackPlugin()

  ]

})
