var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var env = process.env.NODE_ENV;

var config = {
  devtool: 'eval',
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
          'url?limit=10000&name=images/[name].[chunkhash:8].[ext]'
        ]
      },
      {
        test: /\.(woff|eot|ttf)$/i,
        loader: 'url?limit=10000&name=fonts/[name].[chunkhash:8].[ext]'
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './src/sass'), path.resolve(__dirname, './node_modules')]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  resolve: {
    extensions: ['', '.js']
  }
};

/* production config */
if (env === 'production') {
  config.output = {
    path: './static/',
        filename: '[name].[chunkhash:8].js',
        publicPath: '/static/'
  };
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ];
} else {
  config.plugins = [
    new webpack.HotModuleReplacementPlugin()
  ];
}

module.exports = config;