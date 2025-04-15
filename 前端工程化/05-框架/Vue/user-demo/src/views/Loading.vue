<template>
  <h1>正在登录中...</h1>
</template>

<script>
export default {
  /* watch: {
    // 注意：监听器只能接受简单的以点(.)分隔的属性，下面的属性包含"["、"]"和"/"特殊字符，无法识别
    // 解决方式：使用this.$watch()进行监听，第一个参数写成函数
    "$store.getters['loginUser/status']"(){
      console.log(1);
    }
  } */
 created(){
  this.unWatch = this.$watch(() => this.$store.getters['loginUser/status'], (status) => {
    if(status !== 'loading'){
      const path = this.$route.query.returnUrl ?? '/'; // 目标页路径
      this.$router.push(path).catch(() => {});
    }
  });
 },
 destroyed(){
  // vm.$watch返回一个取消监听函数，调用该函数即可取消监听
  this.unWatch();
 }
}
</script>