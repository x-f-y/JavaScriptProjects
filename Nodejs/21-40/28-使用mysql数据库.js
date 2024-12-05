// 1 使用 npm install mysql 安装 mysql 这个第三方模块
// 2 导入 mysql 模块
const mysql = require("mysql")

// 3 建立与 mysql 数据库的连接关系
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "demo1", // 指定要操作哪个数据库
})

// 检测 mysql 模块能否正常工作(SELECT 1 没有实际的意义，只是用来检测该模块能否正常工作)
db.query("SELECT 1", function (err, results) {
    if (err) return console.log("发生了错误：" + err.message)
    // 只要打印出 [ RowDataPacket { '1': 1 } ] 的结果，就证明数据库连接正常
    console.log(results)
})

// 4 通过 mysql 模块执行 sql 语句
// 查询 user 表的所有数据
/* const sqlStr = 'select * from user'
db.query(sqlStr, (err,results) => {
    if (err) return console.log('发生了错误：' + err.message)
    // 执行查询（select）语句，results是一个数组
    console.log(results)
}) */

// 向 user 表中插入一条数据
/* const user = { username: "spider-man", password: "pcc123" }
const sqlStr2 = "insert into user (username, password) values (?, ?)" // ? 是一个占位符
// 在这里，这个函数的第二个参数是一个数组，依次为占位符指定具体的值
db.query(sqlStr2, [user.username, user.password], (err, results) => {
    if (err) return console.log("发生了错误：" + err.message)
    // 判断是否插入数据成功
    // 执行插入（insert）语句，results是一个对象，其中的affectedRows属性为影响的条数
    if (results.affectedRows === 1) {
        console.log("插入数据成功！")
    }
}) */

// 向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以使用如下的便捷方式快速插入数据
/* const user2 = { username: "spider-man2", password: "pcc4321" }
const sqlStr3 = "insert into user set ?"
db.query(sqlStr3, user2, (err, results) => {
    if (err) return console.log("发生了错误：" + err.message)
    if (results.affectedRows === 1) {
        console.log("插入数据成功！")
    }
}) */

// 对数据库中的数据进行更新
/* const user3 = { id: 22, username: "aaa", password: "123" }
const sqlStr3 = "update user set username=?, password=? where id=?"
db.query(
    sqlStr3,
    [user3.username, user3.password, user3.id],
    (err, results) => {
        if (err) return console.log("发生了错误：" + err.message)
        // 执行更新（update）语句，results是一个对象，其中的affectedRows属性为影响的条数
        if (results.affectedRows === 1) {
            console.log("更新数据成功！")
        }
    }
) */

// 更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以使用如下的便捷方式快速更新数据
/* const user4 = { id: 22, username: "root", password: "root" }
const sqlStr4 = "update user set ? where id=?"
db.query(sqlStr4, [user4, user4.id], (err, results) => {
    if (err) return console.log("发生了错误：" + err.message)
    if (results.affectedRows === 1) {
        console.log("更新数据成功！")
    }
}) */

// 删除 id 为3的用户
/* const sqlStr5 = "delete from user where id=?"
// 如果 sql 语句中有多个占位符，则必须使用数组为每个占位符指定具体的值，如果只有一个占位符，则可以省略数组
db.query(sqlStr5, 27, (err, results) => {
    if (err) return console.log("发生了错误：" + err.message)
    // 执行删除（delete）语句，results是一个对象，其中的affectedRows属性为影响的条数
    if (results.affectedRows === 1) {
        console.log("删除数据成功！")
    }
}) */

/**
 * 标记删除
 *  使用DELETE语句，会把真正的数据从表中删除掉，为了保险未见，推荐使用标记删除的形式，来模拟删除的动作
 *  所谓的标记删除，就是在表中设置类似于status这样的状态字段，来标记当前这条数据是否被删除
 */
