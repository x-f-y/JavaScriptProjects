## 安装
```
npm install itheima-tools-xfy
```

## 导入
```js
const myPackage = require("./itheima-tools-xfy")
```

## 格式化时间
```js
// 调用dateFormat()函数格式化时间
const newDate = myPackage.dateFormat(new Date())
// 结果 2022-05-05 17:16:12
console.log(newDate)
```

## 转义 HTML 中的特殊字符
```js
// 待转换的html字符串
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
// 调用htmlEscape()方法进行转换
const str = myPackage.htmlEscape(htmlStr)
// 结果 h1 title=&quot;abc&quot;&gt;这是h1标签&lt;span&gt;123&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;
console.log(str)
```

## 还原 HTML 中的特殊字符
```js
// 调用htmlUnescape()方法进行转换
const str2 = myPackage.htmlUnescape(str)
// 结果 <h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>
console.log(str2)
```