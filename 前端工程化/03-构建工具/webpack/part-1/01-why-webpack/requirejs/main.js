/**
 * requireJs语法
 * 第一个参数：数组，为所依赖的其他模块（参照点为index-4.html，而不是当前文件main.js）
 * 第二个参数：回调函数（形参为所依赖的模块）
 */ 
require(['./requirejs/add.js', './requirejs/minus.js'], function (add, minus) {
    console.log(add(4, 5))
    console.log(minus(7, 1))
})