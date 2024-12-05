import VueRouter from 'vue-router'
import Home from '../pages/Home'
import About from '../pages/About'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

const router = new VueRouter({
    routes: [
        {
            name: 'zhuye',
            path: '/home',
            meta: { title: '主页' },
            component: Home,
            children: [
                {
                    name: 'xinwen',
                    path: 'news',
                    meta: { isAuth: true, title: '新闻' },
                    component: News
                },
                {
                    name: 'xiaoxi',
                    path: 'message',
                    meta: { isAuth: true, title: '消息' },
                    component: Message,
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail/:id/:title',
                            meta: { title: '详情' },
                            component: Detail,
                            props($route){
                                return {
                                    id: $route.params.id,
                                    title: $route.params.title,
                                    demo: $route.query.demo
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'guanyu',
            path: '/about',
            meta: { title: '关于' },
            component: About
        }
    ]
})

// 全局前置路由守卫——初始化的时候以及每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    // console.log('全局前置路由守卫', to, from)
    if(to.meta.isAuth){ // 判断是否需要鉴权
        if(localStorage.getItem('school') === 'atguigu'){
            next()
        }else{
            alert('学校名不对，无权查看！')
        }
    }else{
        next()
    }
})

// 全局后置路由守卫——初始化的时候以及每次路由切换之后被调用
router.afterEach((to, from) => {
    // console.log('全局后置路由守卫', to, from)
    document.title = to.meta.title || '硅谷系统'
})

export default router
