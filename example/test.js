const webpack = require('webpack');
const path = require('path')
const option = require('./webpack.config');
const compiler = webpack(option)
compiler.run(() => {});