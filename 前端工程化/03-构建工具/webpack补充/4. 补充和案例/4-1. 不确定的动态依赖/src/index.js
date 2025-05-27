// if (Math.random() < 0.5) {
//   const module = document.getElementById("txt").value;
//   const a = require("./utils/" + module); // 对于这种不确定的动态依赖，webpack会将./utils下的所有文件都添加到打包结果
//   console.log(a);
// }

/**
 * require.context()
 * 参数1：目录，表示哪个目录中的模块需要添加到打包结果
 * 参数2：布尔值，表示是否需要递归寻找子目录
 * 参数3：正则表达式，凡是匹配的才会加入到打包结果
 * 注意：require.context()仅在webpack运行过程中有效
 * 使用示例：
 *  const context = require.context("./utils", true, /\.js$/);
 *  const a = context("./a.js"), b = context('./b.js'), c = context('./c.js');
 *  console.log(a, b, c); // a b c
 *  console.log(context.keys()); // [ './a.js', './b.js', './c.js' ]
 */

/**
 * 考虑这样一种情况：我们为了实现某些复杂的功能，创建了一个特定的文件夹（例如这里的utils文件夹），该文件夹下有很多的js文件，
 * 我们希望将该文件夹下所有js文件的导出结果合并成一个js对象，然后统一导出，应该怎么做呢？此时，就可以利用require.context()
 * 做法：
 *  1. 在utils文件夹下创建index.js文件，用于合并该文件夹下其他js文件的导出结果
 *  2. 在utils/index.js文件中书写具体的代码
 */

const util = require('./utils');
console.log(util);