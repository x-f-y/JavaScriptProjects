import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 恢复登录状态
store.dispatch('loginUser/whoAmI');

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
