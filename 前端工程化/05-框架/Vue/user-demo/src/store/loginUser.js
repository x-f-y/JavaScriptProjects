import * as userApi from '../api/user';

export default {
  namespaced: true,
  state: {
    loading: false, // 是否正在登录中
    user: null // 当前登录的用户对象
  },
  getters: {
    // 当前的登录状态
    status(state){
      if(state.loading){
        return 'loading';
      }
      if(state.user){
        return 'login';
      }else{
        return 'unlogin';
      }
    }
  },
  mutations: {
    setLoading(state, payload){
      state.loading = payload;
    },
    setUser(state, payload){
      state.user = payload;
    }
  },
  actions: {
    async login(ctx, payload){
      ctx.commit('setLoading', true);
      const resp = await userApi.login(payload.loginId, payload.loginPwd);
      ctx.commit('setLoading', false);
      ctx.commit('setUser', resp);
      return resp;
    },
    async whoAmI(ctx){
      ctx.commit('setLoading', true);
      const resp = await userApi.whoAmI();
      ctx.commit('setLoading', false);
      ctx.commit('setUser', resp);
    },
    async loginOut(ctx){
      ctx.commit('setLoading', true);
      await userApi.loginOut();
      ctx.commit('setLoading', false);
      ctx.commit('setUser', null);
    }
  }
}