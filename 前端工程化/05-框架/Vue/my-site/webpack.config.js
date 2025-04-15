const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// 运行命令 npm run build 时，process.env.NODE_ENV 的值为 production
// 运行命令 npm run serve 时，process.env.NODE_ENV 的值为 development

if(process.env.NODE_ENV === "production"){
  // 生产环境
  module.exports = {
    // 生产环境下不生成source map
    devtool: "none",
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    // 告诉webpack，不要将vue、vuex、vue-router和axios打包到bundle中，而是在运行时再去从外部获取这些扩展依赖，例如从CDN引入
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
    }
  };
}else if(process.env.NODE_ENV === "development"){
  // 开发环境
  module.exports = {};
}