const express = require("express")
const app = express()

// 1 使用 npm installl express-session 命令安装session模块
// 2 导入session中间件
const session = require("express-session")
// 3 配置session中间件
app.use(
    session({
        secret: "xfy", // 该值可以是任意字符串
        resave: false, // 固定写法
        saveUninitialized: true, // 固定写法
    })
)

// 通过express.urlencoded()这个中间件，解析表单中的url-encoded格式的数据
app.use(express.urlencoded({ extended: false }))
// 托管静态页面
// app.use(express.static("../pages"))

// 配置cors这个中间件，来解决接口跨域的问题
const cors = require("cors")
app.use(cors())

// 登录的api接口
app.post("/api/login", (req, res) => {
    // 判断用户提交的登录信息是否正确
    if (req.body.username !== "admin" || req.body.password !== "admin") {
        return res.send({
            status: 1,
            msg: "登录失败",
        })
    }
    // 登录成功后，通过req.session对象来存储用户的关键信息
    // 注意：只有express-session这个中间件成功配置后，才能使用req.session这个属性
    req.session.user = req.body // 用户的登录信息
    req.session.isLogin = true // 用户的登录状态
    res.send({
        status: 0,
        msg: "登录成功",
    })
})

// 获取用户username的接口
app.get("/api/username", (req, res) => {
    // 判断用户是否登录
    if (!req.session.isLogin) {
        res.send({
            status: 1,
            msg: "fail"
        })
    }else {
        res.send({
            status: 0,
            msg: "success",
            username: req.session.user.username
        })
    }
})

// 退出登录的接口
app.post("/api/logout", (req, res) => {
    // 调用req.session.destory()函数，清空当前客户端对应的session信息
    // 注意：该函数不会清空所有用户的session
    req.session.destroy()
    res.send({
        status: 0,
        msg: "退出登录成功",
    })
})

app.listen(80, () => {
    console.log("express server running at http://127.0.0.1")
})
