<template>
  <div class="son">
    <h3>我是Son组件</h3>
    {{sum}}
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Son',
  async setup() {
    let sum = ref(0)
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ sum })
      }, 1000);
    })
    return await p
  }
}
</script>

<style lang="css" scoped>
.son {
  background-color: skyblue;
  padding: 10px;
}
</style>