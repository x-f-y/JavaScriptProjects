//1 引入fs文件系统模块
const fs = require("fs")
// 2 调用fs.readFile()读取文件内容
fs.readFile("./file/score.txt", "utf8", function (err, data) {
    //3 判断是否读取成功
    if (err) {
        return console.log("文件读取失败！" + err.message)
    }
    // console.log('文件读取成功！' + data)
    //4.1 先把score.txt的数据按照空格进行分隔
    const arrOld = data.split(" ")
    //4.2 遍历分隔后的数组，对每一项用冒号替换等号
    const arrNew = []
    arrOld.forEach((item) => {
        arrNew.push(item.replace("=", "："))
    })
    //4.3 把新数组的每一项，进行合并，得到一个新的字符串
    const newStr = arrNew.join("\r\n") // \r\n是回车换行的意思
    //5 将处理好的数据调用fs.writeFile()方法写入到新文件中
    fs.writeFile("./file/score-ok.txt", newStr, function (err) {
        //6 判断是否写入成功
        if (err) {
            return console.log("文件写入失败！" + err.message)
        }
        console.log("文件写入成功！")
    })
})
