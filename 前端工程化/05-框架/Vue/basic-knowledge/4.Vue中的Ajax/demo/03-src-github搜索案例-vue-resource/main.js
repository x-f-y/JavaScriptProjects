import Vue from "vue"
import App from "./App.vue"

Vue.config.productionTip = false

// 使用 vue-resource 插件（对xhr的封装，用来发送ajax请求）
import vueResource from "vue-resource"
Vue.use(vueResource)

new Vue({
    render: (h) => h(App),
    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount("#app")
