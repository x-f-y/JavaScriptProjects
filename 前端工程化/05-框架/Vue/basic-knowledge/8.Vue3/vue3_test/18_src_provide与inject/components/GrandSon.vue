<template>
  <div class="grandson">
    <h3>我是GrandSon组件（孙）,{{car.name}}--{{car.price}}</h3>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'GrandSon',
  setup() {
    let car = inject('car')
    return {
      car
    }
  }
}
</script>

<style lang="css" scoped>
.grandson {
  background-color: orange;
  padding: 10px;
}
</style>