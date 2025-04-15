import { getSetting } from '@/api/setting';
import { titleController } from '@/utils';

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null
  },
  mutations: {
    setLoading(state, payload){
      state.loading = payload;
    },
    setData(state, payload){
      state.data = payload;
    }
  },
  actions: {
    async fetchSetting(ctx){
      ctx.commit('setLoading', true);
      const resp = await getSetting();
      ctx.commit('setData', resp);
      ctx.commit('setLoading', false);
      // 设置网站页签图标
      if(resp.favicon){
        // <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
        let link = document.querySelector('link[rel="shortcut icon"]');
        if(link){
          return;
        }
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        link.href = resp.favicon;
        link.type = 'image/x-icon';
        document.head.appendChild(link);
      }
      // 设置网站标题
      if(resp.siteTitle){
        titleController.setSiteTitle(resp.siteTitle);
      }
    }
  }
}