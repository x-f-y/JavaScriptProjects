# 笔记

## vuex
### 1. 概念
在Vue中实现集中式状态（数据）管理的一个Vue插件，对Vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信
### 2. 何时使用
多个组件需要共享数据时
### 3. 搭建vuex环境
1. 安装vuex --> npm i vuex@3
注意：vue2中应该使用vuex3，vue3中应该使用vuex4
2. 创建文件：src/store/index.js
```js
import Vue from 'vue'
import Vuex from 'vuex'
// 应用vuex插件（完成此操作后，就可以在new Vue时传入一个store配置项，值应该是自己定义的store）
Vue.use(Vuex) // 注意：必须在创建store实例之前调用Vue.use(Vuex)
export default new Vuex.Store({
    actions: {}, // 响应组件中用户的动作
    mutations: {}, // 修改state中的数据
    state: {} // 保存具体的数据
})
```
3. 在main.js中创建vm时传入store配置项（完成此操作后，所有vm和vc上就都有$store了）
```js
import store from './store'
new Vue({
    store
})
```
### 4. 基本使用
1. 初始化数据、配置actions、mutations、state
```js
const actions = {
    jia(context,value){
        context.commit('JIA',value)
    }
}
const mutations = {
    JIA(state,value){
        state.num += value
    }
}
const state = {
    num: 0
}
```
2. 组件中读取vuex中的数据：`$store.state.num`
3. 组件中修改vuex中的数据：`$store.dispatch('actions中的方法名','数据')`或`$store.commit('mutations中的方法名','数据')`
4. 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写dispatch，直接编写commit
5. 备注：为了区分actions和mutations中的方法，actions中的方法名通常小写，mutations中的方法名通常大写
6. 备注：actions中若业务逻辑复杂，也可以使用`context.dispatch('actions中的方法名','数据')`
### 5. getters的使用
1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工
2. 在store/index.js中追加getters配置
```js
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}
export default new Vuex.Store({
    getters
})
```
3. 组件中读取数据：`$store.getters.bigSum`
### 6. 四个map方法的使用
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
1. mapState方法：用于帮助我们映射state中的数据为计算属性
```
computed: {
    ...mapState({he: 'sum', xuexiao: 'school', xueke: 'subject'}) // 对象写法
    ...mapState(['sum','school','subject']) // 数组写法
}
```
2. mapGetters方法：用于帮助我们映射getters中的数据为计算属性
```
computed: {
    ...mapGetters({dahe: 'bigSum'}) // 对象写法
    ...mapGetters(['bigSum']) // 数组写法
}
```
3. mapActions方法：用于帮助我们生成与actions对话的方法，即包含`$store.dispatch(xxx)`的函数
```
methods: {
    ...mapActions({incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'}) // 对象写法
    ...mapActions(['jiaOdd', 'jiaWait']) // 数组写法
}
```
4. mapMutations方法：用于帮助我们生成与mutations对话的方法，即包含`$store.commit(xxx)`的函数
```
methods: {
    ...mapMutations({increment: 'JIA', decrement: 'JIAN'}) // 对象写法
    ...mapMutations(['JIA', 'JIAN']) // 数组写法
}
```
5. 备注：mapActions与mapMutations使用时，若需要传递参数，则应该在模板中绑定事件的时候就传递好参数，否则参数是事件对象
### 7. 模块化+命名空间
1. 目的：让代码更好维护，让多种数据分类更加明确
2. 修改store/index.js
```js
const countAbout = {
    namespaced: true, // 开启命名空间
    actions: {},
    mutations: {},
    state: {},
    getters: {}
}
const personAbout = {
    namespaced: true, // 开启命名空间
    actions: {},
    mutations: {},
    state: {},
    getters: {}
}
const store = new Vuex.Store({
    modules: {
        countAbout,
        personAbout
    }
})
```
3. 开启命名空间后，组件中调用dispatch
```
// 方式一：自己直接dispatch
this.$store.dispatch('personAbout/xxx',xxx)
// 方式二：借助mapActions(第二个参数也可以是对象形式)
...mapActions('personAbout', ['xxx'])
```
4. 开启命名空间后，组件中调用commit
```
// 方式一：自己直接commit
this.$store.commit('countAbout/xxx',xxx)
// 方式二：借助mapMutations(第二个参数也可以是对象形式)
...mapMutations('countAbout', ['xxx'])
```
5. 开启命名空间后，组件中直接读取state数据
```
// 方式一：自己直接读取
this.$store.state.personAbout.xxx
// 方式二：借助mapState(第二个参数也可以是对象形式)
...mapState('personAbout', ['xxx'])
```
6. 开启命名空间后，组件中直接读取getters数据
```
// 方式一：自己直接读取
this.$store.getters['countAbout/xxx']
// 方式二：借助mapGetters(第二个参数也可以是对象形式)
...mapGetters('countAbout', ['xxx'])
```