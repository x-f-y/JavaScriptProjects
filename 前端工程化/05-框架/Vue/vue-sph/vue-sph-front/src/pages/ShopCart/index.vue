<template>
  <div class="shop-cart heart">
    <h2>全部商品</h2>
    <div class="cart-main">
      <ul class="title clearfix">
        <li>全部</li>
        <li>商品</li>
        <li>单价（元）</li>
        <li>数量</li>
        <li>小计（元）</li>
        <li>操作</li>
      </ul>
      <ul class="content">
        <li class="clearfix" v-for="item in cartInfoList" :key="item.id">
          <div class="select">
            <input type="checkbox" :checked="item.isChecked === 1" @change="updateChecked(item.skuId, item.isChecked)">
          </div>
          <div class="good">
            <img :src="item.imgUrl" alt="">
            <p>{{ item.skuName }}</p>
          </div>
          <div class="price">
            <span>{{ item.skuPrice }}</span>
          </div>
          <div class="count">
            <button @click="addOrMinusGoodNum(item.skuId, -1)" :disabled="item.skuNum === 1">-</button>
            <input
                type="text"
                :value="item.skuNum"
                @input="handleInput"
                @change="changeGoodNum($event, item.skuId, item.skuNum)"
            >
            <button @click="addOrMinusGoodNum(item.skuId, 1)">+</button>
          </div>
          <div class="sum">
            <span>{{ item.skuPrice * item.skuNum }}</span>
          </div>
          <div class="operate">
            <a @click="deleteGood(item.skuId)">删除</a>
            <a href="javascript:void(0);">移到收藏</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-tool clearfix">
      <div class="left-tool clearfix">
        <div class="choose-all">
          <label>
            <input type="checkbox" :checked="isAllChecked" @change="updateAllChecked">
            <span>全选</span>
          </label>
        </div>
        <div class="tool-wrap">
          <a @click="deleteCheckedGood">删除选中的商品</a>
          <a href="javascript:void(0);">移到我的关注</a>
          <a href="javascript:void(0);">清除下柜商品</a>
        </div>
        <div class="total">
          <p>已选择&nbsp;<span>{{ checkedNum }}</span>&nbsp;件商品</p>
          <p>总价（不含运费）：<span>{{ totalPrice }}</span></p>
        </div>
      </div>
      <div class="right-settle">
        <button @click="settle">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {debounce} from "@/utils";
  import {mapGetters} from "vuex";

  export default {
    name: "ShopCart",
    computed: {
      ...mapGetters('shopCart', ['cartInfoList']),
      isAllChecked(){
        return this.cartInfoList.length ? this.cartInfoList.every(item => item.isChecked === 1) : false;
      },
      checkedNum(){
        return this.cartInfoList.reduce((pre, cur) => pre + ((cur.isChecked === 1) ? 1 : 0), 0);
      },
      totalPrice(){
        return this.cartInfoList.reduce((pre, cur) => {
          let curTotalPrice = (cur.isChecked === 1) ? (cur.skuPrice * cur.skuNum) : 0;
          return pre + curTotalPrice;
        }, 0);
      }
    },
    methods: {
      // 通知vuex，获取购物车列表数据，存放在state中
      getData(){
        this.$store.dispatch('shopCart/getCartList');
      },
      // 修改购物车中产品数量时，限制输入只能是正整数（1 2 3 ...），而不能输入负数、小数、字母等
      handleInput(e){
        e.target.value = e.target.value.replace(/[^\d]/g, '');
      },
      // 点击加减按钮对产品数量进行修改
      addOrMinusGoodNum: debounce(async function(skuId, skuNum){
        await this.$store.dispatch('detail/addOrUpdateShopCar', {skuId, skuNum});
        this.getData();
      }, 500),
      // 直接输入数字对产品数量进行修改
      async changeGoodNum(e, skuId, oldSkuNum){
        let newSkuNum = Number(e.target.value); // 产品的购买数量
        if(newSkuNum === 0){
          // 产品购买数量至少为1
          newSkuNum = 1;
        }
        e.target.value = newSkuNum;
        const skuNum = newSkuNum - oldSkuNum;
        await this.$store.dispatch('detail/addOrUpdateShopCar', {skuId, skuNum});
        this.getData();
      },
      // 删除购物车中的商品
      deleteGood(skuId){
        this.$store.dispatch('shopCart/deleteCart', skuId).then(value => {
          this.getData();
        }, reason => {
          alert(reason);
        })
      },
      // 更新商品的勾选状态
      updateChecked(skuId, isChecked){
        isChecked ^= 1; // 利用异或运算符让isChecked的值在0和1之间进行切换
        this.$store.dispatch('shopCart/updateCheckCart', {skuId, isChecked}).then(value => {
          this.getData();
        }, reason => {
          alert(reason);
        })
      },
      // 删除选中的商品
      deleteCheckedGood(){
        this.$store.dispatch('shopCart/deleteAllCheckedCart').then(_ => {
          this.getData();
        }, _ => {
          alert('删除所选商品失败');
        })
      },
      // 修改所有商品的选中状态
      updateAllChecked(e){
        if(this.cartInfoList.length){
          const isChecked = Number(e.target.checked);
          this.$store.dispatch('shopCart/updateAllCheckCart', isChecked).then(_ => {
            this.getData();
          }, _ => {
            alert('切换所有商品状态失败');
          })
        }
      },
      // 结算
      settle(){
        if(!this.checkedNum){
          return alert('请至少选中一项商品！');
        }
        this.$router.push('/trade');
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>

<style scoped lang="less">
  .shop-cart {
    h2 {
      font-size: 14px;
      font-weight: 700;
      line-height: 21px;
    }
    .cart-main {
      .title {
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        margin-top: 10px;
        li {
          float: left;
          &:nth-child(1) {
            width: 20%;
          }
          &:nth-child(2) {
            width: 22%;
          }
          &:nth-child(3) {
            width: 17%;
          }
          &:nth-child(4) {
            width: 16%;
          }
          &:nth-child(5) {
            width: 15%;
          }
          &:nth-child(6) {
            width: 10%;
          }
        }
      }
      .content {
        margin-top: 15px;
        border: 1px solid #ddd;
        li {
          padding: 10px;
          position: relative;
          .select {
            float: left;
            margin-top: 30px;
            width: 12%;
          }
          .good {
            float: left;
            width: 30%;
            img {
              float: left;
              width: 80px;
              height: 80px;
            }
            p {
              float: left;
              width: 150px;
              line-height: 18px;
              margin-top: 12px;
              margin-left: 10px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
          .price {
            float: left;
            margin-top: 28px;
            width: 15%;
            font-size: 16px;
          }
          .count {
            float: left;
            width: 18%;
            margin-top: 22px;
            display: flex;
            button {
              border: 1px solid #ddd;
              background-color: #fff;
              padding: 8px;
              &:disabled {
                cursor: not-allowed;
              }
            }
            input[type=text] {
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
              width: 40px;
              text-align: center;
              font-size: 14px;
            }
          }
          .sum {
            float: left;
            margin-top: 28px;
            width: 15%;
            font-size: 16px;
          }
          .operate {
            float: left;
            width: 10%;
            margin-top: 18px;
            a {
              display: block;
              line-height: 20px;
            }
          }
          &:nth-child(n+2) {
            border-top: 1px solid #ddd;
          }
        }
      }
    }
    .cart-tool {
      margin: 15px 0;
      border: 1px solid #ddd;
      height: 52px;
      .left-tool {
        float: left;
        width: 1102px;
        padding: 10px;
        line-height: 30px;
        .choose-all {
          float: left;
          label {
            input {
              width: 1em;
              height: 1em;
              vertical-align: -0.15em;
            }
          }
        }
        .tool-wrap {
          float: left;
          margin-left: 40px;
          a {
            color: #666;
            margin-right: 20px;
          }
        }
        .total {
          float: right;
          display: flex;
          margin-right: 60px;
          p {
            span {
              vertical-align: -1.5px;
              color: #c81623;
              font-size: 16px;
            }
            &:first-of-type {
              margin-right: 30px;
            }
          }
        }
      }
      .right-settle {
        float: right;
        width: 96px;
        height: 100%;
        button {
          background-color: #e1251b;
          font-size: 18px;
          width: 100%;
          height: 100%;
          color: #fff;
        }
      }
    }
  }
</style>