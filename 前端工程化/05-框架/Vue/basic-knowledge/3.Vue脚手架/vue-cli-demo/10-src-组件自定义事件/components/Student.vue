<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给App组件</button>
    <button @click="unbind">解绑atguigu事件</button>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      name: '张三',
      sex: '男',
    }
  },
  methods: {
    sendStudentName(){
      this.$emit('atguigu', this.name)
      // this.$emit('demo')
      // this.$emit('click')
    },
    unbind(){
      this.$off('atguigu')
      // this.$off(['atguigu', 'demo'])
      // this.$off()
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