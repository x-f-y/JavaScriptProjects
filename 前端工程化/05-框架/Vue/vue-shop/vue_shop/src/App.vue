<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
    min-width: 1366px;
  }
  .el-cascader-panel {
    height: 250px;
  }
</style>
