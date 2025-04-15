import {reqCategoryList, reqBannerList, reqFloorList} from "@/api";

export default {
    namespaced: true,
    actions: {
        async getCategoryList(context){
            const res = await reqCategoryList()
            if(res.code === 200){
                res.data.length = 16
                context.commit('GETCATEGORYLIST', res.data)
            }
        },
        async getBannerList(context){
            const res = await reqBannerList()
            if(res.code === 200){
                context.commit('GETBANNERLIST', res.data)
            }
        },
        async getFloorList(context){
            const res = await reqFloorList()
            if(res.code === 200){
                context.commit('GETFLOORLIST', res.data)
            }
        }
    },
    mutations: {
        GETCATEGORYLIST(state, value){
            state.categoryList = value
        },
        GETBANNERLIST(state, value){
            state.bannerList = value
        },
        GETFLOORLIST(state, value){
            if(state.floorList.length === 0){
                state.floorList = value
            }
        }
    },
    state: {
        // 分类列表数据
        categoryList: [],
        // 轮播图数据
        bannerList: [],
        // 楼层数据
        floorList: []
    },
    getters: {}
}