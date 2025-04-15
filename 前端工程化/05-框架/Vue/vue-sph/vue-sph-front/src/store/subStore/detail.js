import {reqGoodsInfo, reqAddOrUpdateShopCar} from "@/api";

export default {
    namespaced: true,
    actions: {
        async getGoodsInfo(context, value){
            const res = await reqGoodsInfo(value)
            if(res.code === 200){
                context.commit('GETGOODSINFO', res.data)
            }
        },
        async addOrUpdateShopCar(_, {skuId, skuNum}){
            const res = await reqAddOrUpdateShopCar(skuId, skuNum);
            if(res.code === 200){
                return Promise.resolve('加入购物车成功');
            }else{
                return Promise.reject('加入购物车失败');
            }
        }
    },
    mutations: {
        GETGOODSINFO(state, value){
            state.goodsInfo = value
        }
    },
    state: {
        // 商品详情数据
        goodsInfo: {}
    },
    getters: {
        categoryView(state){
            return state.goodsInfo.categoryView || {};
        },
        skuInfo(state){
            return state.goodsInfo.skuInfo || {};
        },
        spuSaleAttrList(state){
            return state.goodsInfo.spuSaleAttrList || [];
        }
    }
}