const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, // 保存时不进行语法检查
    // 开启代理服务器（方式一）
    /*devServer: {
        // proxy属性值是目标服务器的基础路径
        proxy: "http://localhost:5000",
    },*/
    // 开启代理服务器（方式二）
    devServer: {
        proxy: {
            // /api1和/api2是请求前缀，当请求url以/api1和/api2开头时，代理服务器才会将请求转发到对应的服务器
            "/api1": {
                // target属性值是目标服务器的基础路径
                target: "http://localhost:5000",
                // 加了pathRewrite后，才能保证代理服务器转发给目标服务器的地址中不带有请求前缀
                pathRewrite: { "^/api1": "" },
                ws: true, // 用于支持websocket，默认值是true
                // 用于控制请求头中host的值。为false时，host仍然是浏览器发送过来的host；为true时，host会被设置为target。默认值是true
                changeOrigin: true,
            },
            "/api2": {
                target: "http://localhost:5001",
                pathRewrite: { "^/api2": "" },
            },
        },
    },
})
