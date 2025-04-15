/**
 * 函数防抖
 * @param {Function} fn 要防抖的函数
 * @param {Number} delay 延迟时间，单位是ms
 * @returns 进行防抖处理之后的函数
 */
export default function(fn, delay){
  let timeId;
  return function(...args){
    if(timeId){
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}