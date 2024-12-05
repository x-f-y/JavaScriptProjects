<template>
  <div class="app">
    <h2>{{msg}}，学生姓名为:{{studentName}}</h2>
    <School :getSchoolName="getSchoolName"/>
    <!-- <Student @atguigu="getStudentName" @demo="m1" @click.native="show"/> -->
    <!-- <Student @atguigu.once="getStudentName"/> -->
    <Student ref="stu"/>
  </div>
</template>

<script>
import Student from './components/Student.vue'
import School from './components/School.vue'
export default {
  name: 'App',
  components: {
    Student,
    School
  },
  data() {
    return {
      msg: '你好啊！',
      studentName: ''
    }
  },
  methods: {
    getSchoolName(name){
      console.log('App组件收到了学校名：', name)
    },
    getStudentName(name){
      console.log('App组件收到了学生名：', name)
      this.studentName = name
    },
    m1(){
      console.log('demo事件被触发了')
    },
    show(){
      alert('123')
    }
  },
  mounted(){
    this.$refs.stu.$on('atguigu', this.getStudentName)
    // this.$refs.stu.$once('atguigu', this.getStudentName)
  }
}
</script>

<style>
.app {
  background-color: gray;
  padding: 5px;
}
</style>