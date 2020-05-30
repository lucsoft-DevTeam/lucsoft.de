const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: "./src/index.ts"
    },
    mode: "development",
    output: {
        filename: '[name].js',
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true,
                        },
                    },
                    'css-loader',

                ]
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
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            esModule: true
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: [ 'index' ],
            template: './src/index.html',
            filename: 'index.html',
            minify: { minifyCSS: true, minifyJS: true, removeComments: true }
        }),
    ],
    optimization: {
        minimizer: [ new OptimizeCSSAssetsPlugin({}) ]
    }
};