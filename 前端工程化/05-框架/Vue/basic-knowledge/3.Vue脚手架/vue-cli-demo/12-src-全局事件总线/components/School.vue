<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="$destroy()">点我销毁School组件</button>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      name: '尚硅谷',
      address: '北京'
    }
  },
  mounted() {
    this.$bus.$on('atguigu', (name) => {
      console.log('我是School组件，我收到了数据：', name)
    })
  },
  beforeDestroy() {
    this.$bus.$off('atguigu')
  }
}
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>