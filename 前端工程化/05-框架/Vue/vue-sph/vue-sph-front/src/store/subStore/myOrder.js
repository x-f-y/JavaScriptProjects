import {reqOrderInfo} from "@/api";

export default {
    namespaced: true,
    actions: {
        async getOrderInfo(context, {page, limit}){
            const res = await reqOrderInfo(page, limit);
            if(res.code === 200){
                context.commit('GETORDERINFO', res.data);
            }
        }
    },
    mutations: {
        GETORDERINFO(state, value){
            state.orderInfo = value;
        }
    },
    state: {
        orderInfo: {}
    },
    getters: {
        // 订单数组
        orderList(state){
            return state.orderInfo.records || [];
        }
    }
}