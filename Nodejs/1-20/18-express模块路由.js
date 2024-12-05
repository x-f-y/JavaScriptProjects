/**
 * 为了方便对路由进行模块化的管理，Express不建议将路由直接挂载到app上，
 *  而是推荐将路由抽离为单独的模块
 */

const express = require("express")
const app = express()

// 1 导入路由模块
const router = require("../module/router")
// 2 注册路由模块
// app.use(router)
// 类似于托管静态资源时，为静态资源统一挂载访问前缀一样，也可以为路由模块添加前缀，如下
app.use("/api", router)

// 注意：app.use()函数的作用，就是来注册全局中间件

app.listen(80, function () {
    console.log("express server is running at http://127.0.0.1")
})
