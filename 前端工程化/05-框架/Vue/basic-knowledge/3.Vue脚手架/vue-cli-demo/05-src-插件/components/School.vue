<template>
  <div>
    <h2>学校名称：{{name | mySlice}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="test">测试一下</button>
  </div>
</template>

<script>
export default {
  name: 'School',
  data() {
    return {
      name: '尚硅谷atguigu',
      address: '北京'
    }
  },
  methods: {
    test(){
      this.demo()
    }
  }
}
</script>