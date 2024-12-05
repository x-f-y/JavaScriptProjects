<template>
  <h3>我是App组件</h3>
</template>

<script>
import { ref, reactive, readonly, isRef, isReactive, isReadonly, isProxy } from 'vue'

export default {
  name: 'App',
  setup() {
    let car = reactive({
      name: '奔驰',
      price: '40w'
    })
    let sum = ref(0)
    let car2 = readonly(car)

    console.log(isRef(sum)) // true
    console.log(isReactive(car)); // true
    console.log(isReadonly(car2)); // true
    console.log(isProxy(car)) // true
    console.log(isProxy(car2)); // true
    console.log(isProxy(sum)); // false
  }
}
</script>
