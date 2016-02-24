var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');
var _ = require('lodash');
var env = process.env.NODE_ENV;

var config = {
  devtool: 'inline-source-map',
  entry: {
    'index': './src/js/index.js',
    'lib-flex': './src/js/lib-flex.js'
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          //'image?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}',
          'url?limit=10000&name=image/[name].[hash:8].[ext]'
        ]
      },
      {
        test: /\.(woff|eot|ttf)$/i,
        loader: 'url?limit=10000&name=font/[name].[hash:8].[ext]'
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './src/sass'), path.resolve(__dirname, './node_modules')]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']}), px2rem({remUnit: 75})],
  resolve: {
    extensions: ['', '.js']
  }
};

/* production config */
if (env === 'production') {
  config = _.extend(config, {
    devtool: '#',
    output: {
      path: './static/',
      filename: '[name].[chunkhash:8].js',
      publicPath: '/static/'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

module.exports = config;