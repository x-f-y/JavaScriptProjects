import store from "@/store";
import routes from './routes'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 重写push和replace方法以解决问题：使用编程式路由导航跳转到当前路由时，会抛出 NavigationDuplicated 错误
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(routerConfig, resolve, reject){
    reject = reject || (() => {})
    originPush.call(this, routerConfig, resolve, reject)
}
VueRouter.prototype.replace = function(routerConfig, resolve, reject){
    reject = reject || (() => {})
    originReplace.call(this, routerConfig, resolve, reject)
}

const router = new VueRouter({
    routes,
    // 当切换新路由时，设置页面滚动到顶部
    scrollBehavior(){
        return { y: 0 }
    }
})

const noUserPages = ['/login', '/register']; // 不需要获取用户信息的页面
const authPages = ['/trade', '/pay', '/paySuccess', '/myOrder']; // 需要登录才能访问的页面（有权限的页面）

// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
    const isLogin = localStorage.getItem('token'); // 是否登录
    const hasUserInfo = store.state.user.userInfo.name; // 是否有用户信息
    const needUserInfo = noUserPages.every(v => to.path.indexOf(v) === -1); // 当前访问的页面是否需要获取用户信息
    const isAuth = authPages.some(v => to.path.indexOf(v) !== -1); // 当前访问的页面是否需要权限

    // 登录状态下再次访问login页面，直接导航到首页
    if(isLogin && to.name === 'login'){
        return next('/home');
    }
    // 登录状态下没有用户信息，但访问需要用户信息的页面，此时需要发起请求获取用户信息
    if(isLogin && !hasUserInfo && needUserInfo){
        try {
            await store.dispatch('user/getUserInfo');
            return next();
        }catch (error) {
            // 获取用户信息失败，说明当前token已过期，需要退出登录，然后回到登录页面重新登录
            alert('登录已失效，请重新登录！');
            return store.dispatch('user/logout').then(() => {
                next('/login');
            });
        }
    }
    // 未登录状态下访问有权限的页面时直接跳转到登录页面，并将跳转前页面的路径作为query参数传递给登录页面
    if(!isLogin && isAuth){
        return next('/login?redirect=' + from.fullPath);
    }
    // 其他情况则直接放行
    next();
})

export default router