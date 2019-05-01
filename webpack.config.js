const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app/index.js',

    mode: 'none',

    output: {
        path: path.resolve(
            './public/'
        ),
        publicPath: '/',
        filename: './bundle.js'
    },

    plugins: [new webpack.HotModuleReplacementPlugin ()],

    devServer: {
        contentBase: './public',
        inline: true,
        historyApiFallback: true,
        port: 4444,
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};