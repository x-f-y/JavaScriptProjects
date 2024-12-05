<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDom" ref="btn">点我输出DOM元素</button>
    <School ref="sch" />
  </div>
</template>

<script>
import School from './components/School.vue'
export default {
  name: 'App',
  components: {
    School
  },
  data() {
    return {
      msg: '欢迎学习Vue'
    }
  },
  methods: {
    showDom() {
      console.log(this.$refs.title) // h1 DOM元素
      console.log(this.$refs.btn) // button DOM元素
      console.log(this.$refs.sch) // School组件实例对象（vc）
    }
  },
}
</script>