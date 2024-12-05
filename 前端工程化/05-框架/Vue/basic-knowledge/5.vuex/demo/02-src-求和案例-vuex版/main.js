// 注意：import会有变量提升效果，运行js文件时，不管import语句的位置在哪，首先执行import语句
import Vue from "vue"
import App from "./App.vue"
import store from './store/index'

Vue.config.productionTip = false

new Vue({
    render: (h) => h(App),
    store
}).$mount("#app")
