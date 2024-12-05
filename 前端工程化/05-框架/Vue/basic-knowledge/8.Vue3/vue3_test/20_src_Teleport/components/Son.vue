<template>
  <div class="son">
    <h3>我是Son组件</h3>
    <GrandSon></GrandSon>
  </div>
</template>

<script>
import GrandSon from './GrandSon.vue'

export default {
  name: 'Son',
  components: { GrandSon }
}
</script>

<style lang="css" scoped>
.son {
  background-color: skyblue;
  padding: 10px;
}
</style>