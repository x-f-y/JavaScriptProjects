// 入口文件
// 引入App.vue
import App from "./App"

// 创建vm
new Vue({
    el: "#root",
    template: `<App></App>`,
    components: {
        App
    }
})
