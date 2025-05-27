// 将当前目录中所有模块（自身除外）的导出结果合并，统一导出
const context = require.context('./', true, /\.js$/);
for(const key of context.keys()){
  if(key !== './index.js'){ // 排除自身
    const filename = key.slice(2, key.length - 3);
    exports[filename] = context(key);
  }
}