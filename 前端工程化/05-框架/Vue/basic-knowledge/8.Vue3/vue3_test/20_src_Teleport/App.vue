<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Son></Son>
  </div>
</template>

<script>
import Son from './components/Son.vue'

export default {
  name: 'App',
  components: { Son }
}
</script>

<style lang="css">
.app {
  background-color: gray;
  padding: 10px;
}
</style>
