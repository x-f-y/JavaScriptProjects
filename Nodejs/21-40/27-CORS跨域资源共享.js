/**
 * 什么是CORS？
 *  CORS(Cross-Origin Resource Sharing，跨域资源共享)由一系列HTTP响应头组成，这些HTTP响应头决定了
 *  浏览器是否阻止前端JS代码跨域获取资源。浏览器的同源安全策略默认会阻止网页跨域获取资源。但如果接口
 *  服务器配置了CORS相关的HTTP响应头，就可以解除浏览器端的跨域访问限制
 *  注意：CORS主要在服务器端进行配置，客户端浏览器无需做任何的额外配置，即可请求开启CORS的接口
 */

/**
 *  - CORS响应头部之Access-Control-Allow-Origin
 *      - res.setHeader('Access-Control-Allow-Origin','http://itcast.cn') 设置只允许来自 http://itcast.cn 的请求
 *      - res.setHeader('Access-Control-Allow-Origin','*') 设置允许来自任何域的请求
 *  - CORS响应头部之Access-Control-Allow-Headers
 *      - 默认情况下，CORS支持客户端向服务器发送请求的类型是有限的，如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，
 *        通过Access-Control-Allow-Headers对额外的请求头进行声明，否则这次请求会失败
 *      - res.setHeaders('Access-Control-Allow-Headers','Content-Type','X-Custom-Header') 设置允许客户端向服务器
 *        发送Content-Type请求头和X-Custom-Header请求头
 *      - res.setHeaders('Access-Control-Allow-Headers','*') 设置允许客户端向服务器发送所有的请求头
 *  - CORS响应头部之Access-Control-Allow-Methods
 *      - 默认情况下，CORS仅支持客户端向服务器发起GET、POST、HEAD请求，如果客户端希望通过PUT、DELETE等方式请求服务器的资源，
 *        则需要在服务器端通过Access-Control-Allow-Methods来指明实际请求所允许使用的HTTP方法
 *      - res.setHeaders('Access-Control-Allow-Methods','POST','GET','DELETE','HEAD') 设置只允许POST、GET、DELETE、HEAD
 *        请求方法
 *      - res.setHeaders('Access-Control-Allow-Methods','*') 设置允许所有的HTTP请求方法
 */

/**
 * CORS请求的分类：客户端在请求CORS接口时，根据请求方式和请求头的不同，可以将CORS的请求分为两大类：简单请求和预检请求
 *  - 简单请求，同时满足以下条件，就属于简单请求
 *      - 请求方式：GET、POST、HEAD三者之一
 *      - HTTP头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、DownLink、
 *        Save-Data、Viewport-Width、Width、Content-Type（只有三个值application/x-www-form-urlencoded、
 *        multipart/form-data、text/plain）
 *  - 预检请求，符合以下任何一个条件的请求，都需要进行预检请求
 *      - 请求方式为GET、POST、HEAD之外的请求Method类型
 *      - 请求头中包含自定义头部字段
 *      - 向服务器发送了application/json格式的数据
 */

/**
 * 在浏览器与服务器正式通信之前，浏览器会先发送OPTION请求进行预检，已获知服务器是否允许该实际请求，所以这次的OPTION请求
 * 称为“预检请求”，服务器成功响应预检请求后，才会发送真正的请求，并且携带真实的数据
 */

/**
 *  简单请求和预检请求的区别：
 *      - 对于简单请求，客户端与服务器之间只会发生一次请求
 *      - 对于预检请求，客户端与服务器之间会发生两次请求，OPTION预检请求成功之后，才会发起真正的请求
 */

/**
 * JSONP的概念与特点：
 *  - 概念：浏览器端通过<script>标签的src属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做JSONP
 *  - 特点：
 *      - 1、JSONP不属于真正的Ajax请求，因为它没有使用XMLHttpRequest这个对象
 *      - 2、JSONP仅支持GET请求，不支持POST、PUT、DELETE等请求
 */
