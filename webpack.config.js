const path = require('path');
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode: mode,
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    // frontend server when serving jsx, js files
    port: 8000,
    static: path.resolve(__dirname + '/dist'),
    historyApiFallback: true, // for react routers
    hot: true,
    open: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
