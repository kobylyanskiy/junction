'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    webpack = require('webpack');

const path = require('path');
const serverApi = require('./dev-server-api.js');
const environent = {
    production: false
};


module.exports = function(env = environent) {
    const plugins = [
        new HtmlWebpackPlugin({
            chunks: ['app'],
            filename: 'index.html',
            template: './app/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles.css'
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'PropTypes': 'prop-types'
        })
    ];

    return {
        entry: {
            //client: './src-client/main.js',
            app: './app/main.js',
        },
        output: {
            path: path.join(__dirname, '..', 'app', 'templates'),
            filename: "[name].js",
            publicPath: '/'
        },
        devServer: {
            contentBase: path.join(__dirname, '..', 'app', 'templates'),
            setup: serverApi,
            /*proxy: {
              "*": {
                target: "http://localhost:8000"
              }
            }*/
        },
        devtool: env.production ? 'source-map' : 'eval-source-map',
        module: {
            loaders: [
                {test: /\.(html)$/, use: {loader: 'html-loader', options: {attrs: [':data-src']}}},
                {test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/]},
                {
                    test: /\.(scss|sass)$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use:'css-loader!sass-loader'
                    })
                },
                {
                    test: /\.css$/,
                    loader:  ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use:'css-loader!sass-loader'
                    })},
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: 10000,
                        outputPath: '../images',
                        fallback: 'img-loader'
                    }
                },
                {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
                {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
                {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
                {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
                {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
            ]
        },
        plugins: plugins
    }
};
