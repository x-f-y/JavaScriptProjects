// 多页配置
module.exports = {
  // 页面名称（对应 chunk 名）
  index: {
    js: "./src/pages/index", // 页面入口 js
    html: "./src/pages/index/index.html", // 页面使用的 html 模板
    out: "index.html", // 输出目录中的页面文件名
  },
  about: {
    js: "./src/pages/about",
    html: "./src/pages/about/index.html",
    out: "about.html",
  },
};
