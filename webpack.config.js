const path = require('path')

module.exports = {
    entry: path.join(__dirname, './client/index.js'),
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env']
          }
        }
      ]
    }
  };
