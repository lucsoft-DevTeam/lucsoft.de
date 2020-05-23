const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        index: "./src/index.ts",
    },
    mode: "development",
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [ ".js", ".ts" ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.svg$/i,
                use: [ 'url-loader' ]
            }
        ]
    },

    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html',
            filename: 'index.html',

            minify: { minifyCSS: true, minifyJS: true, removeComments: true }
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
};