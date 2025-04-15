// 该文件对 mock 请求进行二次封装（mock不是真正的发送ajax请求）
import axios from 'axios'

// 引入进度条
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

// 创建 axios 实例
const mockRequests = axios.create({
    timeout: 5000
})

// 请求拦截器
mockRequests.interceptors.request.use(function(config){
    NProgress.start()
    return config
})

// 响应拦截器
mockRequests.interceptors.response.use(function(res){
    NProgress.done()
    return res.data
}, function(err){
    console.log('fail')
    return Promise.reject(err.toString())
})

export default mockRequests