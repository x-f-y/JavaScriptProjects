// 该文件对请求进行统一管理
import requests from './request'
import mockRequests from "./mockRequest"

// 获取首页分类列表数据
export const reqCategoryList = () => {
    return requests({
        url: '/api/product/getBaseCategoryList',
        method: 'GET'
    })
}

// 获取首页轮播图数据
export const reqBannerList = () => {
    return mockRequests({
        url: '/mock/banner'
    })
}

// 获取首页楼层数据
export const reqFloorList = () => {
    return mockRequests({
        url: '/mock/floor'
    })
}

// 获取搜素模块的数据
export const reqSearchInfo = (params = {}) => {
    return requests({
        url: '/api/list',
        method: 'POST',
        data: params
    })
}

// 获取商品详情数据
export const reqGoodsInfo = (skuId) => {
    return requests({
        url: `/api/item/${skuId}`,
        method: 'GET'
    })
}

// 添加商品到购物车，或者对购物车中已有的商品进行数量改动
export const reqAddOrUpdateShopCar = (skuId, skuNum) => {
    return requests({
        url: `/api/cart/addToCart/${skuId}/${skuNum}`,
        method: 'POST'
    })
}

// 获取购物车列表数据
export const reqCartList = () => {
    return requests({
        url: '/api/cart/cartList',
        method: 'GET'
    })
}

// 删除购物车商品
export const reqDeleteCart = (skuId) => {
    return requests({
        url: `/api/cart/deleteCart/${skuId}`,
        method: 'DELETE'
    })
}

// 切换购物车商品选中状态
export const reqUpdateCheckCart = (skuId, isChecked) => {
    return requests({
        url: `/api/cart/checkCart/${skuId}/${isChecked}`,
        method: 'GET'
    })
}

// 获取验证码
export const reqVerificationCode = (phone) => {
    return requests({
        url: `/api/user/passport/sendCode/${phone}`,
        method: 'GET'
    })
}

// 用户注册
export const userRegister = (phone, code, password) => {
    return requests({
        url: '/api/user/passport/register',
        method: 'POST',
        data: {phone, code, password}
    })
}

// 用户登录
export const userLogin = (phone, password) => {
    return requests({
        url: '/api/user/passport/login',
        method: 'POST',
        data: {phone, password}
    })
}

// 获取用户信息
export const reqUserInfo = () => {
    return requests({
        url: '/api/user/passport/auth/getUserInfo',
        method: 'GET'
    })
}

// 用户退出登录
export const userLogout = () => {
    return requests({
        url: '/api/user/passport/logout',
        method: 'GET'
    })
}

// 获取订单交易页信息
export const reqTradeInfo = () => {
    return requests({
        url: "/api/order/auth/trade",
        method: "GET"
    })
}

// 提交订单
export const reqSubmitOrder = ({tradeNo, consignee, consigneeTel, deliveryAddress, paymentWay, orderComment, orderDetailList}) => {
    return requests({
        url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'POST',
        data: {consignee, consigneeTel, deliveryAddress, paymentWay, orderComment, orderDetailList}
    })
}

// 获取订单支付信息
export const reqSubmitPay = (orderId) => {
    return requests({
        url: `/api/payment/weixin/createNative/${orderId}`,
        method: 'GET'
    })
}

// 查询订单支付状态
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/api/payment/weixin/queryPayStatus/${orderId}`,
        method: 'GET'
    })
}

export const reqOrderInfo = (page, limit) => {
    return requests({
        url: `/api/order/auth/${page}/${limit}`,
        method: "GET"
    })
}