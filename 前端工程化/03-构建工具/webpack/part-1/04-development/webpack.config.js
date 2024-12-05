const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist'),
        clean: true
    },
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new htmlWebpackPlugin({
            template: "./index.html",
            filename: "app.html",
            inject: 'body'
        })
    ],
    devServer: {
        static: './dist'
    }
}