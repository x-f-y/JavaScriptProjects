const express = require("express")
const path = require('path')
const history = require("connect-history-api-fallback") // 这个包用来解决history模式下页面刷新404的问题
const app = express()

app.use(history()) // 该行代码必须在对外提供静态资源之前
app.use(express.static(path.join(__dirname, './static')))

app.get("/person", (request, response) => {
    response.send(JSON.stringify({
        name: 'tom',
        age: 18
    }))
})

app.listen(5006, (err) => {
    if (!err) console.log("express server is running at http://127.0.0.1:5006")
})
