const { resolve } = require('path')

const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')

const HTMLWebpackPlugins = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const webpackCommon = require('./webpack.common')

module.exports = function (info, { mode }) {

  const isProd = mode === 'production'

  const config = merge(webpackCommon, {

    target: 'web',
  
    entry: [
      './src/client/index.tsx',
      './src/client/style.scss'
    ],
  
    output: {
      path: resolve(__dirname, '../dist/client'),

      filename: 'assets/[name].js',
      
      publicPath: '/'
    },
  
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
  
    plugins: [
  
      new DefinePlugin({
        'process.env.REACT_ENV': '"client"',
      }),

      new HTMLWebpackPlugins({
        template: './src/client/index.html'
      }),
  
      new WebpackManifestPlugin()
  
    ],

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        // chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    }
  })

  if (isProd) {
    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'assets/style.css'
    }))
  }

  return config
}
