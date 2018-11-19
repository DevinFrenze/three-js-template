const config = require('./webpack.config.js');
const path = require('path');

config.mode = "development";
config.devtool = "source-map"; // can also use inline-source-map

config.devServer = {
  contentBase: path.join(__dirname, 'dist'),
  hot: true,
  port: 8080,
};

module.exports = config;
