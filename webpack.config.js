var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var path = require('path');

module.exports = {
    watch: true,
    entry: './src/main.ts',
    output: {
        path: path.resolve('./dist'),
        filename: 'app.bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader?keppUrl=true'],
                exclude: /node_modules/
            }, {
                test: /\.(html|css)$/,
                loader: 'raw-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};