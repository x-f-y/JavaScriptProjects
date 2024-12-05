<template>
  <h1>一个人的信息</h1>
  <!-- 模板中不用.value -->
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h3>工作种类：{{job.type}}</h3>
  <h3>工作薪水：{{job.salary}}</h3>
  <button @click="changeInfo">修改信息</button>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    let name = ref('张三')
    let age = ref(18)
    let job = ref({
      type: '前端工程师',
      salary: '30k'
    })

    function changeInfo() {
      // console.log(name, age, job)
      name.value = '李四'
      age.value = 20
      job.value.type = 'UI工程师'
      job.value.salary = '20k'
    }

    return {
      name,
      age,
      job,
      changeInfo
    }
  }
}
</script>
