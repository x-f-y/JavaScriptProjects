const path = require("path")
module.exports = {
  entry: "./src/index.js", // 打包入口
  output: {
    filename: "bundle.js", // 指定输出文件的文件名
    path: path.resolve(__dirname, "./dist"), // 文件的输出路径（必须是绝对路径）
  },
  mode: "none",
}
