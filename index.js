"use strict";
require('dotenv').load({silent: true});

const _DEV_ = process.env.NODE_ENV !== 'production';

const cfg = {
  API_URI: process.env.API_URI,
  DIR: _DEV_ ? `${__dirname}/src` : `${__dirname}/dist`
};

const app = require('./src/app')(cfg);

if (_DEV_) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  const webpackDevMiddleware = require('webpack-dev-middleware');

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    historyApiFallback: true
  }));
}

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
