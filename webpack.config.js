const path = require('path');
const webpack  = require('webpack')

const config = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/api.js'
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'webpack-module-hot-accept']
      }
    ]
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: path.resolve('./build'),
    //outputPath: path.resolve('./build'),
    inline: true,
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};

module.exports = config;
