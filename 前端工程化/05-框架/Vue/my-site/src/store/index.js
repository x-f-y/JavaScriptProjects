import Vue from 'vue';
import { Store, install } from 'vuex';
import banner from './banner';
import setting from './setting';
import about from './about';
import project from './project';

if(!window.Vuex){
  // 生产环境中使用cdn引入vuex时，会自动安装插件
  // 只有在开发环境中才需要手动安装插件
  install(Vue);
}

export default new Store({
  strict: true,
  modules: {
    banner,
    setting,
    about,
    project
  }
});