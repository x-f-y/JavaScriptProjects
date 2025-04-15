import {reqTradeInfo} from "@/api";

export default {
    namespaced: true,
    actions: {
        async getTradeInfo(context){
            const res = await reqTradeInfo();
            if(res.code === 200){
                context.commit('GETTRADEINFO', res.data);
            }
        }
    },
    mutations: {
        GETTRADEINFO(state, value){
            state.tradeInfo = value;
        }
    },
    state: {
        tradeInfo: {}
    },
    getters: {
        userAddressList(state){
            return state.tradeInfo.userAddressList || []
        },
        detailArrayList(state){
            return state.tradeInfo.detailArrayList || []
        }
    }
}