import Vue from "vue"
import App from "./App.vue"
Vue.config.productionTip = false

// 全局使用混入
import {mixin, mixin2} from "./mixin";
Vue.mixin(mixin)
Vue.mixin(mixin2)

new Vue({
    el: "#app",
    render: (h) => h(App),
})
