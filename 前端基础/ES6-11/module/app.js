//入口文件

//模块引入
import * as m1 from "./module1.js"
import * as m2 from "./module2.js"
import * as m3 from "./module3.js"

console.log(m1) // {school: '尚硅谷', __esModule: true, teach: ƒ}
console.log(m2) // {school: '尚硅谷', __esModule: true, findJob: ƒ}
console.log(m3) // {default: {…}, __esModule: true}

m1.teach() // 我们可以教给你开发技能
m2.findJob() // 我们可以帮你找工作
m3.default.change() // 我们可以改变你

/* 修改box盒子的边框 */
// 1 安装jquery包 npm i jquery
// 2 导入jquery包
import $ from "jquery" // const $ = require('jquery')
console.log($(".box"))
$(".box").css("border", "5px solid skyblue")
