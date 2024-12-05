// 1.1 导入fs模块
const fs = require("fs")
// 1.2 导入path模块
const path = require("path")
// 1.3 导入http模块
const http = require("http")

// 2.1 创建web服务器
const server = http.createServer()
// 2.2 在web服务器监听request事件
server.on("request", (req, res) => {
    // 3.1 获取客户端请求的路径
    const url = req.url
    // 3.2 将该url地址映射为文件的具体存放路径
    // const fpath = path.join(__dirname, '../clock', url)
    // 优化资源的请求路径
    // 5.1 预定义空白的文件存放路径
    let fpath = ""
    if (url === "/") {
        // 5.2 如果请求的路径为/，则手动指定文件的存放路径
        fpath = path.join(__dirname, "../clock/index.html")
    } else {
        // 5.3 如果请求的路径不为/，则动态拼接文件的存放路径
        fpath = path.join(__dirname, "../clock", url)
    }

    // 4.1 根据映射出来的文件路径fpath读取文件
    fs.readFile(fpath, "utf8", (err, data) => {
        // 4.2 读取失败，向客户端响应具体的错误消息
        if (err) return res.end("<h1>404 Not Found.</h1>")
        // 4.3 读取成功，将读取成功的内容响应给客户端
        res.end(data)
    })
})
// 2.3 启动web服务器
server.listen(80, () => {
    console.log("web server is running at http://127.0.0.1")
})
