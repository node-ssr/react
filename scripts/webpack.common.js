const { resolve } = require('path')

module.exports = {

  context: resolve(__dirname, '../'),

  mode: 'development',

  devtool: 'source-map',

  output: {

    filename: '[name].js',

    clean: true
  },

  resolve: {
    extensions: [
      '.js', '.jsx',
      '.ts', '.tsx'
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader'
      }
    ]
  }

}
