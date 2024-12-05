<template>
  <h1>一个人的信息</h1>
  <!-- 模板中不用.value -->
  <h2>姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <h3>工作种类：{{person.job.type}}</h3>
  <h3>工作薪水：{{person.job.salary}}</h3>
  <h3>爱好：{{person.hobby}}</h3>
  <button @click="changeInfo">修改信息</button>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'App',
  setup() {
    /* let name = ref('张三')
    let age = ref(18)
    let job = reactive({
      type: '前端工程师',
      salary: '30k'
    })
    let hobby = reactive(['抽烟','喝酒','烫头']) */

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
      // console.log(name, age, job)
      /* name.value = '李四'
      age.value = 20
      job.type = 'UI工程师'
      job.salary = '20k'
      hobby[0] = '学习' */

      person.name = '李四'
      person.age = 20
      person.job.type = 'UI工程师'
      person.job.salary = '20k'
      person.hobby[0] = '学习'
    }

    return {
      person,
      changeInfo
    }
  }
}
</script>
