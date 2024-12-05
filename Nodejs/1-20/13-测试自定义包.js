// 引入自定义包（先 npm i itheima-tools-xfy）
const myPackage = require("itheima-tools-xfy")

// 调用dateFormat()函数格式化时间
const newDate = myPackage.dateFormat(new Date())
console.log(newDate)
console.log("-------------------")

// 调用htmlEscape()函数转义html字符串
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
const str = myPackage.htmlEscape(htmlStr)
console.log(str)
console.log("-------------------")

// 调用htmlUnescape()函数还原html字符串
const str2 = myPackage.htmlUnescape(str)
console.log(str2)
