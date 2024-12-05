/**
 * 在Express中，路由指的是客户端的请求与服务器处理函数之间的映射关系
 *  Expres中的路由由3部分组成，分别是请求的类型、请求的URL地址、处理函数
 *  格式：app.METHOD(PATH,HANDLER)
 */

const express = require("express")
const app = express()

// 最简单的路由用法(直接挂载到app上)
app.get("/", (req, res) => {
    console.log("hello get")
})
app.post("/", (req, res) => {
    console.log("hello post")
})

app.listen(80, function () {
    console.log("express server is running at http://127.0.0.1")
})
