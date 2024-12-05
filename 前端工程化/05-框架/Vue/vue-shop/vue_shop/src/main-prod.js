import Vue from 'vue'
import App from './App.vue'

// 引入 vue-router
import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)

// 引入 vuex
import store from './store'

// 引入字体图标
import './assets/fonts/iconfont.css'

// 引入 NProgress 包对应的 js 和 css
import Nprogress from 'nprogress'
// import 'nprogress/nprogress.css'

// 引入 axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置请求拦截器
axios.interceptors.request.use(config => {
    // 展示进度条
    Nprogress.start()
    // console.log(config)
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
})
// 设置响应拦截器
axios.interceptors.response.use(config => {
    // 隐藏进度条
    Nprogress.done()
    return config
})
Vue.prototype.$http = axios

// 全局注册 vue-table-with-tree-grid
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

// 全局注册格式化时间的过滤器
Vue.filter('formatDate', (value) => {
    const date = new Date(value)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1 + '').padStart(2, '0')
    const day = (date.getDate() + '').padStart(2, '0')
    const hour = (date.getHours() + '').padStart(2, '0')
    const minute = (date.getMinutes() + '').padStart(2, '0')
    const second = (date.getSeconds() + '').padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})

// 引入富文本编辑器并全局注册
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

// 按需引入 element-ui 组件
// import {
//     Col,
//     Row,
//     Form,
//     FormItem,
//     Input,
//     Button,
//     Message,
//     Header,
//     Container,
//     Aside,
//     Main,
//     Menu,
//     Submenu,
//     MenuItem,
//     Breadcrumb,
//     BreadcrumbItem,
//     Card,
//     Table,
//     TableColumn,
//     Switch,
//     Tooltip,
//     Pagination,
//     Dialog,
//     MessageBox,
//     Tag,
//     Tree,
//     Select,
//     Option,
//     Cascader,
//     Alert,
//     Tabs,
//     TabPane,
//     Steps,
//     Step,
//     CheckboxGroup,
//     Checkbox,
//     Upload,
//     Timeline,
//     TimelineItem
// } from "element-ui";
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Button)
// Vue.use(Header)
// Vue.use(Container)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Card)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Switch)
// Vue.use(Tooltip)
// Vue.use(Pagination)
// Vue.use(Dialog)
// Vue.use(Tag)
// Vue.use(Tree)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Cascader)
// Vue.use(Alert)
// Vue.use(Tabs)
// Vue.use(TabPane)
// Vue.use(Step)
// Vue.use(Steps)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(Upload)
// Vue.use(Timeline)
// Vue.use(TimelineItem)
// Vue.prototype.$message = Message
// Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
