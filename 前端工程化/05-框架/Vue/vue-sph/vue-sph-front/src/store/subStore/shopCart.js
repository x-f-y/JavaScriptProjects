import {reqCartList, reqDeleteCart, reqUpdateCheckCart} from "@/api";

export default {
    namespaced: true,
    actions: {
        async getCartList(context){
            const res = await reqCartList()
            if(res.code === 200){
                context.commit('GETCATELIST', res.data)
            }
        },
        async deleteCart(_, skuId){
            const res = await reqDeleteCart(skuId)
            if(res.code === 200){
                return Promise.resolve('删除成功')
            }else{
                return Promise.reject('删除失败')
            }
        },
        async updateCheckCart(_, {skuId, isChecked}){
            const res = await reqUpdateCheckCart(skuId, isChecked)
            if(res.code === 200){
                return Promise.resolve('状态切换成功')
            }else{
                return Promise.reject('状态切换失败')
            }
        },
        deleteAllCheckedCart(context){
            const promises = []
            context.getters.cartInfoList.forEach(v => {
                if(v.isChecked === 1){
                    const promise = context.dispatch('deleteCart', v.skuId)
                    promises.push(promise);
                }
            })
            return Promise.all(promises)
        },
        updateAllCheckCart(context, isChecked){
            const promises = []
            context.getters.cartInfoList.forEach(v => {
                if(v.isChecked ^ isChecked === 1){
                    const promise = context.dispatch('updateCheckCart', {
                        skuId: v.skuId,
                        isChecked: isChecked
                    })
                    promises.push(promise)
                }
            })
            return Promise.all(promises)
        }
    },
    mutations: {
        GETCATELIST(state, value){
            state.cartList = value
        }
    },
    state: {
        // 购物车列表数据
        cartList: []
    },
    getters: {
        cartInfoList(state){
            return state.cartList[0]?.cartInfoList || []
        }
    }
}