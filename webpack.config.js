const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        configFile: './.eslintrc',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          //'react-hot',
          'babel?presets[]=es2015,presets[]=react',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap'],
        exclude: /node_modules/,
      },
    ],
  },
  eslint: {
    failOnError: true,
    failOnWarning: false,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
  watch: false,
};
