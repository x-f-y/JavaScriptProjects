<template>
  <div class="demo">
    <h2 class="title">学生姓名：{{name}}</h2>
    <h2 class="atguigu">学生性别：{{sex}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      name: '张三',
      sex: '男'
    }
  }
}
</script>
<style scoped lang="less">
.demo {
  background-color: orange;
  .atguigu{
    font-size: 50px;
  }
}
</style>