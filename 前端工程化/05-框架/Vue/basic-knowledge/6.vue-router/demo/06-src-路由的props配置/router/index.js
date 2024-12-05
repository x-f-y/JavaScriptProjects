import VueRouter from 'vue-router'
import Home from '../pages/Home'
import About from '../pages/About'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'news',
                    component: News
                },
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail/:id/:title',
                            component: Detail,
                            // props的第一种写法，值为对象，该对象中所有的key-value都会以props的形式传给Detail组件(不常用，因为传递的是死数据)
                            /*props: {
                                a: 100,
                                b: 200
                            }*/
                            // props的第二种写法，值为布尔值，若布尔值为真，就会把该组件收到的所有params参数以props的形式传给Detail组件(不常用，因为无法处理query参数)
                            // props: true
                            // props的第三种写法，值为函数，函数的返回值（一个对象）中所有的key-value都会以props的形式传递给Detail组件(常用，params参数和query参数都可以处理)
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
            component: About
        }
    ]
})
