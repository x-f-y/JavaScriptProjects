//导入fs文件系统模块
const fs = require("fs")
/**
 * fs.readFile(path[,options],callback)读取文件内容
 *  - 参数path是读取文件的路径
 *  - 参数options表示以什么编码格式来读取文件
 *  - 参数callback是文件读取完成后执行的回调函数，可以通过此回调函数来获取读取的结果
 */
fs.readFile("./file/content.txt", "UTF-8", function (err, data) {
    //如果读取成功，则err的值为null，data的值为读取的结果
    //如果读取失败，则err的值为错误对象，data的值为undefined
    //可以根据err的值来判断文件读取是否成功
    // console.log(err)
    // console.log("--------")
    // console.log(data)
    if (err) {
        return console.log("文件读取失败！" + err.message)
    }
    console.log("文件读取成功！" + data)
})
/**
 * fs.writeFile(file,data[,options],callback)向指定的文件中写入内容
 *  - 参数file是待写入内容文件的路径
 *  - 参数data是要写入的内容
 *  - 参数options表示要以什么格式写入，默认是UTF-8
 *  - 参数callback是文件写入完成之后执行的回调函数
 *  - 两个注意点：
 *      - 调用该方法时，如果不存在指定路径的文件，则会创建新文件，但是不能创建新目录
 *      - 重复调用此方法写入同一个文件时，新写入的内容会覆盖之间的旧内容
 */
fs.writeFile("./file/content.txt", "Hello Node.js", function (err) {
    //如果文件写入成功，则err的值为null
    //如果文件写入失败，则err的值为错误对象
    //可以根据err的值来判断文件写入是否成功
    if (err) {
        return console.log("文件写入失败！" + err.message)
    }
    console.log("文件写入成功！")
})
