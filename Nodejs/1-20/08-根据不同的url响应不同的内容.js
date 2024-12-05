const http = require("http")
const server = http.createServer()

server.on("request", (req, res) => {
    // 1 获取请求的url地址
    const url = req.url
    // 2 设置默认响应内容
    let content = "<h1>404 Not Found</h1>"
    if (url === "/" || url === "/index.html") {
        // 3 用户请求的是首页
        content = "<h1>首页</h1>"
    } else if (url === "/about.html") {
        // 4 用户请求的事关于页面
        content = "<h1>关于页面</h1>"
    }
    // 5 设置Content-Type响应头，防止中文乱码
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    // 6 把content发送给客户端
    res.end(content)
})

server.listen(8080, () => {
    console.log("web server is running at http://127.0.0.1:8080")
})
