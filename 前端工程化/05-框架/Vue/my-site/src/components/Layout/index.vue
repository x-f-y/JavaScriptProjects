<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot name="default"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    flex-shrink: 0;
    overflow: hidden;
  }

  .right {
    flex-shrink: 0;
    overflow: hidden;
  }

  .main {
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>