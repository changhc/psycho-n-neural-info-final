const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader', // 單一loader
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,  // target: css files
      use: [    // 多個loader， webpack 2
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ], // 執行順序由下到上
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
