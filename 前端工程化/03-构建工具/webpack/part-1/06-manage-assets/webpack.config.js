const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const toml = require("toml")
const yaml = require("yaml")
const json5 = require("json5")
module.exports = {
  entry: "./src/index.js", // 打包入口
  output: {
    // 打包出口
    filename: "bundle.js", // 指定输出文件的文件名
    path: path.resolve(__dirname, "./dist"), // 文件的输出路径（必须是绝对路径）
    clean: true, // 打包之前清理dist文件夹
    assetModuleFilename: "images/[contenthash][ext]", // 配置导出资源模块的文件名（[contenthash]为根据文件内容生成的hash字符串，[ext]为原资源的扩展名）
  },
  // mode: 'none', // 模式
  mode: "development", // 开发环境
  // mode: 'production', // 生产环境（注意：使用CssMinimizerWebpackPlugin插件压缩代码时，需要将mode设置生产环境）
  devtool: "inline-source-map", // 可以在浏览器控制台准确查看错误代码的位置，方便调试
  plugins: [
    // 插件
    new HtmlWebpackPlugin({
      template: "./index.html", // 将我们写的html文件（03-manage-output/index.html）作为模板创建新的html文件
      filename: "app.html", // 自定义生成的html文件的文件名
      inject: "body", // 将生成的script标签插入到body标签的末尾
    }),
    new MiniCssExtractPlugin(),
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
          filename: "images/[contenthash][ext]", // 配置导出资源模块的文件名（[contenthash]为根据文件内容生成的hash字符串，[ext]为原资源的扩展名）
        },
      },
      {
        test: /\.svg$/, // 处理.svg文件
        type: "asset/inline",
      },
      {
        test: /\.txt$/, // 处理.txt文件
        type: "asset/source",
      },
      {
        test: /\.jpg$/, // 处理.jpg文件
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024,
          },
        },
      },
      {
        test: /\.(css|less)$/,
        // use: ['style-loader', 'css-loader', 'less-loader'], // 注意：loader的加载顺序是从后往前的
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"], // 注意：loader的加载顺序是从后往前的
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 处理字体文件
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/,
        use: "csv-loader",
      },
      {
        test: /\.xml$/,
        use: "xml-loader",
      },
      {
        test: /\.toml$/,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
}
