/**
 * 该文件是整个项目的入口文件
 */

/*// 引入完整版的Vue
import Vue from "vue/dist/vue"
// 引入App组件，它是所有组件的父组件
import App from "./App.vue"
// 关闭Vue的生产提示
Vue.config.productionTip = false
// 创建Vue的实例对象 —— vm
new Vue({
    el: '#app',
    template: '<App></App>',
    components: {App}
})*/

// 引入残缺版的Vue（vue.runtime.esm.js，缺少模板解析器，在vm配置项中不能写template配置项）
import Vue from "vue"
import App from "./App.vue"
Vue.config.productionTip = false
new Vue({
    render(createElement){
        // 下面这行代码完成的功能是：将App组件放入容器中
        return createElement(App)
    }
}).$mount('#app')

/**
 * 关于不同版本的Vue：
 *  1. vue.js与vue.runtime.esm|common.js的区别：
 *      - vue.js是完整版的Vue，包含：核心功能+模板解析器
 *      - vue.runtime.xxx.js是运行版的Vue，只包含核心功能，没有模板解析器
 *  2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容
 */