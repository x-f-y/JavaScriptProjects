const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./app.js",
  plugins: [
    new HtmlWebpackPlugin({
      // template: './index.html'
    }),
  ],
//   externalsType: "script",
  externals: {
      jquery: [
          "script https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.js",
          "$"
      ],
  },
  // externals: {
  //     jquery: '$'
  // }
}