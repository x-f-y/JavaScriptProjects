import Vue from "vue"
import App from "./App.vue"
Vue.config.productionTip = false

// 使用插件
import plugins from './plugins'
Vue.use(plugins, 1, 2, 3)

new Vue({
    el: "#app",
    render: (h) => h(App),
})
