// 在一个自定义模块中，默认情况下，module.exports = {}

// 向module.exports对象上挂载username属性
module.exports.username = "xfy"
// 向module.exports对象上挂载sayHello方法
module.exports.sayHello = function () {
    console.log("hello!")
}
