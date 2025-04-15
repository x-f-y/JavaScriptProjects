<template>
  <div class="guess-like heart">
    <h2 class="title">猜你喜欢</h2>
    <ul class="body">
      <li>
        <img src="./images/itemlike01.png" alt="">
        <p class="description">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</p>
        <div class="price">
          <em>￥</em>
          <i>3699.0</i>
        </div>
        <div class="appraise">已有6人评价</div>
      </li>
      <li>
        <img src="./images/itemlike02.png" alt="">
        <p class="description">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</p>
        <div class="price">
          <em>￥</em>
          <i>4388.0</i>
        </div>
        <div class="appraise">已有700人评价</div>
      </li>
      <li>
        <img src="./images/itemlike03.png" alt="">
        <p class="description">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</p>
        <div class="price">
          <em>￥</em>
          <i>3699.0</i>
        </div>
        <div class="appraise">已有6人评价</div>
      </li>
      <li>
        <img src="./images/itemlike04.png" alt="">
        <p class="description">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</p>
        <div class="price">
          <em>￥</em>
          <i>4388.0</i>
        </div>
        <div class="appraise">已有700人评价</div>
      </li>
      <li>
        <img src="./images/itemlike05.png" alt="">
        <p class="description">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</p>
        <div class="price">
          <em>￥</em>
          <i>3699.0</i>
        </div>
        <div class="appraise">已有6人评价</div>
      </li>
      <li>
        <img src="./images/itemlike06.png" alt="">
        <p class="description">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</p>
        <div class="price">
          <em>￥</em>
          <i>4388.0</i>
        </div>
        <div class="appraise">已有700人评价</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "GuessLike"
  }
</script>

<style scoped lang="less">
  .guess-like {
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #dddddd;
    .title {
      color: #333;
      background-color: #f1f1f1;
      font-weight: 700;
      padding: 5px 0 5px 10px;
      border-bottom: 1px solid #dddddd;
    }
    .body {
      padding: 15px 11px;
      display: flex;
      li {
        flex: 1;
        text-align: center;
        img {
          width: 167px;
          height: 123px;
        }
        p {
          text-align: left;
          margin: 0 15px;
          margin-top: 5px;
        }
        .price {
          font-size: 16px;
          color: #c81623;
          margin: 10px 0;
          em {}
          i {}
        }
        .appraise {}
      }
    }
  }
</style>