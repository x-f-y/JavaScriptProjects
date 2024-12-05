import VueRouter from 'vue-router'
import Home from '../pages/Home'
import About from '../pages/About'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

const router = new VueRouter({
    mode: 'history',
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
                    component: News,
                    beforeEnter(to, from, next){
                        if(to.meta.isAuth){
                            if(localStorage.getItem('school') === 'atguigu'){
                                next()
                            }else{
                                alert('学校名不对，无权查看！')
                            }
                        }else{
                            next()
                        }
                    }
                },
                {
                    name: 'xiaoxi',
                    path: 'message',
                    meta: { title: '消息' },
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
            meta: { isAuth: true, title: '关于' },
            component: About
        }
    ]
})

router.afterEach((to, from) => {
    document.title = to.meta.title || '硅谷系统'
})

export default router
