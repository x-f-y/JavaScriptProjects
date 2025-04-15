// 默认情况下，vue-cli会利用webpack将src目录中的所有代码打包成一个bundle
// 这样就导致访问一个页面时，需要加载所有页面的js代码
// 我们可以利用webpack对动态import的支持，从而达到把不同页面的代码打包到不同文件中

import 'nprogress/nprogress.css';
import { start, done, configure } from 'nprogress';
import NotFound from '@/views/NotFound';

configure({
  trickleSpeed: 50,
  showSpinner: false
});

function delay(duration){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function getPageComponent(pageCompResolver){
  return async () => {
    start();
    if(process.env.NODE_ENV === 'development'){
      await delay(2000);
    }
    const comp = await pageCompResolver();
    done();
    return comp;
  };
}

export default [
  {
    name: 'Home',
    path: '/',
    component: getPageComponent(() => import(/* webpackChunkName: "home" */"@/views/Home")),
    meta: {
      // 页面标题
      title: '首页'
    }
  },
  {
    name: 'About',
    path: '/about',
    component: getPageComponent(() => import(/* webpackChunkName: "about" */"@/views/About")),
    meta: {
      title: '关于我'
    }
  },
  {
    name: 'Blog',
    path: '/article',
    component: getPageComponent(() => import(/* webpackChunkName: "blog" */"@/views/Blog")),
    meta: {
      title: '文章'
    }
  },
  {
    name: 'CategoryBlog',
    path: '/article/cate/:categoryId',
    component: getPageComponent(() => import(/* webpackChunkName: "blog" */"@/views/Blog")),
    meta: {
      title: '文章'
    }
  },
  {
    name: 'BlogDetail',
    path: '/article/:id',
    component: getPageComponent(() => import(/* webpackChunkName: "blogdetail" */"@/views/Blog/Detail")),
    meta: {
      title: '文章详情'
    }
  },
  {
    name: 'Message',
    path: '/message',
    component: getPageComponent(() => import(/* webpackChunkName: "message" */"@/views/Message")),
    meta: {
      title: '留言板'
    }
  },
  {
    name: 'Project',
    path: '/project',
    component: getPageComponent(() => import(/* webpackChunkName: "project" */"@/views/Project")),
    meta: {
      title: '项目&效果'
    }
  },
  {
    name: 'NotFound',
    path: '*',
    component: NotFound
  }
]