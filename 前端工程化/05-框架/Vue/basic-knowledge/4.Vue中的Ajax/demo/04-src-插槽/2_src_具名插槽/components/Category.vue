<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <slot>默认插槽的默认值</slot>
    <slot name="center">center插槽的默认值</slot>
    <slot name="footer">footer插槽的默认值</slot>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['title']
  }
</script>

<style scoped>
  .category {
    background-color: skyblue;
    width: 200px;
    height: 300px;
    text-align: center;
  }
  h3 {
    text-align: center;
    background-color: orange;
  }
  img, video {
    width: 100%;
  }
</style>