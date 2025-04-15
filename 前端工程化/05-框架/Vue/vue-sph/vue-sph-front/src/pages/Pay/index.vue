<template>
  <div class="pay heart">
    <div class="pay-tip">
      <div class="success">
        <span class="success-icon"></span>
        <span class="success-content">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
      </div>
      <div class="hint">
        <span class="order">
          请您在提交订单<em>4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{ orderId }}</em>
        </span>
        <span class="money">
          应付金额：<em>￥{{ totalFee }}</em>
        </span>
      </div>
    </div>
    <div class="pay-main">
      <h3>重要说明：</h3>
      <ol>
        <li>尚品汇商城支付平台目前支持<em>支付宝</em>支付方式。</li>
        <li>其它支付渠道正在调试中，敬请期待。</li>
        <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
      </ol>
      <h3>支付宝账户信息：（很重要，请保存！！！）</h3>
      <ul>
        <li>支付帐号：13700000000</li>
        <li>支付密码：111111</li>
      </ul>
    </div>
    <div class="pay-method">
      <div class="item">
        <div class="title">支付平台</div>
        <div class="content">
          <img src="./images/pay2.jpg" alt="">
          <img src="./images/pay3.jpg" alt="">
        </div>
      </div>
      <div class="item">
        <div class="title">支付网银</div>
        <div class="content">
          <img src="./images/pay10.jpg" alt="">
          <img src="./images/pay11.jpg" alt="">
          <img src="./images/pay12.jpg" alt="">
          <img src="./images/pay13.jpg" alt="">
          <img src="./images/pay14.jpg" alt="">
          <img src="./images/pay15.jpg" alt="">
          <img src="./images/pay16.jpg" alt="">
          <img src="./images/pay17.jpg" alt="">
          <img src="./images/pay18.jpg" alt="">
          <img src="./images/pay19.jpg" alt="">
          <img src="./images/pay20.jpg" alt="">
          <img src="./images/pay21.jpg" alt="">
          <img src="./images/pay22.jpg" alt="">
        </div>
      </div>
      <div class="item">
        <div class="title">其他支付方式</div>
        <div class="content">
          <img src="./images/pay1.jpg" alt="">
          <img src="./images/pay4.jpg" alt="">
          <img src="./images/pay5.jpg" alt="">
        </div>
      </div>
      <div class="submit-pay">
        <button type="button" @click="pay">立即支付</button>
      </div>
    </div>
    <dialog ref="dialog" @close="DialogCloseHandler">
      <div class="title">请使用微信扫码支付</div>
      <img :src="url" alt="">
      <div class="button-wrap">
        <button type="button" @click="cancelPay">取消支付</button>
        <button type="button" @click="paySuccess">完成支付</button>
      </div>
    </dialog>
  </div>
</template>

<script>
  import QRCode from 'qrcode';
  import {mapState} from "vuex";

  export default {
    name: 'Pay',
    data(){
      return {
        url: "" // 支付二维码图片地址
      }
    },
    computed: {
      orderId(){
        return this.$route.query.orderId;
      },
      ...mapState('pay', {
        totalFee: state => state.totalFee,
        codeUrl: state => state.codeUrl
      })
    },
    methods: {
      wheelHandler(e){
        e.preventDefault();
      },
      DialogCloseHandler(){
        // 恢复页面滚动
        window.removeEventListener('wheel', this.wheelHandler);
      },
      // “立即支付”按钮的点击事件处理函数
      async pay(){
        // 获取支付二维码图片地址
        this.url = await QRCode.toDataURL(this.codeUrl);
        // 禁用页面滚动
        window.addEventListener('wheel', this.wheelHandler, { passive: false });
        // 显示弹窗
        // this.$refs.dialog.show();
        this.$refs.dialog.showModal();
      },
      // "取消支付"按钮的点击事件处理函数
      cancelPay(){
        this.$refs.dialog.close();
      },
      // “完成支付”按钮的点击事件处理函数
      paySuccess(){
        this.$store.dispatch('pay/payStatus', this.orderId).then(value => {
          alert(value);
          this.$refs.dialog.close();
          this.$router.replace('/paySuccess');
          window.removeEventListener('wheel', this.wheelHandler);
        }, reason => {
          alert(reason);
          this.$refs.dialog.close();
        });
      }
    },
    mounted() {
      this.$store.dispatch('pay/submitPay', this.orderId);
    }
  }
</script>

<style scoped lang="less">
  .pay {
    .pay-tip {
      padding: 10px;
      .success {
        height: 35px;
        display: flex;
        align-items: center;
        .success-icon {
          width: 30px;
          height: 30px;
          background: url("./images/icon.png") no-repeat 0 0;
        }
        .success-content {
          font-size: 14px;
          font-weight: bold;
          margin-left: 10px;
        }
      }
      .hint {
        display: flex;
        justify-content: space-between;
        padding-left: 40px;
        line-height: 26px;
        .order {
          em {
            color: #e1251b;
          }
        }
        .money {
          font-size: 15px;
          em {
            font-size: 18px;
            color: #e1251b;
          }
        }
      }
    }
    .pay-main {
      padding: 6px 0 15px 25px;
      border: 2px solid #e1251b;
      h3 {
        font-size: 14px;
        font-weight: bold;
        line-height: 21px;
        color: #e1251b;
        margin: 9px 0;
      }
      ol {
        list-style-type: decimal;
      }
      ul {
        list-style-type: disc;
      }
      li {
        line-height: 24px;
        font-size: 14px;
        margin-left: 25px;
        em {
          color: #e1251b;
          font-weight: bold;
        }
      }
    }
    .pay-method {
      margin: 10px 0;
      padding: 0 25px 20px 25px;
      border: 1px solid #ddd;
      .item {
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        .title {
          font-weight: bold;
          margin: 20px 0;
        }
        .content {
          padding: 0 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          img {
            border: 1px solid #ddd;
            width: 154px;
            height: 46px;
            object-fit: none;
          }
        }
      }
      .submit-pay {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        button {
          font: bold 18px "微软雅黑";
          padding: 15px 45px;
          color: #fff;
          background-color: #e1251b;
        }
      }
    }
  }
  dialog {
    text-align: center;
    border-radius: 5px;
    padding: 30px 50px;
    border: none;
    background-color: #fefefe;
    gap: 15px;
    .title {
      font-size: 17px;
      color: #444;
    }
    .button-wrap {
      button {
        padding: 5px 10px;
        border-radius: 3px;
        border: 1px solid #ddd;
        margin: 0 5px;
        &:first-of-type {
          color: #666;
          background-color: #fff;
        }
        &:last-of-type {
          background-color: #e1251b;
          color: #fefefe;
        }
      }
    }
    // 弹窗背景伪元素
    &::backdrop {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
</style>