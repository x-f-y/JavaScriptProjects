/**
 * express是基于Node.js平台，快速、开放、极简的Web开发框架
 * 使用express可以方便、快速的创建Web网站的服务器或API接口的服务器
 */

// 1 导入expres模块
const express = require("express")

// 2 创建web服务器
const app = express()

// 4 监听客户端的GET和POST请求，并向客户端响应具体的内容
app.get("/user", (req, res) => {
    // 调用res.send()方法向客户端响应一个JSON对象
    res.send({ name: "zs", age: 20, gender: "男" })
})
app.post("/user", (req, res) => {
    // 调用res.send()方法向客户端响应一个文本字符串
    res.send("请求成功！")
})
app.get("/", (req, res) => {
    // 通过req.query对象可以获取到客户端发送过来的查询参数，默认情况下，req.query是一个空对象
    console.log(req.query)
    res.send(req.query)
})
// 注意这里的:id是一个动态的参数
app.get("/user/:ids/:username", (req, res) => {
    // req.params是动态匹配到的url参数，默认也是一个空对象
    console.log(req.params)
    res.send(req.params)
})

// 3 启动web服务器
app.listen(80, () => {
    console.log("express server is running at http://127.0.0.1")
})
