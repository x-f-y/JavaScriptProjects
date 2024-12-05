import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../pages/Login')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../pages/Home')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ "../pages/Welcome")
const Users = () => import(/* webpackChunkName: "user" */ "../pages/user/Users")
const Roles = () => import(/* webpackChunkName: "right" */ '../pages/right/Roles')
const Rights = () => import(/* webpackChunkName: "right" */ "@/pages/right/Rights")
const Lists = () => import(/* webpackChunkName: "goods" */ "@/pages/goods/Lists")
const Params = () => import(/* webpackChunkName: "goods" */ "@/pages/goods/Params")
const Categories = () => import(/* webpackChunkName: "goods" */ "@/pages/goods/Categories")
const AddGood = () => import(/* webpackChunkName: "goods" */ "@/pages/goods/AddGood")
const Order = () => import(/* webpackChunkName: "order" */ '../pages/order/Order')
const Report = () => import(/* webpackChunkName: "chart" */ "@/pages/chart/Report")

const router =  new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/home/welcome',
            children: [
                {
                    path: 'welcome',
                    component: Welcome
                },
                {
                    path: 'users',
                    component: Users
                },
                {
                    path: 'roles',
                    component: Roles
                },
                {
                    path: 'rights',
                    component: Rights
                },
                {
                    path: 'categories',
                    component: Categories
                },
                {
                    path: 'goods',
                    component: Lists,
                },
                {
                    path: 'params',
                    component: Params
                },
                {
                    path: 'addGood',
                    component: AddGood
                },
                {
                    path: 'orders',
                    component: Order
                },
                {
                    path: 'reports',
                    component: Report
                }
            ]
        }
    ]
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    if(to.path === '/login') {
        // 访问登录页，直接放行
        return next()
    }
    // 访问其他有权限的页面
    const tokenStr = sessionStorage.getItem('token')
    if(!tokenStr) {
        // 没有 token 就跳转到登录页
        return next('/login')
    }
    next()
})

export default router
