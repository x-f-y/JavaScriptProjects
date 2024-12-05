const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/index.js", // 打包入口
  output: {
    // 打包出口
    filename: "bundle.js", // 指定输出文件的文件名
    path: path.resolve(__dirname, "./dist"), // 文件的输出路径（必须是绝对路径）
    clean: true, // 打包之前清理dist文件夹
  },
  mode: "none", // 模式
  plugins: [
    // 插件
    new HtmlWebpackPlugin({
      template: "./index.html", // 将我们写的html文件（03-manage-output/index.html）作为模板创建新的html文件
      filename: "app.html", // 自定义生成的html文件的文件名
      inject: "body", // 将生成的script标签插入到body标签的末尾
    }),
  ],
}
