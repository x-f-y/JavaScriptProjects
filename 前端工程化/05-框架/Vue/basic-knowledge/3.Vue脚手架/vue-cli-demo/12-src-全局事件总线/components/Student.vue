<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">点我把学生名发给School组件</button>
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
  },
  methods: {
    sendStudentName(){
      this.$bus.$emit('atguigu', this.name)
    }
  }
}
</script>

<style scoped>
.student {
  background-color: orange;
  padding: 5px;
  margin-top: 20px;
}
</style>