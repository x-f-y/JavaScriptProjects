<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>学生年龄：{{myAge+1}}</h2>
    <button @click="updateAge">尝试修改收到的年龄</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    console.log(this)
    return {
      msg: '我是一名学生',
      myAge: this.age
    }
  },
  // 简单声明接收（接收到的数据和data中的数据最终都会出现在组件实例对象上，但接收到的数据优先级更高）
  props: ["name", "sex", "age"],
  // 接收的同时对数据进行类型限制
  /*props: {
    name: String,
    sex: String,
    age: Number
  },*/
  // 接收的同时对数据进行：类型限制+必要性限制+默认值的指定
  /*props: {
    name: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      default: 99
    }
  },*/
  methods: {
    updateAge(){
      this.myAge++
    }
  }
}
</script>