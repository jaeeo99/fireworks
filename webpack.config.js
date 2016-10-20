/**
 * Created by Jaeeo on 2016. 10. 11..
 */
var path = require('path');
var webpack = require('webpack');
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    entry: {
        "bundle": "./src/client/app.js",
        "bundle.min": "./src/client/app.js",
    },
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            }, {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    node: {
        fs: "empty"
    },
    // devtool: "source-map",
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         include: /\.min\.js$/,
    //         minimize: true
    //     }),
    //     new UnminifiedWebpackPlugin()
    // ]
};