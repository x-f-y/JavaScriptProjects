<template>
  <!-- 组件的结构（template模板必须且只能有一个根节点） -->
  <div>
    <h2 class="demo">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="showInfo">点我显示学校名称</button>
  </div>
</template>

<script>
  // 组件交互相关的代码（数据、方法等）（默认暴露）
  export default {
      name: 'School',
      data() {
          return {
              name: '尚硅谷',
              address: '北京'
          }
      },
      methods: {
          showInfo() {
              alert(this.name)
          }
      },
  }
</script>

<style>
  /* 组件的样式 */
  .demo {
      background-color: skyblue;
  }
</style>