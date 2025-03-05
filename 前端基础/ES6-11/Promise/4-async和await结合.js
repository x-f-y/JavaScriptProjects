/**
 * 读取resource文件夹下三个文件的内容，并拼接输出
 */

const fs = require("fs")
const util = require("util")
const mineReadFile = util.promisify(fs.readFile)

//回调函数的形式
/* fs.readFile('./resource/content1.html', (err, data1) => {
	if (err) throw err;
	fs.readFile('./resource/content2.html',(err,data2) => {
		if(err) throw err;
		fs.readFile('./resource/content3.html',(err,data3) =>{
			if(err) throw err;
			console.log(data1 + data2 + data3);
		})
	})
}) */

//async和await
async function main() {
    try {
        let data1 = await mineReadFile("./resource/content1.html")
        let data2 = await mineReadFile("./resource/content2.html")
        let data3 = await mineReadFile("./resource/content3.html")
        console.log(data1 + data2 + data3)
    } catch (e) {
        console.log(e)
    }
}
main()
