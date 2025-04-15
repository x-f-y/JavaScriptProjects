<template>
  <div class="rank heart">
    <div class="top-tag">
      <div class="item active">
        <i></i>
        <span>热卖排行</span>
      </div>
      <div class="item">
        <i></i>
        <span>特价排行</span>
      </div>
      <div class="item">
        <i></i>
        <span>新品排行</span>
      </div>
    </div>
    <div class="main-img clearfix">
      <div class="item">
        <div class="ads-pic">
          <img src="./images/1.jpg" alt="">
        </div>
        <div class="wrap">
          <p class="info">
            <span class="discount">【官网价直降1100】</span>&nbsp;Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机
          </p>
          <span class="money">定金：￥100.00</span>
        </div>
      </div>
      <div class="item">
        <div class="ads-pic">
          <img src="./images/1.jpg" alt="">
        </div>
        <div class="wrap">
          <p class="info">
            <span class="discount">【官网价直降1100】</span>&nbsp;Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机
          </p>
          <span class="money">定金：￥100.00</span>
        </div>
      </div>
      <div class="item">
        <div class="ads-pic">
          <img src="./images/1.jpg" alt="">
        </div>
        <div class="wrap">
          <p class="info">
            <span class="discount">【官网价直降1100】</span>&nbsp;Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机
          </p>
          <span class="money">定金：￥100.00</span>
        </div>
      </div>
      <div class="item">
      <div class="ads-pic">
        <img src="./images/1.jpg" alt="">
      </div>
      <div class="wrap">
        <p class="info">
          <span class="discount">【官网价直降1100】</span>&nbsp;Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机
        </p>
        <span class="money">定金：￥100.00</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Rank'
  }
</script>

<style scoped lang="less">
  .rank {
    padding-bottom: 20px;
    .top-tag {
      width: 312px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      .item {
        color: #999999;
        i {
          display: block;
          width: 38px;
          height: 40px;
          margin: 5px 0 8px 7px;
          background: url("./images/bg0.png") no-repeat 1px 1px;
        }
        span {
          font-size: 16px;
        }
        &:first-child i {
          background-position-x: -33px;
        }
        &.active {
          color: #e60012;
        }
        &:hover {
          color: #4f4cd4;
        }
      }
    }
    .main-img {
      margin-top: 20px;
      padding: 0 12px;
      .item {
        float: left;
        width: 270px;
        height: 330px;
        margin: 0 12px;
        border: 1px solid #e1251b;
        .ads-pic {
          text-align: center;
          margin: 5px 0 18px;
          img {
            display: block;
            width: 200px;
            height: 200px;
            margin: 0 auto;
          }
        }
        .wrap {
          height: 105px;
          background-color: #fafafa;
          padding-left: 10px;
          .info {
            line-height: 28px;
            &:hover {
              color: #4f4cd4;
            }
          }
          .money {
            display: block;
            margin-top: 10px;
            color: #e12518;
            font-size: 20px;
          }
        }
      }
    }
  }
</style>