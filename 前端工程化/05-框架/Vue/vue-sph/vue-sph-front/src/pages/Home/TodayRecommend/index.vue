<template>
  <div class="today-recommend heart">
    <div class="left">
      <img src="./images/clock.png" alt="">
      <p>今日推荐</p>
    </div>
    <ul class="right clearfix">
      <li><img src="./images/today01.png" alt=""></li>
      <li><img src="./images/today02.png" alt=""></li>
      <li><img src="./images/today03.png" alt=""></li>
      <li><img src="./images/today04.png" alt=""></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TodayRecommend'
  }
</script>

<style scoped lang="less">
  .today-recommend {
    height: 165px;
    margin-top: 10px;
    margin-bottom: 10px;
    .left {
      float: left;
      width: 200px;
      height: 100%;
      padding: 30px 0;
      background-color: #5c5251;
      text-align: center;
      p {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
        margin-top: 9px;
      }
    }
    .right {
      float: right;
      li {
        float: left;
        width: 250px;
        height: 165px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>