// 该文件对普通的 axios 请求进行二次封装
import axios from 'axios'
import {getUUID} from "@/utils"
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

// 创建 axios 实例
const requests = axios.create({
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use(function (config) {
    NProgress.start()
    config.headers.userTempId = getUUID()
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.token = token;
    }
    return config
})

// 响应拦截器
requests.interceptors.response.use(function (res) {
    NProgress.done()
    return res.data
}, function (err) {
    return Promise.reject(err.toString())
})

export default requests