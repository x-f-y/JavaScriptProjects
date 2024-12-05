<template>
  <h2>x.y的值为：{{x.y}}</h2>
  <button @click="x.y++">点我x.y+1</button>
  <hr>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>薪资：{{job.j1.salary}}k</h2>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, reactive, toRefs, shallowRef, shallowReactive } from 'vue'

export default {
  name: 'Demo',
  setup() {
    // 数据
    // let x = ref({
    let x = shallowRef({
      y: 0
    })
    // let person = reactive({
    let person = shallowReactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    return {
      x,
      ...toRefs(person)
    }
  }
}
</script>

