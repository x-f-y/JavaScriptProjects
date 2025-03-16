//1、引入express
const { request } = require("express")
const express = require("express")

//2、创建应用对象
const app = express()

//3、创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
//可以接受get请求
app.get("/server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")
    //设置响应体
    response.send("hello ajax get")
})

//可以接受post请求
app.all("/server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")
    //设置响应头 设置允许客户端向服务器发送所有的请求头
    response.setHeader('Access-Control-Allow-Headers', '*')
    //设置响应体
    response.send("hello ajax post")
})

//可以接受任意类型的请求
app.all("/json-server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    //响应一个对象
    const data = {
        name: "atguigu",
    }
    //将对象封装为json字符串，因为无法直接传递对象
    let str = JSON.stringify(data)
    //设置响应体
    // response.send('hello ajax json');
    response.send(str)
})

//延时响应
app.get("/delay", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")
    setTimeout(function () {
        //设置响应体
        response.send("延时响应")
    }, 3000)
})

//针对IE缓存
app.get("/ie", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")
    //设置响应体
    response.send("hello ie")
})

//Jquery服务
app.all("/jquery-server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    //设置响应体
    // response.send('hello jquery ajax');
    const data = {
        name: "尚硅谷",
    }
    setTimeout(function () {
        response.send(JSON.stringify(data))
    }, 1000)
})

//axios服务
app.all("/axios-server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    //设置响应体
    const data = {
        name: "xfy",
        age: 20,
    }
    response.send(JSON.stringify(data))
})

//fetch服务
app.all("/fetch-server", (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    //设置响应体
    const data = {
        name: "xfy",
        age: 20,
    }
    response.send(JSON.stringify(data))
})

//jsonp服务 检测用户名是否存在
app.all("/check-username", (request, response) => {
    const data = {
        exist: 1,
        msg: "用户名已经存在",
    }
    // 将data转化为json字符串
    let str = JSON.stringify(data)
    // 返回一个函数的调用
    response.end(`handle(${str})`)
})

//jquery-jsonp服务
app.all("/jquery-jsonp-server", (request, response) => {
    const data = {
        name: "atguigu",
        city: ["北京", "上海", "深圳"],
    }
    // 将data转化为json字符串
    let str = JSON.stringify(data)
    // 接收callback参数
    let cb = request.query.callback
    // 返回一个函数的调用
    response.end(`${cb}(${str})`)
})

//cors服务
app.all("/cors-server", (request, response) => {
    // 设置响应头
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    response.setHeader("Access-Control-Allow-Methods", "*")
    response.send("helo cors")
})

//4、监听端口启动服务
app.listen(8000, () => {
    console.log("express server running at http://127.0.0.1:8000")
})
