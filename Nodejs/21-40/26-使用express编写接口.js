const express = require("express")
const app = express()

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 如果项目中已经配置了CORS跨域资源共享，为了防止冲突，必须在配置CORS中间件之前声明JOSNP的接口。否则
// JSONP接口会被处理成开启了CORS的接口，JSONP接口的实现步骤如下：
// TODO: 配置JSONP的接口
app.get("/api/jsonp", (req, res) => {
    // 1 获取客户端发送过来的回调函数的名字
    const funcName = req.query.callback
    // 2 得到要通过JSONP形式发送给客户端的数据
    const data = { name: "zs", age: 22 }
    // 3 根据前两步得到的数据，拼接出一个函数调用的字符串
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    // 4 把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行
    res.send(scriptStr)
})

// 一定要在路由之前，配置cors这个中间件，从而解决接口跨域的问题（协议、域名|主机名、端口号等任何一项不同就存在跨域问题），使用步骤如下
// 1 运行npm install cors 安装中间件
// 2 导入中间件
const cors = require("cors")
// 3 调用app.use(cors())配置中间件
app.use(cors())

// 导入路由模块
const router = require("../module/apiRouter")
// 把路由模块注册到app上
app.use("/api", router)

app.listen(80, () => {
    console.log("express server running at http://127.0.0.1")
})
