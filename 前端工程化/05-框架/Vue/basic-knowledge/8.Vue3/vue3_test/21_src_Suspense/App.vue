<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <Son></Son>
      </template>
      <template v-slot:fallback>
        <div>稍等，加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
// import Son from './components/Son.vue' // 静态引入
import { defineAsyncComponent } from 'vue'
const Son = defineAsyncComponent(() => import('./components/Son.vue')) // 异步引入

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
