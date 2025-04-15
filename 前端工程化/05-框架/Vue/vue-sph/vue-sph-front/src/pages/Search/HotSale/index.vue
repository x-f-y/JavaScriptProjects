<template>
  <div class="hot-sale heart">
    <h3 class="title">热卖商品</h3>
    <div class="list">
      <ul class="clearfix">
        <li>
          <div class="image">
            <img src="./images/like_01.png" alt="">
          </div>
          <div class="detail">Apple苹果iPhone 6s (A1699)</div>
          <div class="price">¥4088.00</div>
          <div class="comment">已有700人评价</div>
        </li>
        <li>
          <div class="image">
            <img src="./images/like_03.png" alt="">
          </div>
          <div class="detail">金属A面，360°翻转，APP下单省300！</div>
          <div class="price">¥4088.00</div>
          <div class="comment">已有700人评价</div>
        </li>
        <li>
          <div class="image">
            <img src="./images/like_04.png" alt="">
          </div>
          <div class="detail">256SSD商务大咖，完爆职场，APP下单立减200</div>
          <div class="price">¥4088.00</div>
          <div class="comment">已有700人评价</div>
        </li>
        <li>
          <div class="image">
            <img src="./images/like_02.png" alt="">
          </div>
          <div class="detail">Apple苹果iPhone 6s (A1699)</div>
          <div class="price">¥4088.00</div>
          <div class="comment">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HotSale"
  }
</script>

<style scoped lang="less">
  .hot-sale {
    border: 1px solid #dddddd;
    .title {
      font-weight: 700;
      font-size: 14px;
      line-height: 21px;
      border-bottom: 1px solid #ddd;
      background-color: #f1f1f1;
      color: #333;
      padding: 5px 0 5px 15px;
    }
    .list {
      padding: 15px;
      ul {
        li {
          float: left;
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .image {
            img {
              width: 142px;
              height: 142px;
            }
          }
          .detail {
            line-height: 1.8;
          }
          .price {
            font-size: 18px;
            color: #c81623;
            font-weight: 700;
            margin: 8px 0;
          }
          .comment {
            font-size: 13px;
            color: #a7a7a7;
          }
        }
      }
    }
  }
</style>