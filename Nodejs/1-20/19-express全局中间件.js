/**
 * 中间件（Middleware），特指业务流程的中间处理环节
 *  - express中间件的调用流程：当一个请求到达Express的服务器之后，可以连续调用多个中间件，
 *    从而对这次的请求进行预处理
 *  - 过程：客户端发起请求 -> 全局中间件1进行处理 -> ... -> 全局中间件n进行处理
 *    -> 局部中间件1进行处理 -> ... -> 局部中间件n进行处理 -> 路由进行处理 -> 向客户端响应请求
 *  - express的中间件，本质上就是一个function处理函数，但在中间件函数的形参列表中，必须
 *    包含next参数，而路由处理函数中只包含req和res参数
 *  - next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由
 *  - 多个中间价之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为
 *    req或res对象添加自定义的属性或方法，供下游的中间件或路由进行使用
 *  - 可以使用app.use()方法连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次调用
 */

const express = require("express")
const app = express()

// 创建一个最简单的中间件函数
/* const mw = function (req, res, next) {
    console.log("这是一个最简单的中间件函数！")
    // 注意：在当前中间件的业务处理完毕后，必须调用next()函数，表示把流转关系转交给下一个中间价或路由
    next()
} */
// 将mw注册为全局生效的中间件（全局生效的中间件指客户端发起的任何请求，到达服务器之后，都会触发的中间件）
/* app.use(mw) */

// 定义第一个全局中间件
app.use((req, res, next) => {
    console.log("这是第一个全局中间件")
    next()
})
// 定义第二个全局中间件
app.use((req, res, next) => {
    console.log("这是第二个全局中间件")
    next()
})

app.get("/", (req, res) => {
    console.log("Home page")
    res.send("Home page")
})
app.get("/user", (req, res) => {
    console.log("User page")
    res.send("User page")
})

app.listen(80, () => {
    console.log("http://127.0.0.1")
})
