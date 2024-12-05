import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
    saveNavStatus(context, value){
        context.commit('SAVENAVSTATUS', value)
    }
}

const mutations = {
    SAVENAVSTATUS(state, value){
        state.activePath = value
    }
}

const state = {
    // 左侧被激活选中的二级菜单对应的路由路径
    activePath: ''
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})