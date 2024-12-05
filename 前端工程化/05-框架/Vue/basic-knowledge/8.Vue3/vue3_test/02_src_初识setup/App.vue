<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>性别：{{sex}}</h2>
  <!-- 这里a为200 -->
  <h2>a的值为：{{a}}</h2>
  <button @click="sayHello">说话(vue3所配置的——sayHello)</button><br><br>
  <button @click="sayWelcome">说话(vue2所配置的——sayWelcome)</button><br><br>
  <button @click="test1">测试一下在vue2的配置中读取vue3的数据、方法</button><br><br>
  <button @click="test2">测试一下在vue3的setup配置中读取vue2的数据、方法</button><br><br>
</template>

<script>
import { h } from 'vue'

export default {
  name: 'App',
  data() {
    return {
      sex: '男',
      a: 100
    }
  },
  methods: {
    sayWelcome() {
      alert('欢迎来到尚硅谷学习！')
    },
    test1() {
      console.log(this.name) // 奏效 张三
      console.log(this.age) // 奏效 18
      console.log(this.sayHello) // 奏效 f sayHello(){...}
    }
  },
  // 此处只是测试一下setup，暂时不考虑响应式的问题
  setup() {
    // 数据
    let name = '张三'
    let age = 18
    let a = 200

    // 方法
    function sayHello() {
      alert(`我叫${name}，我${age}岁了，你好啊`)
    }
    function test2() {
      console.log(this.sex) // 失效 undefined
      console.log(this.sayWelcome) // 失效 undefined
    }

    // 返回一个对象（常用）
    return {
      name,
      age,
      a,
      sayHello,
      test2
    }

    // 返回一个渲染函数（了解）
    // return () => h('h1','尚硅谷')
  }
}
</script>
