# AJAX
AJAX全称为Asynchronous JavaScript And XML,就是异步的JS和XML.
通过AJAX可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。
AJAX不是新的编程语言，而是一种将现有的标准组合结合在一起使用的新方式。

# XML可扩展标记语言
XML被设计用来传输和存储数据。
XML和HTML类似，不同的是HTML中都是预定义标签，而XML中没有预定义标签，
全都是自定义标签，用来表示一些数据。

# HTTP 超文本标记语言
## 请求报文
```
请求行 	POST   /s?ie=utf-8   HTTP/1.1
请求头	Host: atguigu.com
		Cookie: name=guigu
		Content-type: application/x-www-form-urlencoded
		User-Agent: chrome 83
空行
请求体	username=admin&password=admin
```

## 响应报文
```
响应行	HTTP/1.1   200   OK
响应头	Content-Type: text/html;charset=utf-8
		Content-length: 2048
		Content-encoding: gzip
空行		
响应体	<html>
			<head>
			</head>
			<body>
				<h1>尚硅谷</h1>
			</body>
		</html>
```

# 请求头和响应头的作用
请求头：通知服务器有关于客户端请求的信息
响应头：指示客户端如何处理响应体

# 同源策略
同源策略最早由Netscape公司提出，是浏览器的一种安全策略
同源：协议、域名|主机名、端口号必须完全相同，违背同源策略就是跨域

# JSONP
概念：浏览器端通过script标签的src属性，请求服务器上的数据，同时，服务器返回一个函数的调用
jsonp是一个非官方的跨域解决方案，只支持get请求
由于script标签天生具有跨域能力，jsonp就是利用script标签的这一特性来发送请求的

# CORS
CORS，跨域资源共享，是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中
进行处理，get和post请求都支持。跨域资源共享标准新增了一组HTTP首部字段（响应头），允许服务器声明哪些
源站通过浏览器有权限访问哪些资源，新增的响应头有Access-Control-Allow-Origin、Access-Control-Allow-Headers、
Access-Control-Allow-Methods等