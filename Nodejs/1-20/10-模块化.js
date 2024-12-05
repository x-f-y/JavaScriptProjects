/**
 * Nodejs中分为三大模块：内置模块、用户自定义模块和第三方模块，可以使用require方法对这三种模块进行加载
 * 注意：
 *  - 使用require()方法加载其他模块时，会执行被加载模块中的代码
 *  - 使用require()方法加载用户自定义模块时，可以省略.js的后缀名
 */
/**
 * Node.js中的模块化规范
 * Node.js遵循了CommonJS的模块化规范，CommmonJS规定了模块的特性和各模块之间如何相互依赖
 * CommonJS规定：
 *  - 每个模块内部，module变量代表当前模块
 *  - module变量是一个对象，它的exports属性是对外的接口
 *  - 加载某个模块，其实是加载该模块的module.exports属性，require()方法用于加载模块
 */
/**
 * 在每个.js自定义模块中都有一个module对象，它里面存储了和当前模块有关的信息
 */
console.log(module)
/**
 * 在自定义模块中，可以使用module.exports对象，将模块内的成员共享出去，供外界使用
 * 外界用require()方法导入自定义模块时，得到的永远是module.exports所指向的对象
 */
const m = require("../module/自定义模块")
console.log(m)
/**
 * 由于module.exports单词写起来比较复杂，为了简化向外共享成员的代码，Node提供了exports对象。
 * 默认情况下，exports和module.exports指向同一个对象。但最终共享的结果，还是以
 * module.exports指向的对象为准
 */
/**
 * 为了防止混乱，建议不要在同一个模块中同时使用exports和module.exports
 */
console.log(module.exports === exports)
const m2 = require("../module/自定义模块2.js")
const m3 = require("../module/自定义模块3.js")
const m4 = require("../module/自定义模块4.js")
const m5 = require("../module/自定义模块5.js")
console.log(m2) // { gender: '男', age: 22 }
console.log(m3) // { username: 'zs' }
console.log(m4) // { username: 'zs', gender: '男' }
console.log(m5) // { username: 'zs', gender: '男', age: 22 }
