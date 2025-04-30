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
 *  - 1.06 npm install / npm i -> 安装package.json中列出的所有依赖包，包括dependencies和devDependencies
 *         npm install --production / npm i --production -> 仅安装package.json中的dependencies，忽略devDependencies
 *  - 1.07 可以运行npm uninstall（可简写为npm un）命令来卸载指定的包，如npm uninstall/un jquery，可以添加-g参数全局卸载包
 *  - 1.08 如果某些包只在项目开发阶段会用到，在项目上线之后不会用到，则建议把这些包记录到devDependencies节点中
 *         与之对应的，如果某些包在开发和项目上线之后都需要用到，则建议把这些包记录到dependencies节点中
 *         使用npm i 包名 -D（-D是--save-dev的简写）命令可以安装指定的包，并记录到devDependencies节点中
 *         使用npm i 包名 -S（-S是--save的简写）命令可以安装指定的包，并记录到dependencies节点中
 *         如果不加-S或-D，npm默认会将包安装到dependencies中（npm 5.x及以上版本）
 *  - 1.09 在使用npm下载包的时候，默认从国外 https://registry.npmjs.org/ 服务器进行下载，所以下载速度很慢
 *         可以使用 npm config set registry https://registry.npmmirror.com/ 命令将下载包的镜像源切换为淘宝镜像源
 *         注意：1 https://registry.npmmirror.com/ 的旧域名为 https://registry.npm.taobao.org/
 *         注意：2 可以使用 npm config get registry 命令查看当前的下包镜像源
 *  - 1.10 为了更方便的切换下包的镜像源，可以安装nrm这个小工具，利用nrm提供的终端命令，可以快速查看和切换下包的镜像源
 *         npm i nrm -g 命令将nrm安装为全局可用的工具
 *         nrm ls 命令查看所有可用的镜像源
 *         nrm use taobao(服务器名称) 命令切换下包的镜像源为taobao镜像
 *         nrm current 查看当前源
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
 *         npm config get prefix -> 查看全局包的安装目录
 *         npm config set prefix 路径 -> 设置全局包的安装目录
 *         npm config get cache
 *         npm config set cache 路径
 *  - 1.16 npm run 脚本名称 -> 执行package.json中scripts字段定义的脚本，对一些常见的脚本名称
 *         （比如start、restart、stop、test），可以省略run，即npm 脚本名称
 *  - 1.17 有时候我们希望使用某个包提供的命令行工具，例如使用less包提供的lessc命令将less文件编译成css文件，但又不想全局
 *         安装less（因为这样的话不利于版本控制），此时可以使用npx这个npm自带的小工具，它可以直接运行当前项目中的命令
 *         （node_modules/.bin/中的命令）。步骤为：
 *          1. 使用npm install less -D命令本地安装less包
 *          2. 通过npx工具直接使用lessc命令编译less文件，例如npx lessc index.less index.css
 *         需要注意的是，若将命令配置到package.json中的scripts脚本，则无需使用npx。比如对于上述命令，只需要在package.json
 *         的scripts脚本中配置"compile":"lessc index.less index.css"，就可以直接使用npm run compile命令编译less文件了
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
