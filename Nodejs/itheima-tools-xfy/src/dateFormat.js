// 定义格化式时间的方法
function dateFormat(dateStr) {
    const year = dateStr.getFullYear()
    const month = padZero(dateStr.getMonth() + 1)
    const day = padZero(dateStr.getDate())
    const hour = padZero(dateStr.getHours())
    const minute = padZero(dateStr.getMinutes())
    const seconde = padZero(dateStr.getSeconds())
    return `${year}-${month}-${day} ${hour}:${minute}:${seconde}`
}

//定义补零的函数
function padZero(n) {
    return n > 9 ? n : "0" + n
}

module.exports = {
    dateFormat,
}
