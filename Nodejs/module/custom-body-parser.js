// 导入Node.js内置的querystring模块，该模块专门用来处理查询字符串。通过这个模块的
// parse()函数，可以轻松把查询字符串解析成对象的格式
const qs = require("querystring")

/**
 * 自定义一个中间件，解析post提交到服务器的表单数据
 *  如果数据量比较大,无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以data事件可能会触发多次，
 *  每触发一次data事件时，获取到的数据只是完整数据的一部分，需要手动对接收到的数据进行拼接
 */

const bodyParser = (req, res, next) => {
    // 1 定义一个变量，用来存储客户端发送过来的请求体数据
    let str = ""
    // 2 监听req对象的data事件，客户端向服务器发送数据时触发该事件
    req.on("data", (chunk) => {
        // 拼接请求体数据，隐式转换为字符串
        str += chunk
    })
    // 3 监听req对象的end事件，请求体发送完毕之后自动触发
    req.on("end", () => {
        // 打印完整的请求体数据
        console.log(str)
        // TODO: 把字符串格式的请求体数据，解析成对象格式
        // 4 调用qu.parse()方法，把查询字符串解析为对象
        const body = qs.parse(str)
        console.log(body)
        // 5 将解析出来的请求体对象，挂载为req.body属性
        req.body = body
        // 6 最后调用next()函数，执行后续的业务逻辑
        next() //注意这里的next()函数不能放在end事件的监听函数外面
    })
}

module.exports = bodyParser
