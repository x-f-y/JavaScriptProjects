const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/index.js", // 打包入口
  output: {
    // 打包出口
    filename: "bundle.js", // 指定输出文件的文件名
    path: path.resolve(__dirname, "./dist"), // 文件的输出路径（必须是绝对路径）
    clean: true, // 打包之前清理dist文件夹
    assetModuleFilename: "images/[contenthash][ext]", // 资源模块的文件名（contenthash为根据文件内容生成的hash字符串，ext为原资源的扩展名）
  },
  // mode: 'none', // 模式
  mode: "development", // 开发模式
  devtool: "inline-source-map", // 可以在浏览器控制台准确查看错误代码的位置，方便调试
  plugins: [
    // 插件
    new HtmlWebpackPlugin({
      template: "./index.html", // 将我们写的html文件（03-manage-output/index.html）作为模板创建新的html文件
      filename: "app.html", // 自定义生成的html文件的文件名
      inject: "body", // 将生成的script标签插入到body标签的末尾
    }),
  ],
  devServer: {
    static: "./dist", // 配置server服务的根目录
  },
  module: {
    // 配置如何处理模块
    rules: [
      // 配置模块的读取和解析规则
      {
        test: /\.png$/, // 处理.png文件
        type: "asset/resource",
        generator: {
          filename: "images/[contenthash][ext]",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.jpg$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024,
          },
        },
      },
    ],
  },
}
