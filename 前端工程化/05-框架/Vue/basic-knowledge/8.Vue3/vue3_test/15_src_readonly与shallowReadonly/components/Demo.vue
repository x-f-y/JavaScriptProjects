<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">点我sum+1</button>
  <hr>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>薪资：{{job.j1.salary}}k</h2>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, reactive, toRefs, readonly, shallowReadonly } from 'vue'

export default {
  name: 'Demo',
  setup() {
    // 数据
    let sum = ref(0)
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    // sum = readonly(sum)
    // person = readonly(person)
    sum = shallowReadonly(sum)
    person = shallowReadonly(person)

    return {
      sum,
      ...toRefs(person)
    }
  }
}
</script>

