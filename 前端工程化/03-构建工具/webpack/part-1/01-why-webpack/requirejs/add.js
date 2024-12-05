const add = (x, y) => {
    return x + y
}

/**
 * requireJs语法
 * 第一个参数：是一个数组，为当前模块所依赖的其他模块
 * 第二个参数：该模块对外暴露的接口
 */ 
define([], function (){
    return add
})