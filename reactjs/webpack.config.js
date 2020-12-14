const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    './assets/js/editor.blocks.min': './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../'),
    filename: '[name].js',
  },
  watch: 'production' !== process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' }
      },
    ],
  },
  plugins: [],
};
