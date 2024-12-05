import Vue from 'vue'
import Vuex from 'vuex'
import countOptions from './count'
import personOptions from './person'

Vue.use(Vuex) // 必须在创建store实例之前调用Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions
    }
})