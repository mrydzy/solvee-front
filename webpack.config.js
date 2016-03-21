'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  output: {
    publicPath: '/assets/',
    path: '/',
    filename: 'main.js'
  },

  cache: true,
  debug: true,
  devtool: "source-map",

  entry: {
    main: [
      './src/js/index.js'
    ]
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

  module: {
    loaders: [{
      test: /\.json/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }, {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'ngtemplate!html'
    }, {
      test: /\.(png|jpg|woff|woff2|svg)$/,
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
