import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if(to.meta.auth){
    // 进入需要鉴权的页面
    const status = store.getters['loginUser/status'];
    if(status === 'loading'){
      // 加载中，无法确定是否已经登录
      next({
        path: '/loading',
        query: {
          returnUrl: to.fullPath // 本打算进入的目标页路径
        }
      });
    }else if(status === 'login'){
      // 已登录
      next();
    }else{
      // 未登录
      alert('请先登录');
      next({
        path: '/login',
        query: {
          returnUrl: to.fullPath // 本打算进入的目标页路径
        }
      });
    }
  }else{
    // 进入不需要鉴权的页面
    next();
  }
});

export default router;