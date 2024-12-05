<template>
  <div class="son">
    <h3>我是Son组件（子）,{{car.name}}--{{car.price}}</h3>
    <GrandSon></GrandSon>
  </div>
</template>

<script>
import { inject } from 'vue'
import GrandSon from './GrandSon.vue'

export default {
  name: 'Son',
  components: { GrandSon },
  setup() {
    const car = inject('car')
    return {
      car
    }
  }
}
</script>

<style lang="css" scoped>
.son {
  background-color: skyblue;
  padding: 10px;
}
</style>