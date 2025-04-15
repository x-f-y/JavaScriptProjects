<template>
  <ul class="brand heart clearfix">
    <li><img src="./images/brand_21.png" alt=""></li>
    <li><img src="./images/brand_03.png" alt=""></li>
    <li><img src="./images/brand_05.png" alt=""></li>
    <li><img src="./images/brand_07.png" alt=""></li>
    <li><img src="./images/brand_09.png" alt=""></li>
    <li><img src="./images/brand_11.png" alt=""></li>
    <li><img src="./images/brand_13.png" alt=""></li>
    <li><img src="./images/brand_15.png" alt=""></li>
    <li><img src="./images/brand_17.png" alt=""></li>
    <li><img src="./images/brand_19.png" alt=""></li>
  </ul>
</template>

<script>
  export default {
    name: 'Brand'
  }
</script>

<style scoped lang="less">
  .brand {
    margin: 10px auto;
    padding: 15px 0;
    display: flex;
    background-color: #f7f7f7;
    li {
      flex: 1;
      float: left;
      img {
        display: block;
        width: 115px;
        height: 37px;
        margin: 0 auto;
      }
      &:nth-child(n+2) {
        border-left: 1px dotted #ccc;
      }
    }
  }
</style>