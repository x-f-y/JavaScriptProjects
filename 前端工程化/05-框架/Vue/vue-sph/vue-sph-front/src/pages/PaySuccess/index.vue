<template>
  <div class="pay-success heart">
    <div class="title">
      <img src="./images/right.png" alt="">
      <h3>恭喜您，支付成功啦！</h3>
    </div>
    <div class="a-wrap">
      <router-link to="/myOrder" class="check-order">查看订单</router-link>
      <router-link to="/home" class="continue-shopping">继续购物</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PaySuccess'
  }
</script>

<style lang="less" scoped>
  .pay-success {
    margin: 20px auto;
    border: 1px solid #d3d3d3;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    .title {
      display: flex;
      align-items: center;
      gap: 20px;
      img {
        width: 48px;
        height: 48px;
      }
      h3 {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .a-wrap {
      display: flex;
      gap: 20px;
      a {
        border-radius: 2px;
        padding: 4px 20px;
        font-size: 18px;
        text-decoration: none;
      }
      .check-order {
        background-color: #e1251b;
        color: #fff;
      }
      .continue-shopping {
        color: #666;
        background-color: #eee;
        border: 1px solid #e1e1e1;
      }
    }
  }
</style>