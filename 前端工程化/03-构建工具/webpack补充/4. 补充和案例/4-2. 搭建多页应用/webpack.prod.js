const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.js");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");

// webpack的生产环境配置，从基本配置中合并
// 合并是利用 webpack-merge 完成的：https://github.com/survivejs/webpack-merge
const prodConfig = {
  mode: "production",
  devtool: "none",
  optimization: {
    splitChunks: {
      // 分包配置
      chunks: "all",
      cacheGroups: {
        styles: {
          minSize: 20000, // 生成 chunk 的最小体积（以字节为单位）
          test: /\.css$/,
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new WebpackBundleAnalyzer(),
    new CompressionWebpackPlugin()
  ],
};

module.exports = merge(baseConfig, prodConfig);
