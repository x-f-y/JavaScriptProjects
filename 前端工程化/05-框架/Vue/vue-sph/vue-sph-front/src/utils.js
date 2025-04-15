import { v4 as uuidv4 } from 'uuid';

/**
 * 节流函数
 * @param callback 回调函数
 * @param delay 延迟时间
 * @returns {(function(): void)|*}
 */
export const throttle = function(callback, delay = 500){
    let canInvoke = true
    return function(...params){
        if(canInvoke){
            setTimeout(() => {
                callback.apply(this, params)
                canInvoke = true
            }, delay)
        }
        canInvoke = false
    }
}

/**
 * 防抖函数
 * @param callback 回调函数
 * @param delay 延迟时间
 * @returns {(function(): void)|*}
 */
export const debounce = function(callback, delay = 500){
    let flag = null
    return function(...params){
        if(flag){
            clearTimeout(flag)
        }
        flag = setTimeout(() => {
            callback.apply(this, params)
        }, delay)
    }
}

/**
 * 获取游客身份的唯一标识 uuid_token
 * @returns {string}
 */
export const getUUID = function(){
    let uuid_token = localStorage.getItem('uuid_token');
    if(!uuid_token){
        uuid_token = uuidv4();
        localStorage.setItem('uuid_token', uuid_token);
    }
    return uuid_token
}