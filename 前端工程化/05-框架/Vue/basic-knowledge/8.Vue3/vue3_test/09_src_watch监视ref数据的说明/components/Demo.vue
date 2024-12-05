<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">点我+1</button>
  <hr>
  <h2>薪资：{{person.job.j1.salary}}k</h2>
  <button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'Demo',
  setup() {
    // 数据
    let sum = ref(0)
    let person = ref({
      job: {
        j1: {
          salary: 20
        }
      }
    })

    // 写法错误，sum.value就是0，不能监视0，应该监视一个属性（去掉.value）
    /* watch(sum.value, (newValue, oldValue) => {
      console.log('sum改变了', newValue, oldValue)
    }) */

    // 点击涨薪时，监视不到salary的改变（因为由ref定义的数据默认不开启深度监视），有下面两种解决方案
    /* watch(person, (newValue, oldValue) => {
      console.log('person改变了', newValue, oldValue)
    }) */

    // 解决方案一：由于person.value是由reactive定义的数据，默认开启了深度监视，所以可以监视到
    /* watch(person.value, (newValue, oldValue) => {
      console.log('person改变了', newValue, oldValue)
    }) */

    // 解决方案二：watch函数中添加第三个参数，开启深度监视
    /* watch(person, (newValue, oldValue) => {
      console.log('person改变了', newValue, oldValue)
    }, { deep: true }) */

    return {
      sum,
      person
    }
  }
}
</script>
