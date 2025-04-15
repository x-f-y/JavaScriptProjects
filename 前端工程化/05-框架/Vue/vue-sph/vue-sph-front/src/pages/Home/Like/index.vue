<template>
  <div class="like heart">
    <div class="title">
      <h2>猜你喜欢</h2>
      <div class="change clearfix">
        <span>换一换</span>
        <i></i>
      </div>
    </div>
    <ul class="body">
      <li>
        <div class="img">
          <img src="./images/like_02.png" alt="">
        </div>
        <div class="wrap">
          <p class="content">阳光美包新款单肩包女包时尚子母包四件套女</p>
          <span class="price">￥116.00</span>
        </div>
      </li>
      <li>
        <div class="img">
          <img src="./images/like_03.png" alt="">
        </div>
        <div class="wrap">
          <p class="content">阳光美包新款单肩包女包时尚子母包四件套女</p>
          <span class="price">￥116.00</span>
        </div>
      </li>
      <li>
        <div class="img">
          <img src="./images/like_01.png" alt="">
        </div>
        <div class="wrap">
          <p class="content">阳光美包新款单肩包女包时尚子母包四件套女</p>
          <span class="price">￥116.00</span>
        </div>
      </li>
      <li>
        <div class="img">
          <img src="./images/like_02.png" alt="">
        </div>
        <div class="wrap">
          <p class="content">阳光美包新款单肩包女包时尚子母包四件套女</p>
          <span class="price">￥116.00</span>
        </div>
      </li>
      <li>
        <div class="img">
          <img src="./images/like_03.png" alt="">
        </div>
        <div class="wrap">
          <p class="content">阳光美包新款单肩包女包时尚子母包四件套女</p>
          <span class="price">￥116.00</span>
        </div>
      </li>
      <li>
        <div class="img">
          <img src="./images/like_01.png" alt="">
        </div>
        <div class="wrap">
          <p class="content">阳光美包新款单肩包女包时尚子母包四件套女</p>
          <span class="price">￥116.00</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Like'
  }
</script>

<style scoped lang="less">
  .like {
    margin-top: 15px;
    .title {
      height: 30px;
      line-height: 30px;
      h2 {
        float: left;
        font-size: 20px;
        font-weight: bold;
      }
      .change {
        float: right;
        span {
          float: left;
          color: #666666;
        }
        i {
          float: left;
          width: 19px;
          height: 20px;
          margin-top: 5px;
          margin-left: 10px;
          background: url(~@/assets/icons.png) no-repeat -421px -106px;
        }
      }
    }
    .body {
      display: flex;
      justify-content: space-around;
      padding-bottom: 24px;
      border: 1px solid #e4e4e4;
      overflow: hidden;
      li {
        .img {
          img {
            display: block;
            width: 142px;
            height: 142px;
            margin: 0 auto;
            transition: all 0.4s;
            &:hover {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
        }
        .wrap {
          padding: 0 30px;
          .content {
            margin-top: 5px;
            margin-bottom: 9px;
          }
          .price {
            color: #df3033;
            font-size: 20px;
            font-weight: bold;
          }
        }
        &:nth-child(n+2) .wrap {
          border-left: 1px solid #e4e4e4;
        }
      }
    }
  }
</style>