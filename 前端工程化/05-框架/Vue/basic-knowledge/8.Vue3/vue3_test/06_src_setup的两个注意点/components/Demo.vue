<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <button @click="test">测试一下触发Demo组件的hello事件</button>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Demo',
  props: ['msg'], // Vue3中若未对父组件传递过来的参数全部接收，会有警告（这里接受了msg参数，没接收school参数，先不管警告）
  emits: ['hello'], // Vue3中需要使用emits对自定义事件进行声明，否则会有警告（Vue2中不需要这么做）
  beforeCreate() {
    console.log('---beforeCreate---')
  },
  setup(props, context) {
    console.log('---setup---', this) // this是undefined
    console.log(props) // Proxy {msg: '你好啊'}
    console.log(context.attrs) // Proxy {school: 'atguigu', __vInternal: 1} 相当于Vue2中的$attrs
    console.log(context.slots) // 相当于Vue2中的$slots
    let person = reactive({
      name: '张三',
      age: 18
    })

    function test() {
      context.emit('hello', 666) // 触发自定义事件 相当于Vue2中的$emit
    }

    return {
      person,
      test
    }
  }
}
</script>
