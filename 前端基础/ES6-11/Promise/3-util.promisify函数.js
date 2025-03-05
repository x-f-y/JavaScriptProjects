/**
 * nodejs util模块下的promisify函数
 */
//引入util模块
const util = require("util")
//引入fs模块
const fs = require("fs")
//util.promisify返回一个新的函数,且该函数调用的返回结果就是一个Promise对象
let mineReadFile = util.promisify(fs.readFile)
mineReadFile("./content.txt").then((value) => {
    console.log(value.toString())
})
