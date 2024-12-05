const express = require("express")
const app = express()

// 1 使用npm i body-parse安装中间件
// 2 使用require导入中间件
const parser = require("body-parser")
// 3 使用app.use()注册中间件
app.use(parser.urlencoded({ extended: false }))

app.post("/user", (req, res) => {
    console.log(req.body)
    res.send("user page.")
})

app.listen(80, () => {
    console.log("express server is running at http://127.0.0.1")
})
