// 登录和注册模块的数据
import {reqVerificationCode, userRegister, userLogin, userLogout, reqUserInfo} from "@/api";

export default {
    namespaced: true,
    actions: {
        async getVerificationCode(context, value){
            const res = await reqVerificationCode(value);
            if(res.code === 200) {
                context.commit('GETVERIFICATIONCODE', res.data);
            }else {
                return Promise.reject('获取验证码失败');
            }
        },
        async register(_, {phone, code, password}){
            const res = await userRegister(phone, code, password);
            if(res.code === 200){
                return Promise.resolve('注册成功');
            }else{
                return Promise.reject('注册失败');
            }
        },
        async login(_, {phone, password}){
            const res = await userLogin(phone, password);
            if(res.code === 200){
                // 将token（令牌）存放在localstorage中
                localStorage.setItem('token', res.data.token);
                return Promise.resolve('登录成功');
            }else{
                return Promise.reject('登录失败');
            }
        },
        async logout(context){
            const res = await userLogout();
            if(res.code === 200){
                context.state.userInfo = {};
                localStorage.removeItem('token');
                return Promise.resolve('退出登录成功');
            }else{
                return Promise.reject('退出登录失败');
            }
        },
        async getUserInfo(context){
            const res = await reqUserInfo();
            if(res.code === 200){
                context.commit('GETUSERINFO', res.data);
                return Promise.resolve();
            }else{
                return Promise.reject();
            }
        }
    },
    mutations: {
        GETVERIFICATIONCODE(state, value){
            state.verificationCode = value;
        },
        GETUSERINFO(state, value){
            state.userInfo = value;
        }
    },
    state: {
        // 验证码
        verificationCode: "",
        // 用户信息
        userInfo: {}
    },
    getters: {}
}