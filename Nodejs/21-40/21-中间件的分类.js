/**
 * 根据中间件的用法，将其分为5类
 *  - 应用级别的中间件
 *      - 通过app.use()或app.get()或app.post()，绑定到app实例上的中间件，叫做应用级别的中间件
 *  - 路由级别的中间件
 *      - 绑定到express.Router()实例上的中间件，叫做路由级别的中间件。其用法和应用级别的中间件没有任何区别。
 *        只不过，应用级别的中间件是绑定到app（express()）实例上，路由级别的中间件是绑定到router（express.Router()）实例上
 *  - 错误级别的中间件
 *      - 专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题，注意：错误级别的中间件的处理函数必须有4个
 *        形参，从前到后依次是err，req，res，next
 *  - Express内置的中间件
 *      - express.static快速托管静态资源的内置中间件，例如HTTML文件，图片，CSS样式等
 *      - express.json解析JSON格式的请求体数据
 *      - express.urlencoded解析URL-encoded格式的请求体数据
 *  - 第三方的中间件
 *      - 非Express官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。例如：在express@4.16.0之前的
 *        版本中经常使用body-parser这个第三方中间件，来解析请求体数据，使用步骤见24-演示第三方中间件.js
 *        注意：Express内置的express.urlencoded中间件，就是基于body-parser这个第三方中间件进一步封装出来的
 */
