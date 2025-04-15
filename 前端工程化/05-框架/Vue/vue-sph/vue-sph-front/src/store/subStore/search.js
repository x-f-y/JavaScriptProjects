import {reqSearchInfo} from "@/api";

export default {
    namespaced: true,
    actions: {
        async getSearchInfo(context, value){
            const res = await reqSearchInfo(value)
            if(res.code === 200){
                context.commit('GETSEARCHINFO', res.data)
            }
        }
    },
    mutations: {
        GETSEARCHINFO(state, value){
            state.searchInfo = value
        }
    },
    state: {
        // 搜索模块的数据
        searchInfo: {}
    },
    getters: {
        goodsList(state){
            return state.searchInfo.goodsList || []
        },
        attrsList(state){
            return state.searchInfo.attrsList || []
        },
        trademarkList(state){
            return state.searchInfo.trademarkList || []
        }
    }
}