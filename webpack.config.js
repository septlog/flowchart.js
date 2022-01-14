let path = require('path');

let config = {
  devtool: 'source-map', // always build source map
  mode: 'development',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'flowchart.js',
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      },
    ],
  },
};

module.exports = config;
