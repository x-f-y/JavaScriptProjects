// 1.1 导入path和fs模块
const path = require("path")
const fs = require("fs")
// 1.2 定义匹配<style></style>和<script></script>标签的正则表达式
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// 2.1 使用fs.readFile()方法读取clock目录下的素材.html文件
fs.readFile(
    path.join(__dirname, "../clock/素材.html"),
    "utf8",
    function (err, data) {
        // 2.2 判断是否读取成功
        if (err) return console.log("读取素材文件失败！" + err.message)
        // console.log('读取素材文件成功！' + data)
        // 2.3 读取文件成功后，调用对应的3个方法，分别拆解出css，js，html文件
        resolveCSS(data)
        resolveJS(data)
        resolveHTML(data)
    }
)

// 3.1 定义处理css样式的方法
function resolveCSS(htmlStr) {
    // 3.2 使用正则表达式提取出需要的内容
    // exec()方法用于检索字符串中的正则表达式的匹配，返回一个数组，其中存放匹配的结果，如果未找到匹配，则返回null
    const r1 = regStyle.exec(htmlStr)
    // 3.3 使用replace方法对字符串进行替换操作
    const newCSS = r1[0].replace("<style>", "").replace("</style>", "")
    // 3.4 调用fs.writeFile()方法将提取的样式字符串写入到clock目录下的index.css文件中
    fs.writeFile(
        path.join(__dirname, "../clock/index.css"),
        newCSS,
        function (err) {
            if (err) return console.log("CSS样式文件写入失败！" + err.message)
            console.log("CSS样式文件写入成功！")
        }
    )
}

// 4.1 定义处理js脚本的方法
function resolveJS(htmlStr) {
    // 4.2 使用正则表达式提取出需要的内容
    // exec()方法用于检索字符串中的正则表达式的匹配，返回一个数组，其中存放匹配的结果，如果未找到匹配，则返回null
    const r2 = regScript.exec(htmlStr)
    // 4.3 使用replace方法对字符串进行替换操作
    const newJS = r2[0].replace("<script>", "").replace("</script>", "")
    // 4.4 调用fs.writeFile()方法将提取的脚本字符串写入到clock目录下的index.js文件中
    fs.writeFile(
        path.join(__dirname, "../clock/index.js"),
        newJS,
        function (err) {
            if (err) return console.log("JS脚本文件写入失败！" + err.message)
            console.log("JS脚本文件写入成功！")
        }
    )
}

// 5.1 定义处理html的方法
function resolveHTML(htmlStr) {
    // 5.2 使用正则表达式将内置的style和script标签替换为外联的link和script标签
    const newHTML = htmlStr
        .replace(regStyle, '<link rel="stylesheet" href="./index.css" />')
        .replace(regScript, '<script src="./index.js"></script>')
    // 5.3 调用fs.writeFile()方法将处理好的html字符串写入到clock目录下的index.html文件中
    fs.writeFile(
        path.join(__dirname, "../clock/index.html"),
        newHTML,
        function (err) {
            if (err) return console.log("html文件写入失败！" + err.message)
            console.log("html文件写入成功！")
        }
    )
}
