const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack page-1", // 用于生成HTML文档的标题
      inject: "body",
      filename: "channel1/index1.html", // 用于生成的HTML文档的文件名
      chunks: ["main1", "lodash"], // 用于指定该HTML文档所引用的chunk
      publicPath: "http://www.a.com/", // 指定生成的HTML文档中的script和link标签中资源路径的前缀
    }),
    new HtmlWebpackPlugin({
      title: "webpack page-2",
      inject: "body",
      filename: "channel2/index2.html",
      chunks: ["main2", "lodash"],
      publicPath: "http://www.b.com/",
    }),
  ],
  entry: {
    main1: {
      import: ["./src/app1.js", "./src/app2.js"], // 启动时需加载的模块
      dependOn: "lodash", // 当前入口所依赖的入口
      filename: "channel1/[name].js", // 指定要输出的文件名称
    },
    main2: {
      import: "./src/app3.js",
      dependOn: "lodash",
      filename: "channel2/[name].js",
    },
    lodash: {
      import: "lodash",
      filename: "common/[name].js",
    },
  },
  output: {
    clean: true,
  },
}
