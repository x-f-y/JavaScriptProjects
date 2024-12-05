/**
 * 不使用app.use()定义的中间件，叫做局部生效的中间件
 */

const express = require("express")
const app = express()

//定义中间件函数mw1
const mw1 = function (req, res, next) {
    console.log("这是第一个中间件")
    next()
}
//定义中间件函数mw2
const mw2 = function (req, res, next) {
    console.log("这是第二个中间件")
    next()
}

//mw1和mw2这两个中间件只在/这个路由中生效，而不会影响/user这个路由
/* app.get("/", mw1, mw2, (req, res) => {
    res.send("Home page.")
}) */
// 这种写法和上一种等价
app.get("/", [mw1, mw2], (req, res) => {
    res.send("Home page.")
})
app.get("/user", (req, res) => {
    res.send("User page.")
})

app.listen(80, () => {
    console.log("http://127.0.0.1")
})

/**
 * 中间件注意事项：
 *  - 一定要在路由之前注册中间件，错误级别的中间件除外（错误级别的中间件必须注册在所有路由之后）
 *  - 客户端发送过来的请求，可以连续调用多个中间件进行处理
 *  - 执行完中间件的业务代码之后，不要忘记调用next()函数，注意：错误级别的中间件的next()函数分情况是否调用
 *  - 为了防止代码逻辑混乱，调用next()函数之后不要再写额外的代码
 *  - 连续调用多个中间件时，多个中间件之间，共享req和res对象
 */
