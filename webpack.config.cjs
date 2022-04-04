const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: './public/js/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js/')
  }
}