//定义转义HTML的方法
function htmlEscape(htmlStr) {
    // 该replace方法的第二个参数是一个函数，且该函数的参数match是每次匹配得到的字符串
    return htmlStr.replace(/<|>|"|&/g, (match) => {
        // console.log(match)
        switch (match) {
            case "<":
                return "&lt;"
            case ">":
                return "&gt;"
            case '"':
                return "&quot;"
            case "&":
                return "&amp;"
        }
    })
}

// 定义还原HTML的方法
function htmlUnescape(htmlStr) {
    return htmlStr.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch (match) {
            case "&lt;":
                return "<"
            case "&gt;":
                return ">"
            case "&quot;":
                return '"'
            case "&amp;":
                return "&"
        }
    })
}

module.exports = {
    htmlEscape,
    htmlUnescape,
}
