// vue-cli的配置文件
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://test.my-site.com"
      }
    }
  },
  // configureWebpack选项对应的对象最终会和vue-cli的默认配置对象合并（webpack-merge）
  configureWebpack: require('./webpack.config')
}