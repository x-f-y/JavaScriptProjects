/**
 * 在使用fs模块操作文件时，如果提供的操作路径是以./或../开头的相对路径时，很容易出现路径动态拼接错误的问题
 *  - 原因：代码在运行的时候，会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径
 *  - 解决方案：在使用fs模块操作文件时，直接提供完整的路径（绝对路径），从而防止路径动态拼接的问题
 *    但这种解决方案会导致代码的移植性非常差，不利于维护
 *  - 更好的解决方案：使用__dirname
 */

const fs = require('fs')

fs.readFile('D:\\Projects\\JavaScriptProjects\\Nodejs\\file\\content.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log('文件读取失败！' + err.message)
    }
    console.log('文件读取成功！' + data)
}) 

fs.readFile('D:/Projects/JavaScriptProjects/Nodejs/file/content.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log('文件读取失败！' + err.message)
    }
    console.log('文件读取成功！' + data)
}) 

// 上面两种路径的写法等价

//__dirname表示当前文件所处的目录

console.log(__dirname) // 'D:\Projects\JavaScriptProjects\Nodejs\1-20'

const path = require('path')
fs.readFile(path.join(__dirname, '../file/content.txt'), "utf8", function (err, data) {
    if (err) {
        return console.log("文件读取失败！" + err.message)
    }
    console.log("文件读取成功！" + data)
})
