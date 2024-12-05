<template>
  <div>
    <h3>welcome</h3>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
    // 解决bug：用户直接在浏览器上输入路径或者直接点击浏览器的回退和前进按钮，但是左侧二级菜单激活选中状态不变
    beforeRouteEnter(to, from, next){
      next(vc => {
        sessionStorage.setItem('activePath', '')
        vc.$store.dispatch('saveNavStatus', '')
      })
    }
  }
</script>

<style lang="less" scoped>

</style>