/**
 * 日期格式化
 * @param {Number|String} timestamp 时间戳
 * @returns 格式化之后的日期字符串
 */
export default function(timestamp, showTime = false){
  const date = new Date(+timestamp);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  let ans = `${year}-${month}-${day}`;
  if(showTime){
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    ans += ` ${hour}:${minute}:${second}`;
  }
  return ans;
}