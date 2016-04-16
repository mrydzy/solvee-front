'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  output: {
    publicPath: '/assets/',
    path: '/',
    filename: '[name].js'
  },

  cache: true,
  debug: true,
  // devtool: "source-map",

  entry: {
    main: './src/client/map.js',
    builder: './src/client/build-map.js',
    editor: './src/client/edit-map.js',
    embed: './src/client/service/embed.js',
    users: './src/client/users.js'
  },

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },

  noParse: /node_modules/,

  module: {
    loaders: [{
      test: /\.json/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }, {
      test: /\.(scss|css)$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('css!sass')
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'html'
    }, {
      test: /\.(png|jpg|woff|woff2|svg)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=8192'
    }]
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]

};
