import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import News from '../views/News.vue';
import User from '../views/User.vue';
import Loading from '../views/Loading.vue';

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/news',
    component: News,
    meta: {
      // 新闻页面需要鉴权
      auth: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/user',
    component: User,
    meta: {
      // 个人中心页面需要鉴权
      auth: true
    }
  },
  {
    path: '/loading',
    component: Loading
  },
];