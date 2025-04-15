<template>
  <div class="add-cart-success">
    <div class="heart">
      <h2 class="title"><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h2>
      <div class="content clearfix">
        <div class="left">
          <img :src="skuInfo.skuDefaultImg" alt="">
        </div>
        <div class="center">
          <div class="name">商品名称：{{ skuInfo.skuName }}</div>
          <div class="desc">商品描述：{{ skuInfo.skuDesc }}</div>
          <div class="attr_price_num clearfix">
            <div class="attr" v-for="item in selectedSaleAttrList" :key="item.id">{{ item.attrName }}：{{ item.attrValue }}</div>
            <div class="price">价格：{{skuInfo.price}}元</div>
            <div class="num">数量：{{ $route.query.skuNum }}</div>
          </div>
        </div>
        <div class="right">
          <router-link :to="`/detail/${skuInfo.id}`" class="viewDetail">查看商品详情</router-link>
          <router-link to="/shopCart" class="goCart">去购物车结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddCartSuccess",
    computed: {
      skuInfo() {
        return JSON.parse(sessionStorage.getItem('skuInfo'));
      },
      spuSaleAttrList() {
        return JSON.parse(sessionStorage.getItem('spuSaleAttrList'));
      },
      selectedSaleAttrList(){
        return this.spuSaleAttrList.map(v => {
          return {
            id: v.id,
            attrName: v.saleAttrName,
            attrValue: v.spuSaleAttrValueList.find(v => v.isChecked === '1')?.saleAttrValueName
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .add-cart-success {
    background-color: #f4f4f4;
    .title {
      font-size: 16px;
      color: #6aaf04;
      padding: 15px 0;
      .icon-pc-right {
        border: 2px solid #6aaf04;
        padding: 3px;
        border-radius: 15px;
        margin-right: 8px;
      }
    }
    .content {
      padding-bottom: 15px;
      .left {
        float: left;
        margin-right: 20px;
        img {
          width: 65px;
          height: 65px;
        }
      }
      .center {
        float: left;
        .name {
          font-size: 14px;
          line-height: 28px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .desc {
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .attr_price_num {
          line-height: 24px;
          color: #aaa;
          .attr {
            float: left;
            margin-right: 20px;
          }
          .price {
            float: left;
            margin-right: 20px;
          }
          .num {
            float: left;
          }
        }
      }
      .right {
        float: right;
        font-size: 15px;
        .viewDetail {
          padding: 7px 36px;
          color: #333;
          background-color: #eee;
          border: 1px solid #e1e1e1;
          text-decoration: none;
        }
        .goCart {
          margin-left: 20px;
          padding: 7px 36px;
          background-color: #e1251b;
          color: #fff;
          border: 1px solid #e1e1e1;
          text-decoration: none;
          &::after {
            content: '>';
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>