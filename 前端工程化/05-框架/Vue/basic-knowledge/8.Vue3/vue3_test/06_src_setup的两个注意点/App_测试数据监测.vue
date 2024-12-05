<template>
  <h1>一个人的信息</h1>
  <h2 v-show="person.name">姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <h2 v-show="person.sex">性别：{{person.sex}}</h2>
  <h3>工作种类：{{person.job.type}}</h3>
  <h3>工作薪水：{{person.job.salary}}</h3>
  <h3>爱好：{{person.hobby}}</h3>
  <button @click="changeInfo">修改信息</button>
  <button @click="addSex">添加一个sex属性</button>
  <button @click="deleteName">删除一个name属性</button>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'App',
  setup() {
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        type: '前端工程师',
        salary: '30k'
      },
      hobby: ['抽烟', '喝酒', '烫头']
    })

    function changeInfo() {
      person.name = '李四'
      person.age = 20
      person.job.type = 'UI工程师'
      person.job.salary = '20k'
      person.hobby[0] = '学习' // Vue3中这样写可以奏效(Vue2.x中这样写不奏效)
    }
    function addSex() {
      person.sex = '男' // Vue3中这样写可以奏效(Vue2.x中这样写不奏效)
    }
    function deleteName() {
      delete person.name // Vue3中这样写可以奏效(Vue2.x中这样写不奏效)
    }

    return {
      person,
      changeInfo,
      addSex,
      deleteName
    }
  }
}
</script>
