<template>
  <div class="person-order">
    <h2>我的订单</h2>
    <div class="title">
      <span>商品订单详情</span>
      <span>收货人</span>
      <span>金额</span>
      <span>状态</span>
      <span>操作</span>
    </div>
    <table v-for="order in orderList" :key="order.id">
      <thead>
      <tr>
        <th colspan="5">
          <span>{{ order.createTime }}</span>
          <span>订单编号：{{ order.outTradeNo }}</span>
          <img src="./images/delete.png" alt="">
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(good, index) in order.orderDetailList" :key="good.id">
        <td>
          <img :src="good.imgUrl" alt="">
          <p class="name">{{ good.skuName }}</p>
          <span class="number">X{{ good.skuNum }}</span>
          <span class="apply">售后申请</span>
        </td>
        <td :rowspan="order.orderDetailList.length" v-if="index === 0">{{ order.consignee }}</td>
        <td :rowspan="order.orderDetailList.length" v-if="index === 0">
          <span>总金额&nbsp;&nbsp;¥{{ order.totalAmount }}.00</span>
          <span>在线支付</span>
        </td>
        <td :rowspan="order.orderDetailList.length" v-if="index === 0">{{ order.orderStatusName }}</td>
        <td :rowspan="order.orderDetailList.length" v-if="index === 0">
          <span>评价</span>
          <i></i>
          <span>晒单</span>
        </td>
      </tr>
      </tbody>
    </table>
    <Pagination :pageNo="page" :pageSize="limit" :total="total" :continues="5"></Pagination>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'PersonOrder',
    data(){
      return {
        page: 1, // 当前页码
        limit: 3, // 每一页数据条数
      }
    },
    computed: {
      ...mapGetters('myOrder', ['orderList']),
      total(){ // 订单总数
        return this.$store.state.myOrder.orderInfo.total;
      }
    },
    methods: {
      // 获取订单数据
      getData(){
        this.$store.dispatch('myOrder/getOrderInfo', {
          page: this.page,
          limit: this.limit
        });
      }
    },
    mounted() {
      // 获取订单数据
      this.getData();
      // 绑定自定义事件，接收Pagination组件的通知
      this.$bus.$on('getPage', page => {
        this.page = page;
        this.getData();
      })
    },
    beforeDestroy() {
      // 解绑自定义事件
      this.$bus.$off('getPage');
    }
  }
</script>

<style lang="less" scoped>
  .person-order {
    h2 {
      font-size: 15px;
      padding: 12px 10px;
      background-color: #f1f1f1;
      color: #666;
      border: 1px solid #ddd;
      font-weight: bold;
    }
    .title {
      display: flex;
      margin-top: 20px;
      background-color: #f4f4f4;
      padding: 6px 0;
      border: 1px solid #e6e6e6;
      span {
        letter-spacing: 2px;
        color: #666;
        font-weight: bold;
        line-height: 18px;
        text-align: center;
        &:nth-of-type(1) {
          flex: 11;
        }
        &:nth-of-type(2) {
          flex: 2;
        }
        &:nth-of-type(3) {
          flex: 3;
        }
        &:nth-of-type(4) {
          flex: 2;
        }
        &:nth-of-type(5) {
          flex: 2;
        }
      }
    }
    table {
      width: 100%;
      margin-top: 10px;
      border: 1px solid #e6e6e6;
      thead {
        tr {
          th {
            border-bottom: 1px solid #e6e6e6;
            padding: 6px 10px;
            line-height: 18px;
            color: #666;
            background-color: #f4f4f4;
            text-align: left;
            font-weight: bold;
            img {
              float: right;
              cursor: pointer;
            }
            span:nth-of-type(2) {
              margin-left: 20px;
            }
          }
        }
      }
      tbody {
        tr {
          color: #666;
          line-height: 18px;
          td {
            vertical-align: middle;
            padding: 6px 0;
            &:nth-of-type(n+2) {
              text-align: center;
            }
            &:nth-of-type(1) {
              display: flex;
              align-items: center;
              padding-left: 10px;
              img {
                width: 80px;
                height: 80px;
              }
              .name {
                width: 280px;
                margin-left: 25px;
              }
              .number {
                width: 30px;
                margin-left: 25px;
              }
              .apply {
                width: 50px;
                margin-left: 25px;
              }
            }
            &:nth-of-type(2) {
              width: 10%;
            }
            &:nth-of-type(3) {
              width: 15%;
              span {
                display: block;
              }
            }
            &:nth-of-type(4) {
              width: 10%;
            }
            &:nth-of-type(5) {
              width: 10%;
              span {
                cursor: pointer;
              }
              i {
                display: inline-block;
                width: 1px;
                height: 12px;
                margin: 0 5px;
                background-color: #999;
                transform: translateY(2px);
              }
            }
          }
          &:first-of-type {
            td:nth-last-of-type(n+2) {
              border-right: 1px solid #e6e6e6;
            }
          }
          &:nth-of-type(n+2) {
            border-top: 1px solid #e6e6e6;
            td:first-of-type {
              border-right: 1px solid #e6e6e6;
            }

          }
        }
      }
    }
  }
</style>