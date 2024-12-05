/* 
    http模块是Node.js官方提供的、用来创建web服务器的模块。通过http模块提供的http.createServer()方法，
    就可以方便的把一台普通的电脑，变成一台web服务器，从而对外提供web资源服务
 */
/* 
    创建web服务器的基本步骤：
        - 导入http模块
        - 创建web服务器实例
        - 为服务器绑定request事件，监听客户端的请求
        - 启动服务器
 */
// 1 导入http模块
const http = require("http")
// 2 调用http.createServer()方法创建web服务器实例
const server = http.createServer()
// 3 为服务器绑定request事件，监听客户端的请求
server.on("request", (req, res) => {
    console.log("someone is visiting our web server")
    // req是请求对象，它包含了客户端相关的数据和属性
    // req.url是请求路径（例如：/check?a=100&b=200）
    const url = req.url
    // req.method是请求类型
    const method = req.method
    // req.headers是请求头
    const header = req.headers
    console.log(url, method, header)
    // res是响应对象，它包含了与服务器相关的数据和属性
    // res.setHeader()可以设置响应头Content-Type的值为text/html; charset=utf-8，以此解决中文乱码的问题
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    // res.end()可以向客户端发送指定的内容，并结束这次请求的处理过程
    res.end(`您请求的url地址是${url}，您请求的method类型是${method}`)
})
// 4 启动服务器
server.listen(80, () => {
    console.log("http server is running at http://127.0.0.1:80")
})
