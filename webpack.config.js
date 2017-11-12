// const webpack = require('webpack');
// import path from 'path';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-dev-server/client', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" stops HMR on syntax errors
        'react-hot-loader/patch', // make sure the HMR package is included
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        modules: [ 'node_modules', path.resolve(__dirname, 'src') ],
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({ inject: true, template: path.join(__dirname, 'src/index.html') }),
        // new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' }, // creates style nodes from JS strings
                    { loader: 'css-loader', options: { sourceMap: true } }, // translates CSS into CommonJS
                    { loader: 'sass-loader', options: { sourceMap: true } }, // compiles Sass to CSS
                ],
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'svg-react-loader',
            },
            {
                test: /\.woff2$/,
                loader: 'url-loader',
            },
        ],
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9000', // 0.0.0.0:9000
                changeOrigin: true,
                // pathRewrite: {"^/api" : ""}
            },
        },
    },
};
