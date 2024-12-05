<template>
  <div>
    <!-- <v + tab 快速创建vue单文件组件模板 -->
    <h2>学生姓名：{{ name }}</h2>
    <h2 class="demo">学生年龄：{{ age }}</h2>
  </div>
</template>

<script>
  export default {
      name: "Student",
      data() {
          return {
              name: "张三",
              age: 18,
          };
      },
  };
</script>

<style>
  .demo {
      background-color: pink;
  }
</style>