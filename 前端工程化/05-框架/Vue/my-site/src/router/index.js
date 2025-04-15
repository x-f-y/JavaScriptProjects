import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { titleController } from '@/utils';

if(!window.VueRouter){
  // 生产环境中使用cdn引入vue-router时，会自动安装插件
  // 只有在开发环境中才需要手动安装插件
  Vue.use(VueRouter);
}

const router = new VueRouter({
  routes,
  mode: "history"
});

router.afterEach((to) => {
  if(to.meta.title){
    titleController.setRouteTitle(to.meta.title);
  }
});

export default router;