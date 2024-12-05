// 定义格化式时间的方法
function dateFormat(dateStr) {
    const time = new Date(dateStr)
    const year = time.getFullYear()
    const month = padZero(time.getMonth() + 1)
    const day = padZero(time.getDate())
    const hour = padZero(time.getHours())
    const minute = padZero(time.getMinutes())
    const seconde = padZero(time.getSeconds())
    return `${year}-${month}-${day} ${hour}:${minute}:${seconde}`
}

//定义补零的函数
function padZero(n) {
    return n > 9 ? n : "0" + n
}

module.exports = {
    dateFormat,
}
