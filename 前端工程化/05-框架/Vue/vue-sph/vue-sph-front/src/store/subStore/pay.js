import {reqSubmitOrder, reqSubmitPay, reqPayStatus} from "@/api";

export default {
    namespaced: true,
    actions: {
        async submitOrder(context, value){
            const res = await reqSubmitOrder(value);
            if(res.code === 200){
                context.commit("SUBMITORDER", res.data);
                return Promise.resolve({
                    orderId: res.data,
                    message: "订单提交成功"
                });
            }else{
                return Promise.reject("订单提交失败");
            }
        },
        async submitPay(context, value){
            const res = await reqSubmitPay(value);
            if(res.code === 200){
                context.commit('SUBMITPAY', res.data);
            }
        },
        async payStatus(context, value){
            const res = await reqPayStatus(value);
            if(res.code === 200) {
                return Promise.resolve("支付成功");
            }else{
                return Promise.reject("支付失败");
            }
        }
    },
    mutations: {
        SUBMITORDER(state, value){
            state.orderId = value;
        },
        SUBMITPAY(state, value){
            state.codeUrl = value.codeUrl;
            state.totalFee = value.totalFee;
        }
    },
    state: {
        orderId: "", // 当前订单编号
        totalFee: "", // 当前订单总价
        codeUrl: "" // 当前订单的支付二维码
    },
    getter: {}
}