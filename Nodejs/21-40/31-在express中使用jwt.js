// 导入第三方模块
const express = require("express")
const jwt = require("jsonwebtoken") // jsonwebtoken 用于生成JWT字符串
// 注意 express-jwt 的版本为6.1.1 使用高版本的会报错expressJWT is not a function
const expressJWT = require("express-jwt") // express-jwt 用于将JWT字符串解析还原成JSON对象
const cors = require("cors")
const bodyParser = require("body-parser")

// 创建express的服务器实例
const app = express()

// 定义secret密钥
// 当生成JWT字符串的时候，需要使用使用secret密钥对用户的信息进行加密，最终得到加密好的JWT字符串
// 当把JWT字符串解析还原成JSON对象的时候，需要使用secret密钥进行解密
const secretKey = "xfy no1 ^_^"

// 注册中间件
app.use(cors()) // 允许跨域资源共享
app.use(bodyParser.urlencoded({ extended: false })) // 解析post表单数据
// 只要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息，挂载到req.user属性上
// .unless({path: [/^\/api\//]}) 指定以/api/开头的接口不需要访问权限
app.use(
    expressJWT({ secret: secretKey, algorithms: ["HS256"] }).unless({
        path: [/^\/api\//],
    })
) // 将JWT字符串还原成JSON对象

// 登录接口 这是一个没有权限的接口
app.post("/api/login", function (req, res) {
    // 定义一个变量，用来存储req.body请求体中的数据
    const userinfo = req.body
    // 登录失败
    if (userinfo.username !== "admin" || userinfo.password !== "admin") {
        res.send({
            status: 400,
            message: "登录失败！",
        })
    }
    // 登录成功
    // 调用jwt.sign()方法生成JWT字符串，并通过token属性发送给客户端
    // 参数1：用户的信息对象
    // 参数2: 加密的密钥
    // 参数3：配置对象，可以配置当前token的有效期
    // 记住：千万不要把密码加密到token字符串中
    const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, {
        expiresIn: "120s",
    })
    res.send({
        status: 200,
        message: "登录成功！",
        token: tokenStr, // 要发送给客户端的token字符串
    })
})

// 这是一个有权限的api接口
app.get("/admin/getinfo", function (req, res) {
    // 使用req.user获取用户信息，并使用data属性将用户信息发送给客户端
    console.log(req.user)
    res.send({
        status: 200,
        message: "获取用户信息成功！",
        data: req.user, // 要发送给客户端的用户信息
    })
})

// 使用全局错误处理中间件，捕获解析JWT失败后产生的错误
app.use((err, req, res, next) => {
    // 这次错误是由token解析失败导致的
    if (err.name === "UnauthorizedError") {
        return res.send({
            status: 401,
            message: "无效的token",
        })
    }
    // 不是由token解析失败导致的
    res.send({
        status: 500,
        message: "未知的错误",
    })
})

// 启动web服务器
app.listen(8888, () => {
    console.log("express server running at http://127.0.0.1:8888")
})
