import Vue from 'vue';
import Vuex from 'vuex';
import loginUser from './loginUser';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true, // 开启严格模式后，只允许通过mutation改变state中的数据
  modules: {
    loginUser
  }
});

window.store = store; // 便于调试

export default store;