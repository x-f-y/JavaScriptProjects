<template>
  <h1>一个人的信息</h1>
  姓：<input type="text" v-model="person.firstName">
  <br>
  名：<input type="text" v-model="person.lastName">
  <br>
  <span>全名：{{person.fullName}}</span>
  <br>
  全名：<input type="text" v-model="person.fullName">
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  name: 'Demo',
  // 这样写也可以奏效，但这是Vue2的写法，在Vue3中不建议这样使用
  /* computed: {
    fullName() {
      return this.person.firstName + '-' + this.person.lastName
    }
  }, */
  setup() {
    // 数据
    let person = reactive({
      firstName: '张',
      lastName: '三'
    })

    // 计算属性——简写（没有考虑计算属性被修改的情况）
    /* person.fullName = computed(() => {
      return person.firstName + '-' + person.lastName
    }) */
    // 计算属性——完整写法（考虑了读和写的情况）
    person.fullName = computed({
      get() {
        return person.firstName + '-' + person.lastName
      },
      set(value) {
        const arr = value.split('-')
        person.firstName = arr[0]
        person.lastName = arr[1]
      }
    })

    return {
      person
    }
  }
}
</script>
