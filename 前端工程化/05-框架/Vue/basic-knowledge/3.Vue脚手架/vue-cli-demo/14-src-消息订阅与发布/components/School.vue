<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="$destroy()">点我销毁School组件</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: 'School',
  data() {
    return {
      name: '尚硅谷',
      address: '北京'
    }
  },
  mounted() {
    this.pubId = pubsub.subscribe('hello', (msgName, data) => {
      console.log('School组件收到了数据：' + data)
    })
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId)
  }
}
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>