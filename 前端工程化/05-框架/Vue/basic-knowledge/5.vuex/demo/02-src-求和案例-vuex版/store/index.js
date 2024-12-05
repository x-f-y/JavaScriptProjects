import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 必须在创建store实例之前调用Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        jiaOdd(context, value){
            if(context.state.sum % 2){
                context.commit('JIA', value)
            }
        },
        jiaWait(context, value){
            setTimeout(() => {
                context.commit('JIA', value)
            }, 500)
        }
    },
    mutations: {
        JIA(state, value){
            state.sum += value
        },
        JIAN(state, value){
            state.sum -= value
        }
    },
    state: {
        sum: 0
    }
})