<template>
  <div class="test-container">
    <Layout>
      <template #default>
        <div class="main">
          主区域，宽度占满剩余空间主区域，宽度占满剩余空间主区域，宽度占满剩余空间主区域，宽度占满剩余空间主区域，宽度占满剩余空间主区域，宽度占满剩余空间
        </div>
      </template>
      <template #left>
        <div class="left">
          左边栏区域，固定宽度
        </div>
      </template>
      <template #right>
        <div class="right">
          右边栏区域，固定宽度
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from './';

export default {
  components: {
    Layout
  }
}
</script>

<style scoped lang="less">
.test-container {
  width: 60%;
  height: 600px;
  border: 2px solid;
  margin: 0 auto;

  .left {
    width: 200px;
    height: 100%;
    background-color: #f40;
  }

  .right {
    width: 150px;
    height: 100%;
    background-color: lightblue;
  }

  .main {
    height: 100%;
    background-color: wheat;
  }
}
</style>