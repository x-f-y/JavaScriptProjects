# 笔记

## Vue脚手架配置代理
> 方法一
在vue.config.js中添加如下配置
```
devServer: {
    proxy: "http://localhost:5000" // proxy属性值是目标服务器的基础路径
}
```
说明：
1. 发送ajax请求的基础路径需要改成代理服务器的基础路径
2. 优点：配置简单，请求资源时直接发给前端（localhost:8080）即可
3. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
4. 工作方式：若按照上述配置代理，当请求了前端不存在的资源（public文件夹下没有的资源）时，那么该请求才会转发给服务器，如果public文件夹下有请求的目标资源，那么代理服务器将不会再将请求转发给目标服务器
> 方法二
编写vue.config.js配置具体代理规则
```
devServer: {
	proxy: {
		'/api': { // 请求前缀，请求的url以/api开头时代理服务器才会将其转发到对应的服务器
			target: 'http://localhost:5000', // 目标服务器的基础路径
			pathRewrite: {'^/api': ''} // 代理服务器把请求转发给目标服务器时去除请求前缀
			ws: true // 用于支持websocket，默认值是true
			changeOrigin: true, // 用于控制请求头中host的值，该字段默认值是true
		},
		'/atguigu': {
			target: 'http://localhost:5001',
			pathRewrite: {'^/atguigu', ''}
		}
	}
}
/**
 * changeOrigin设置为true时，目标服务器收到的请求头中的host为：localhost:5000
 * changeOrigin设置为false时，目标服务器收到的请求头中的host为：localhost:8080
 * changeOrigiin默认值为true
 */ 
```
说明：
1. 发送ajax请求的基础路径需要改成代理服务器的基础路径，且要加上请求前缀
2. 优点：可以配置多个代理，且可以灵活地控制请求是否走代理
3. 缺点：配置略微繁琐，请求资源时必须加前缀

## 插槽
1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于父组件<==>子组件

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

    1. 默认插槽

        ```vue
        <!-- 父组件（App.vue）中 -->
        <Category>
            <div>html结构1</div>
        </Category>
        <!-- 子组件（Category.vue）中 -->
        <template>
        	<div>
                <slot>插槽默认内容...</slot>
            </div>
        </template>
        ```
       
        > 注意：如果父组件未向子组件传递html结构，则slot标签中的内容则会作为默认结构显示到页面中
        
    2. 具名插槽

        ```vue
        <!-- 父组件（App.vue）中 -->
        <Category>
            <template v-slot:default>
        		<div>html结构1</div>
            </template>
        	<template v-slot:center>
        		<div>html结构2</div>
        	</template>
        </Category>
        <!-- 子组件（Category.vue）中 -->
        <template>
        	<div>
                <slot>插槽默认内容...</slot>
                <slot name="center">插槽默认内容...</slot>
            </div>
        </template>
        ```

        > 注意：
        >
        > 1. v-slot指令只能用于template标签
        > 2. 不带name的`<slot>`会带有隐含的名字"default"

    3. 作用域插槽

        1. 理解：数据在子组件（Category.vue），根据数据生成的结构由父组件（App.vue）决定。数据流向：子组件==>父组件

        2. 具体编码：

           ```vue
           <!-- 父组件（App.vue）中 -->
           <Category>
               <template v-slot="scopeData">
                   <ul>
                       <li v-for="(game, index) in scopeData.games" :key="index">{{game}}</li>
                   </ul>
               </template>
           </Category>
           <Category>
               <template v-slot:default="{games}">
           		<ol>
                       <li v-for="(game, index) in games" :key="index">{{game}}</li>
                   </ol>
               </template>
           </Category>
           <!-- 子组件（Category.vue）中 -->
           <template>
               <div>
                   <!-- 给插槽的使用者传递数据 -->
                   <slot :games="games"></slot>
               </div>
           </template>
           <script>
               export default {
                   data(){
                       return {
                           games: ['红色警戒','战狼','中国医生','发财日记'] // 数据在子组件自身
                       }
                   }
               }
           </script>
           ```

            > 注意：
            >
            > 1. 具名插槽和作用域插槽混合使用，则v-slot的写法为 `v-slot:slotName="{data}"`
            > 2. 和v-on和v-bind一样，v-slot也有缩写，即把参数之前的所有内容替换为字符#。例如v-slot:header可以缩写为#header