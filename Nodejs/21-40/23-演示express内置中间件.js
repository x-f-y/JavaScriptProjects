const express = require("express")
const app = express()

// 注意：除了错误级别的中间件，其他的中间件，必须在路由之间进行配置
// 通过express.json()这个中间件，配置解析表单中的application/json格式的数据
app.use(express.json())
// 通过express.urlencoded()这个中间件，配置解析表单中的application/x-www-form-urlencoded格式的数据
app.use(express.urlencoded({ extended: false }))

// 在服务器端，可以使用req.body这个属性来接收客户端发送过来的请求体数据（包括JSON格式的数据
// 和url-encoded格式的数据等）
// 默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
app.post("/user", (req, res) => {
    console.log(req.body)
    res.send("ok")
})
app.post("/book", (req, res) => {
    console.log(req.body)
    res.send("ok")
})

app.listen(80, () => {
    console.log("express server is running at http://127.0.0.1")
})
