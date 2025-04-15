<template>
  <div class="trade heart">
    <h3>填写并核对订单信息</h3>
    <div class="main">
      <!-- 收件人信息 -->
      <div class="recipient-info">
        <div class="title">收件人信息</div>
        <div class="body">
          <div class="item" :class="{default: item.isDefault === '1'}" v-for="(item, index) in userAddressList" :key="item.id">
            <div @click="changeRecipient(index)" class="name" :class="{active: recipientIndex === index}">{{ item.consignee }}</div>
            <div class="address">{{ item.fullAddress }}</div>
            <div class="phone">{{ item.phoneNum }}</div>
          </div>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="pay-method">
        <div class="title">支付方式</div>
        <div class="body" @click="changePayment">
          <div class="item" data-index="0" :class="{active: paymentIndex === 0}">在线支付</div>
          <div class="item" data-index="1" :class="{active: paymentIndex === 1}">货到付款</div>
        </div>
      </div>
      <!-- 送货清单 -->
      <div class="delivery-list">
        <div class="title">送货清单</div>
        <div class="body">
          <div class="delivery-method">
            <h4>配送方式</h4>
            <div class="content">
              <div class="express-type">天天快递</div>
              <div>配送时间：预计8月10日（周三）09:00-15:00送达</div>
            </div>
          </div>
          <div class="goods-list">
            <h4>商品清单</h4>
            <div class="content">
              <div class="item" v-for="item in detailArrayList" :key="item.skuId">
                <img :src="item.imgUrl" alt="">
                <div class="good-name">
                  <p>{{ item.skuName }}</p>
                  <p class="freight-insurance">7天无理由退货</p>
                </div>
                <span class="good-price">￥<strong>{{ item.orderPrice }}</strong></span>
                <span class="good-num">X<strong>{{ item.skuNum }}</strong></span>
                <span>有货</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 买家留言 -->
      <div class="buyer-message">
        <div class="title">买家留言</div>
        <div class="body">
          <textarea placeholder="建议留言前先与商家沟通确认" v-model.trim.lazy="message"></textarea>
        </div>
      </div>
      <!-- 发票信息 -->
      <div class="bill-info">
        <div class="title">发票信息</div>
        <div class="body">普通发票（电子）&nbsp;个人&nbsp;明细</div>
      </div>
      <!-- 使用优惠/抵用 -->
      <div class="use-discount">
        <div class="title">使用优惠/抵用</div>
        <div class="body">暂无可用优惠券</div>
      </div>
    </div>
    <div class="total clearfix">
      <div class="wrap">
        <p>
          <span>共&nbsp;<strong class="bold">{{ totalGoodNum }}</strong>&nbsp;件商品，总商品金额：</span>
          <span class="bold">￥<strong>{{ totalGoodPrice }}</strong></span>
        </p>
        <p>
          <span>返现：</span>
          <span class="bold">￥<strong>0.00</strong></span>
        </p>
        <p>
          <span>运费：</span>
          <span class="bold">￥<strong>0.00</strong></span>
        </p>
      </div>
    </div>
    <div class="money">
      <p class="price">应付金额：<span>￥<strong>{{ totalGoodPrice }}</strong></span></p>
      <p class="recipient">
        <span>寄送至: {{ this.currentRecipient.fullAddress }}</span>
        <span>收货人：{{this.currentRecipient.consignee}}&nbsp;{{  this.currentRecipient.phoneNum }}</span>
      </p>
    </div>
    <div class="submit clearfix">
      <button @click="submitOrder" type="button">提交订单</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'Trade',
    computed: {
      ...mapGetters('trade', ['userAddressList', 'detailArrayList']),
      currentRecipient(){ // 当前收件人
        return this.userAddressList[this.recipientIndex] || {};
      },
      totalGoodNum(){ // 商品总数量
        return this.detailArrayList.reduce((pre, cur) => pre + cur.skuNum, 0);
      },
      totalGoodPrice(){ // 商品总价格
        return this.$store.state.trade.tradeInfo.totalAmount;
      }
    },
    data(){
      return {
        recipientIndex: 0, // 选中的收件人信息的索引
        paymentIndex: 0, // 选中的支付方式的索引
        message: "", // 买家留言信息
      }
    },
    methods: {
      // 切换收件人信息
      changeRecipient(index){
        this.recipientIndex = index;
      },
      // 切换支付方式
      changePayment(e){
        const index = e.target.dataset.index;
        if(index){
          this.paymentIndex = Number(index);
        }
      },
      // 提交订单
      submitOrder(){
        // 整理请求参数
        const data = {
          tradeNo: this.$store.state.trade.tradeInfo.tradeNo,
          consignee: this.currentRecipient.consignee,
          consigneeTel: this.currentRecipient.phoneNum,
          deliveryAddress: this.currentRecipient.fullAddress,
          paymentWay: 'ONLINE',
          orderComment: this.message,
          orderDetailList: this.detailArrayList
        };
        // 发起请求获取订单编号并跳转到支付页面
        this.$store.dispatch('pay/submitOrder', data).then(value => {
          alert(value.message);
          const routeUrl = this.$router.resolve({
            path: '/pay',
            query: {
              orderId: value.orderId
            }
          });
          window.open(routeUrl.href, '_blank');
        }, reason => {
          alert(reason);
        });
      }
    },
    mounted() {
      this.$store.dispatch('trade/getTradeInfo');
    }
  }
</script>

<style scoped lang="less">
  .trade {
    h3 {
      font-size: 14px;
      font-weight: bold;
      line-height: 21px;
    }
    .main {
      margin-top: 10px;
      padding: 15px 30px;
      border: 1px solid #ddd;
      .recipient-info, .pay-method, .delivery-list, .buyer-message, .bill-info, .use-discount {
        padding-bottom: 15px;
        border-bottom: 1px solid #ddd;
        .title {
          font-weight: bold;
          margin: 15px 0;
        }
      }
      .recipient-info {
        .title {
          margin-top: 0;
        }
        .body {
          .item {
            display: flex;
            align-items: center;
            &:nth-of-type(n+2) {
              margin-top: 10px;
            }
            .name {
              width: 100px;
              height: 32px;
              border: 1px solid #ddd;
              text-align: center;
              line-height: 30px;
              &.active {
                position: relative;
                border-color: #e1251b;
                &::after {
                  content: '';
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 13px;
                  height: 14px;
                  background: url("./images/choosed.png") no-repeat;
                }
              }
            }
            .address {
              margin-left: 20px;
            }
            .phone {
              margin-left: 10px;
            }
            &.default {
              &::after {
                content: "默认地址";
                width: 56px;
                height: 24px;
                background-color: #878787;
                color: #fff;
                text-align: center;
                line-height: 24px;
                margin-left: 10px;
              }
            }
          }
        }
      }
      .pay-method {
        .body {
          display: flex;
          gap: 20px;
          .item {
            width: 100px;
            height: 32px;
            border: 1px solid #ddd;
            text-align: center;
            line-height: 30px;
            &.active {
              position: relative;
              border-color: #e1251b;
              &::after {
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                width: 13px;
                height: 14px;
                background: url("./images/choosed.png") no-repeat;
              }
            }
          }
        }
      }
      .delivery-list {
        .body {
          .delivery-method {
            background-color: #f4f4f4;
            padding: 15px 20px;
            margin-bottom: 2px;
            h4 {
              font-weight: bold;
              margin-bottom: 15px;
            }
            .content {
              display: flex;
              align-items: center;
              gap: 20px;
              .express-type {
                width: 120px;
                height: 32px;
                border: 1px solid #ddd;
                text-align: center;
                line-height: 30px;
              }
            }
          }
          .goods-list {
            background-color: #feedef;
            padding: 15px 20px;
            h4 {
              font-weight: bold;
              margin-bottom: 15px;
            }
            .content {
              .item {
                height: 82px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 80px;
                &:nth-last-of-type(n+2) {
                  margin-bottom: 10px;
                }
                img {
                  width: 82px;
                  height: 82px;
                }
                .good-name {
                  width: 350px;
                  height: 100%;
                  padding: 10px 0;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  .freight-insurance {
                    color: #c81623;
                  }
                }
                .good-price {
                  width: 60px;
                  color: #e12228;
                  font-size: 14px;
                  font-weight: bold;
                }
                .good-num {
                  width: 25px;
                  text-align: center;
                }
              }
            }
          }
        }
      }
      .buyer-message {
        .body {
          textarea {
            width: 100%;
            line-height: 1.8;
            padding: 0 1em;
            resize: none;
            border: 1px solid #e4e2e2;
          }
        }
      }
      .bill-info {
        .body {
          padding-left: 1em;
        }
      }
      .use-discount {
        border-bottom: none;
        padding-bottom: 0;
        .body {
          padding-left: 1em;
        }
      }
    }
    .total {
      margin: 20px 0;
      .wrap {
        width: 220px;
        float: right;
        p {
          line-height: 30px;
          display: flex;
          justify-content: space-between;
          .bold {
            font-weight: bold;
          }
        }
      }
    }
    .money {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 10px;
      background-color: #f4f4f4;
      border: 1px solid #ddd;
      line-height: 30px;
      .price {
        span {
          font-size: 14px;
          color: #e12228;
          font-weight: bold;
        }
      }
      .recipient {
        color: #999;
        display: flex;
        gap: 20px;
      }
    }
    .submit {
      margin: 10px 0;
      button {
        float: right;
        width: 164px;
        height: 50px;
        font: bold 18px "微软雅黑";
        background-color: #e1251b;
        color: #fff;
        text-align: center;
        line-height: 50px;
      }
    }
  }
</style>