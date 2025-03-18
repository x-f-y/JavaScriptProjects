# json-server的使用步骤
[json-server的详细使用链接](https://github.com/typicode/json-server)

* 全局安装json-server
npm install -g json-server 

* 创建db.json文件，文件内容如下：
```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

* 启动json-server 服务
json-server --watch db.json