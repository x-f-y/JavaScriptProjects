import "./global.less";
import "./cover"; // 静态导入，表示初始就必须要依赖cover模块。打包时，该模块会被合并到主打包结果中
import("./movie"); // 动态导入，表示movie模块可以动态加载，运行到此代码时才会去远程加载该模块。打包时，该模块会单独形成打包结果