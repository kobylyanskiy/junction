'use strict';
const webpackConfig = require('./webpack.config.js');
module.exports = function(config) {
    config.set({
        // logLevel: config.LOG_DEBUG,

        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        files: ['./spec.bundle.js'],
        preprocessors: {
            // Reference: https://github.com/webpack/karma-webpack
            // Convert files with webpack and load sourcemaps
            './spec.bundle.js': ['webpack', 'sourcemap'],
        },

        webpack: Object.assign({}, webpackConfig({test: true}), {
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/addons': true,
                'react/lib/ReactContext': 'window',
            }
        }),

        singleRun: true,

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // show only errors in log
            stats: 'errors-only'
        }
    });
};
