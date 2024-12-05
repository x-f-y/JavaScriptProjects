<template>
  <div class="app">
    <h3>我是App组件（祖）,{{name}}--{{price}}</h3>
    <Son></Son>
  </div>
</template>

<script>
import { provide, reactive, toRefs } from 'vue'
import Son from './components/Son.vue'

export default {
  name: 'App',
  components: { Son },
  setup() {
    let car = reactive({
      name: '奔驰',
      price: '40w'
    })
    provide('car', car) // 给自己的后代组件传递数据
    return {
      ...toRefs(car)
    }
  }
}
</script>

<style lang="css">
.app {
  background-color: gray;
  padding: 10px;
}
</style>
