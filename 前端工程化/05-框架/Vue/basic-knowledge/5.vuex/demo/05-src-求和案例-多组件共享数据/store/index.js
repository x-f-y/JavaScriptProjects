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
        },
        ADD_PERSON(state, value){
            state.personList.unshift(value)
        }
    },
    state: {
        sum: 0,
        school: '尚硅谷',
        subject: '前端',
        personList: [
            {id: '001', name: '张三'}
        ]
    },
    getters: {
        bigSum(state){
            return state.sum * 10
        }
    }
})