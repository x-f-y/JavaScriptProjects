<template>
  <h2>{{person}}</h2>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <!-- <h2>薪资：{{salary}}k</h2> -->
  <h2>薪资：{{job.j1.salary}}k</h2>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <!-- <button @click="salary++">涨薪</button> -->
  <button @click="job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, reactive, toRef, toRefs } from 'vue'

export default {
  name: 'Demo',
  setup() {
    // 数据
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    return {
      person,

      // 这种写法是错误的
      /* name: ref(person.name),
      age: ref(person.age),
      salary: ref(person.job.j1.salary) */

      /* name: toRef(person, 'name'),
      age: toRef(person, 'age'),
      salary: toRef(person.job.j1, 'salary') */

      ...toRefs(person)
    }
  }
}
</script>

