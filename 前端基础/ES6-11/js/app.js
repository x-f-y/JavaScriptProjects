// import * as m1 from './hello.js' // 静态引入
const btn = document.getElementById('btn')
btn.onclick = function () {
    // import()函数的返回结果是Promise对象，其成功的值就是参数所指向的模块暴露的对象
    import("./hello.js").then((module) => { // 动态引入
        // console.log(module) // Module {Symbol(Symbol.toStringTag): 'Module'}
        module.hello()
    })
}
