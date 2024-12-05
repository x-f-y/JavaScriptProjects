const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        clean: true,
        publicPath: "/"
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 3000,
        headers: {
            "X-Access-Token": 'abc123'
        },
        proxy: {
            '/api': "http://localhost:9000"
        },
        https: true,
        // http2: true,
        historyApiFallback: true,
        // host: '0.0.0.0',
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}