const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    // devServer: {
    //     devMiddleware: {
    //         writeToDisk: true
    //     }
    // }
}