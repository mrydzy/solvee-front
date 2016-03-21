'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  output: {
    publicPath: '/assets/',
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: {
    main: [
      './src/index.js'
    ]
  },

  stats: {
    colors: true,
    reasons: false
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]

};