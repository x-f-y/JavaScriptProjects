<template>
  <h2>当前求和为：{{sum}}</h2>
  <button @click="sum++">点我+1</button>
  <h2>当前鼠标点击的坐标为：({{point.x}},{{point.y}})</h2>
</template>

<script>
import { ref } from 'vue' 
import usePoint from '../hooks/usePoint'

export default {
  name: 'Demo',
  setup() {
    let sum = ref(0)
    // console.log(usePoint)
    let point = usePoint()
    return {
      sum,
      point
    }
  }
}
</script>
