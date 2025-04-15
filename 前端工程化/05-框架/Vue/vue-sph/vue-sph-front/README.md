# 项目笔记

## 项目说明

### 关于 public 文件夹与 assets 文件夹的异同

二者都用于存放项目中的静态资源。但对于前者中存放的静态资源，webpack 会将其原封不动的打包；而对于后者中存放的静态资源，webpack 会将其当做模块进行打包

### 开发项目的基本步骤

1. 书写静态页面
2. 拆分静态组件
3. 获取服务端的数据动态渲染
4. 书写交互的业务逻辑

## 除 vue-cli 默认配置之外的其它常用配置

### 使用`npm run serve`命令项目时，如何让其在浏览器中自动打开？

在 package.json 文件中修改如下配置：

```json
{
    "scripts": {
        "serve": "vue-cli-service serve --open"
    }
}
```

### 如何关闭 eslint 语法检查？

在 vue.config.js 文件中添加如下配置：

```js
module.exports = defineConfig({
    lintOnSave: false
})
```

## Vue 知识点补充

### 路由重定向

```js
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        // 访问应用时，重定向到首页
        {
            path: '/',
            redirect: '/home'
        }
    ]
})
```

### 路由跳转时如何控制 params 参数可传可不传？

```js
export default new VueRouter({
    routes: [
        {
            name: 'search',
            // 在占位符后面加上一个“？”即可实现params参数的可选传递
            path: '/search/:xxx?/:yyy?',
            component: Search
        }
    ]
})
```

### 设置了 params 参数可传可不传后，如果传递的是空串，跳转时路径会有问题，并且浏览器控制台也有相应的警告，怎么解决？

```js
this.$router.push|replace({
    name: 'xxx',
    // 在要传递的参数的后面添加 “|| undefined” 即可解决这个问题
    params: {
        yyy: zzz || undefined
    }
})
```

### 使用编程式路由导航跳转到当前路由时，会抛出 NavigationDuplicated 错误，怎么解决？

1. `this.$router.push|replace()`方法返回一个promise，可以对错误进行捕获处理。但这种方式指标不治本，每次使用 push|replace 时都要捕获错误

   ```js
   // 第一种写法
   this.$router.push|replace({...}).then(() => {}, () => {...}) // 第一个函数是成功的回调，第二个函数是失败的回调
   // 第二种写法
   this.$router.push|replace({...}).catch(v => {...})
   // 第三种写法
   this.$router.push|replace({...}, () => {}, () => {...}) // 第一个函数是成功的回调，第二个函数是失败的回调
   ```

2. 重写 push 和 replace 方法，一劳永逸

   ```js
   const originPush = VueRouter.prototype.push
   const originReplace = VueRouter.prototype.replace
   VueRouter.prototype.push = function(routerConfig, resolve, reject){
       reject = reject || (() => {})
       originPush.call(this, routerConfig, resolve, reject)
   }
   VueRouter.prototype.replace = function(routerConfig, resolve, reject){
       reject = reject || (() => {})
       originReplace.call(this, routerConfig, resolve, reject)
   }
   ```

### 使用 mapState 的对象写法时，值也可以是一个函数

```vue
import {mapState} from 'vuex'
export default {
	computed: {
		 // 这里举的例子使用了模块化+命名空间
		...mapState('moduleName', {
			xxx: (state) => {
				return state.yyy
			}
		})
		// xxx是要在模板中使用的名称，yyy是state中的数据名称
	}
}
```

### 防抖节流函数如何传递参数？

```vue
function debounce(callback, delay = 500){
	let flag = null
    return function(...params){
        if(flag){
            clearTimeout(flag)
        }
        flag = setTimeout(() => {
            callback.apply(this, params)
        }, delay)
    }
}
function throttle(callback, delay = 500){
	let canInvoke = true
    return function(...params){
        if(canInvoke){
            setTimeout(() => {
                callback.apply(this, params)
                canInvoke = true
            }, delay)
        }
        canInvoke = false
    }
}
export default {
	methods: {
		addOrMinusGoodNum: debounce(async function(skuId, skuNum){
			await this.$store.dispatch('detail/addOrUpdateShopCar', {skuId, skuNum})
        	this.getData()
		}, 500),
		enter: throttle(function(index){
			this.currentIndex = index
        }, 20)
	}
}
```

### vue-router 中`$route.path`和`$route.fullPath`的区别

前者不带 query 参数，后者带有 query 参数。例如对于路径`http://localhost:8080/home/search/a/b/c?username=zs&password=admin`，其中`/a/b/c`是 params参数。那么`$route.path`的值为`/home/search/a/b/c`，而`$route.fullPath`的值为`/home/search/a/b/c?username=zs&password=admin`

### 关于`vee-validate`库

`vee-validate`是vue项目中一个专门做表单验证的库。但由于本项目的主要用途是供个人学习，所以本项目不使用这个库，而是自己手写表单验证相关的逻辑

> 备注：4.x版本的vee-validate仅支持vue3，对于vue2项目，请安装3.x版本

## 项目亮点

### 重写`vue-router`的`push`和`replace`方法

### 轮播图、分页器等自定义组件的封装

### `axios`的二次封装

### 防抖节流

### 放大镜效果

### 路由守卫

### 图片懒加载和路由懒加载

### 登录注册的表单校验

### 解决下拉菜单的过渡问题
