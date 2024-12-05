/**
 * Node.js中的第三方模块又叫做包
 */

/* 传统的格式化时间的做法 */
// 导入时间格式化模块
const timeModule = require("../module/dataFormat")
// 调用方法，进行时间的格式化
const date = new Date()
// console.log(date)
const newDate = timeModule.dateFormat(date)
console.log(newDate)

/* 使用moment包格式化时间 */
/**
 * - 1 使用npm包管理工具，在项目中安装格式化时间的包moment
 *  - 1.01 安装包命令：npm install moment或者npm i moment
 *  - 1.02 可以通过 @ 符号指定具体的版本 如npm i moment@2.24.0(不需要先删除旧版本的包)
 *  - 1.03 今后在项目开发中，一定要把node_modules文件夹，添加到.gitignore忽略文件中
 *  - 1.04 npm init -y(y是yes的意思)(或者--yes)命令可以在当前目录快速新建package.json文件
 *         注意：该命令只能在英文的目录下成功运行，所以项目文件夹一定要使用英文命名，不要使用中文，也不要出现空格
 *  - 1.05 同时安装多个包时，用空格将各个包名分开，如npm i jquery art-template
 *  - 1.06 可以使用npm i(或install)命令一次性安装项目中所有的依赖包（执行该命令时，npm包管理工具会先读取package.json中的
 *         dependencies节点，之后将该节点中所有的包一次性全部下载到项目中）
 *  - 1.07 可以运行npm uninstall 命令来卸载指定的包，如npm uninstall jquery，可以添加-g参数全局卸载包
 *  - 1.08 如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到devDependencies节点中
 *         与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到dependencies节点中
 *         使用npm i 包名 -D（-D是--save-dev的简写）命令可以安装指定的包，并记录到devDependencies节点中
 *         使用npm i 包名 -S（-S是--save的简写）命令可以安装指定的包，并记录到dependencies节点中
 *  - 1.09 在使用npm下载包的时候，默认从国外 https://registry.npmjs.org/ 服务器进行下载，所以下载速度很慢
 *         可以使用 npm config set registry https://registry.npmmirror.com/ 命令将下载包的镜像源切换为淘宝镜像源
 *         注意：1 https://registry.npmmirror.com/ 的旧域名为 https://registry.npm.taobao.org/
 *         注意：2 可以使用 npm config get registry 命令查看当前的下包镜像源
 *  - 1.10 为了更方便的切换下包的镜像源，可以安装nrm这个小工具，利用nrm提供的终端命令，可以快速查看和切换下包的镜像源
 *         npm i nrm -g 命令将nrm安装为全局可用的工具
 *         nrm ls 命令查看所有可用的镜像源
 *         nrm use taobao(服务器名称) 命令切换下包的镜像源为taobao镜像
 * 		   nrm current 查看当前源
 *  - 1.11 可以使用 npm ls -g 或者 npm list -g 查看已安装的全局包
 *  - 1.12 可以使用 npm view 包名 versions 查看包的所有版本
 *  - 1.13 可以使用 npm update 包名 更新模块到最新版本
 *  - 1.14 可以使用nvm工具对node.js进行版本管理
 *         nvm install <version> 安装指定版本的node.js
 *         nvm uninstall <version> 卸载指定版本的node.js
 *         nvm use <version> 使用指定版本的node.js
 *         nvm ls 或 nvm list 查看已安装的node.js版本
 *         nvm current 查看当前使用的node.js版本
 *  - 1.15 其他常用命令：
 *         npm config get prefix
 *         npm config set prefix 路径
 *         npm config get cache
 *         npm config set cache 路径
 * - 2 使用require()导入格式化时间的包
 *     注意：导入的名称就是下载时包的名称
 * - 3 参考moment的官方api文档对时间进行格式化
 */
// 导入需要的包
const moment = require("moment")
const time = moment().format("YYYY-MM-DD HH:mm:ss")
console.log(time)

/**
 * 备注：包的语义化版本规范
 *  1. 包的版本号是以“点分十进制”形式进行定义的，总共有三位数字，例如2.24.0
 *  2. 其中每一位数字所代表的含义如下：
 *      - 第一位数字：大版本
 *      - 第二位数字：功能版本
 *      - 第三位数字：Bug修复版本
 *  3. 版本号提升的规则：只要前面的版本号增长了，则后面的版本号归零
 */ 
