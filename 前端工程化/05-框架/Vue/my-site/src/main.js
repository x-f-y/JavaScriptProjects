import Vue from 'vue';
import App from './App.vue';
import "@/styles/global.less";
import router from './router';
import store from './store';
import { showMessage } from '@/utils';
import '@/mock';
import vLoading from '@/directives/loading';
import vLazy from '@/directives/lazy';
import './eventBus';

Vue.prototype.$showMessage = showMessage;

Vue.directive('loading', vLoading);
Vue.directive('lazy', vLazy);

// 加载全局设置
store.dispatch('setting/fetchSetting');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');