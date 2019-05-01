const webpack = require('webpack');
const stripLoader = require('strip-loader');
const config = require('./webpack.config.js');

config.module.rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: stripLoader.loader('debug')
        }
    }
];
config.mode = 'production';

module.exports = config;