const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './app.js',
    output: {
        clean: true
    },
    mode: 'development',
    // mode: 'production',
    devtool: 'eval',
    plugins: [
        new HtmlWebpackPlugin()
    ]
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             use: {
    //                 loader: "babel-loader",
    //                 options: {
    //                     presets: ['@babel/preset-env']
    //                 }
    //             }
    //         }
    //     ]
    // },
}