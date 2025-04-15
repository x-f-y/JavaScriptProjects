<template>
  <div class="product-detail heart">
    <div class="aside">
      <div class="header" @click="chooseAsidePanel">
        <span data-index="1" :class="{active: selectedAsidePanel === 1}">相关分类</span>
        <span data-index="2" :class="{active: selectedAsidePanel === 2}">推荐品牌</span>
      </div>
      <div v-show="selectedAsidePanel === 1" class="info1">
        <ul class="categoryList">
          <li>手机</li>
          <li>手机壳</li>
          <li>内存卡</li>
          <li>iPhone配件</li>
          <li>贴膜</li>
          <li>手机耳机</li>
          <li>移动电源</li>
          <li>平板电脑</li>
        </ul>
        <ul class="detailList">
          <li>
            <img src="./images/part01.png" alt="">
            <h4>Apple苹果iPhone 6s (A1699) </h4>
            <div class="price">
              <em>￥</em>
              <i>6088.00</i>
            </div>
            <button>加入购物车</button>
          </li>
          <li>
            <img src="./images/part02.png" alt="">
            <h4>Apple苹果iPhone 6s (A1699) </h4>
            <div class="price">
              <em>￥</em>
              <i>6088.00</i>
            </div>
            <button>加入购物车</button>
          </li>
          <li>
            <img src="./images/part03.png" alt="">
            <h4>Apple苹果iPhone 6s (A1699) </h4>
            <div class="price">
              <em>￥</em>
              <i>6088.00</i>
            </div>
            <button>加入购物车</button>
          </li>
        </ul>
      </div>
      <div v-show="selectedAsidePanel === 2" class="info2">推荐品牌</div>
    </div>
    <div class="detail">
      <div class="choose-match">
        <div class="title">选择搭配</div>
        <div class="body clearfix">
          <div class="master">
            <img src="./images/l-m01.png" alt="">
            <span>￥10598</span>
            <i>+</i>
          </div>
          <ul class="suits">
            <li>
              <img src="./images/dp01.png" alt="">
              <span class="good-name">Feless费勒斯VR</span>
              <label>
                <input type="checkbox" checked name="" value="">
                <span class="good-price">39</span>
              </label>
            </li>
            <li>
              <img src="./images/dp02.png" alt="">
              <span class="good-name">Feless费勒斯VR</span>
              <label>
                <input type="checkbox" name="" value="">
                <span class="good-price">50</span>
              </label>
            </li>
            <li>
              <img src="./images/dp03.png" alt="">
              <span class="good-name">Feless费勒斯VR</span>
              <label>
                <input type="checkbox" name="" value="">
                <span class="good-price">59</span>
              </label>
            </li>
            <li>
              <img src="./images/dp04.png" alt="">
              <span class="good-name">Feless费勒斯VR</span>
              <label>
                <input type="checkbox" name="" value="">
                <span class="good-price">99</span>
              </label>
            </li>
          </ul>
          <div class="result">
            <div class="num">已选购0件商品</div>
            <div class="price-tit">套餐价</div>
            <div class="price">￥10845</div>
            <button>加入购物车</button>
          </div>
        </div>
      </div>
      <div class="detail-info">
        <ul class="title clearfix" @click="chooseMainPanel">
          <li data-index="1" :class="{active: selectedMainPanel === 1}">商品介绍</li>
          <li data-index="2" :class="{active: selectedMainPanel === 2}">规格与包装</li>
          <li data-index="3" :class="{active: selectedMainPanel === 3}">售后保障</li>
          <li data-index="4" :class="{active: selectedMainPanel === 4}">商品评价</li>
          <li data-index="5" :class="{active: selectedMainPanel === 5}">手机社区</li>
        </ul>
        <div class="info1" v-show="selectedMainPanel === 1">
          <ul class="params">
            <li>分辨率：1920*1080(FHD)</li>
            <li>后置摄像头：1200万像素</li>
            <li>前置摄像头：500万像素</li>
            <li>核 数：其他</li>
            <li>频 率：以官网信息为准</li>
            <li>品牌： Apple</li>
            <li>商品名称：APPLEiPhone 6s Plus</li>
            <li>商品编号：1861098</li>
            <li>商品毛重：0.51kg</li>
            <li>商品产地：中国大陆</li>
            <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
            <li>系统：苹果（IOS）</li>
            <li>像素：1000-1600万</li>
            <li>机身内存：64GB</li>
          </ul>
          <div class="saleImgList">
            <img src="./images/intro01.png" alt="">
            <img src="./images/intro02.png" alt="">
            <img src="./images/intro03.png" alt="">
          </div>
        </div>
        <div class="info2" v-show="selectedMainPanel === 2">规格与包装</div>
        <div class="info3" v-show="selectedMainPanel === 3">售后保障</div>
        <div class="info4" v-show="selectedMainPanel === 4">商品评价</div>
        <div class="info5" v-show="selectedMainPanel === 5">手机社区</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProductDetail",
    data(){
      return {
        selectedAsidePanel: 1, // 1表示相关分类，2表示推荐品牌
        selectedMainPanel: 1 // 1表示商品介绍，2表示规格与包装，3表示售后保障，4表示商品评价，5表示手机社区
      }
    },
    methods: {
      chooseAsidePanel(e){
        const index = e.target.dataset.index;
        if(index){
          this.selectedAsidePanel = Number(index);
        }
      },
      chooseMainPanel(e){
        const index = e.target.dataset.index;
        if(index){
          this.selectedMainPanel = Number(index);
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .product-detail {
    overflow: hidden;
    margin-top: 30px;
    .aside {
      float: left;
      width: 210px;
      border: 1px solid #cccccc;
      .header {
        display: flex;
        height: 40px;
        border-bottom: 1px solid #cccccc;
        span {
          flex: 1;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          &.active {
            font-weight: bold;
            border-top: 3px solid #e1251b;
          }
        }
      }
      .info1 {
        .categoryList {
          display: grid;
          grid-template-rows: repeat(4, 30px);
          grid-template-columns: 1fr 1fr;
          column-gap: 20px;
          padding: 10px 15px;
          text-align: center;
          line-height: 30px;
          li {
            border-bottom: 1px dashed #ededed;
          }
        }
        .detailList {
          padding: 0 15px 30px;
          li {
            margin-top: 15px;
            padding-top: 5px;
            &:nth-of-type(n+2) {
              border-top: 1px solid #ededed;
            }
            img {
              display: block;
              width: 100%;
            }
            h4 {
              margin-top: 10px;
            }
            .price {
              text-align: center;
              font-size: 16px;
              color: #c81623;
              margin: 8px 0;
            }
            button {
              display: block;
              width: 90px;
              height: 24px;
              text-align: center;
              line-height: 22px;
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              background-color: transparent;
              margin: 5px auto;
            }
          }
        }
      }
    }
    .detail {
      float: right;
      width: 980px;
      .choose-match {
        border: 1px solid #dddddd;
        .title {
          height: 27px;
          background-color: #f1f1f1;
          padding-left: 15px;
          line-height: 26px;
          color: #333333;
          font-weight: bold;
          border-bottom: 1px solid #dddddd;
        }
        .body {
          height: 180px;
          padding: 10px 0;
          .master {
            position: relative;
            float: left;
            width: 127px;
            height: 100%;
            text-align: center;
            img {
              width: 87px;
              height: 128px;
            }
            span {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }
            i {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: -20px;
            }
          }
          .suits {
            float: left;
            width: 668px;
            height: 100%;
            display: flex;
            li {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                flex-basis: 130px;
              }
              .good-name {
                font-size: 12px;
              }
              label {
                input[type="checkbox"] {
                  width: 1em;
                  height: 1em;
                  vertical-align: -0.15em;
                }
              }
            }
          }
          .result {
            float: left;
            height: 100%;
            border-left: 1px solid #dddddd;
            padding-left: 25px;
            .num {
              font-size: 14px;
              margin: 13px 0;
            }
            .price-tit {
              font-weight: bold;
            }
            .price {
              font-size: 16px;
              color: #B1191A;
              margin: 10px 0;
            }
            button {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
            }
          }
        }
      }
      .detail-info {
        margin-top: 15px;
        .title {
          background-color: #ededed;
          li {
            cursor: pointer;
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
            float: left;
            padding: 0 11px;
            line-height: 40px;
            &.active {
              background-color: #e1251b;
              color: #fff;
            }
            &:first-child {
              border-left: 1px solid #dddddd;
            }
          }
        }
        .info1 {
          .params {
            padding-left: 10px;
            li {
              margin: 8px 0;
            }
          }
          .saleImgList {
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>