<template>
  <div class="grandson">
    <h3>我是GrandSon组件</h3>
    <Dialog></Dialog>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'

export default {
  name: 'GrandSon',
  components: { Dialog }
}
</script>

<style lang="css" scoped>
.grandson {
  background-color: orange;
  padding: 10px;
}
</style>