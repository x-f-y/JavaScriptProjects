// 导入path路径模块
const path = require("path")

/**
 * path.join([...paths])方法可以将多个路径拼接为完整的路径字符串
 *  - 注意：今后凡是涉及到路径拼接的操作，都建议使用path.join()方法进行处理
 */
const pathStr = path.join('/a', '/b/c', '../', './d', '/e')
console.log(pathStr) // \a\b\d\e
console.log(__dirname) // D:\Projects\JavaScriptProjects\Nodejs\1-20
const pathStr2 = path.join(__dirname, '/file/content.txt')
console.log(pathStr2) // D:\Projects\JavaScriptProjects\Nodejs\1-20\file\content.txt

/**
 * path.basename(path[,ext])方法可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名
 *  - 参数ext是文件扩展名
 */
const fpath = "/a/b/c/index.html"
var fullName = path.basename(fpath)
console.log(fullName) // index.html
var nameWithoutExt = path.basename(fpath, ".html")
console.log(nameWithoutExt) // index 

/**
 * path.extname(path)方法可以获取路径中的扩展名部分
 */
const fext = path.extname(fpath)
console.log(fext) // .html 

/**
 * path.resolve([...paths])方法将路径或路径片段的序列解析为绝对路径
 */
const ph = path.resolve(__dirname, './a.js')
console.log(ph) // D:\Projects\JavaScriptProjects\Nodejs\1-20\a.js 