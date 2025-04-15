import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import home from '@/store/subStore/home';
import search from '@/store/subStore/search';
import detail from "@/store/subStore/detail";
import shopCart from "@/store/subStore/shopCart";
import user from "@/store/subStore/user";
import trade from "@/store/subStore/trade";
import pay from "@/store/subStore/pay";
import myOrder from "@/store/subStore/myOrder";

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade,
        pay,
        myOrder
    }
})