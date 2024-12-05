/**
 * 可以通过express.static()函数非常方便地创建一个静态资源服务器
 *  注意：express在指定的静态目录中查找文件，并对外提供资源的访问路径，因此，存放
 *  静态文件的目录名不会出现在URL中
 */
const express = require("express")
const app = express()

// 使用express.static()对外提供静态资源
//  http://127.0.0.1:3000/index.html
//  http://127.0.0.1:3000/index.css
//  http://127.0.0.1:3000/index.js
app.use(express.static("../clock"))
// 如果要托管多个静态资源目录，可以多次调用express.static()函数
// 但需要注意的是：访问静态资源文件时，express.static()函数会根据目录的添加顺序来查找所需的文件
// 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式
//  http://127.0.0.1:3000/abc/content.txt
//  http://127.0.0.1:3000/abc/score.txt
//  http://127.0.0.1:3000/abc/score-ok.txt
app.use("/abc", express.static("../file"))

app.listen(3000, () => {
    console.log("express server is running at http://127.0.0.1:3000")
})
