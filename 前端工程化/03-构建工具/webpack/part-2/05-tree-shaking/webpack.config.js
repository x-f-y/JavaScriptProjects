// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // mode: 'development',
    // mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        clean: true
    },
    // devtool: 'inline-source-map',
    // plugins: [
    //     new HtmlWebpackPlugin()
    // ],
    optimization: {
        usedExports: true
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,
    //             use: ['style-loader', 'css-loader']
    //         }
    //     ]
    // }
}