<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">点我+1</button>
  <hr>
  <h2>年龄：{{person.age}}</h2>
  <h2>薪资：{{person.job.j1.salary}}k</h2>
  <button @click="person.age++">增长年龄</button>
  <button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, watch, reactive, watchEffect } from 'vue'

export default {
  name: 'Demo',
  setup() {
    // 数据
    let sum = ref(0)
    let person = reactive({
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    watch(sum, (newValue, oldValue) => {
      console.log('sum改变了', newValue, oldValue)
    }, { immediate: true })

    watchEffect(() => {
      // 回调函数用到了哪些属性，就监视这些属性，回调函数没有参数，且一上来就会执行一次
      const x1 = sum.value
      const x2 = person.job.j1.salary
      console.log('watchEffect函数中的回调执行了')
    })

    return {
      sum,
      person
    }
  }
}
</script>
