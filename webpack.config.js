const path = require('path');

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: path.join(__dirname, 'src'),
        loader: 'ts-loader'
      }
    ]
  },

  devServer: {
  contentBase: './dist'
  }
};
