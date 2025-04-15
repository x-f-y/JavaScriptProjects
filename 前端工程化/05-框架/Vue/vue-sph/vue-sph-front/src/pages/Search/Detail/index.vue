<template>
  <div class="detail heart">
    <div class="navbar">
      <ul class="clearfix" @click="handleToggle">
        <li :class="{active: isOne, asc: isAsc, desc: isDesc}">
          <a href="javascript:void(0);" data-type="1">综合</a>
        </li>
        <li :class="{active: isTwo, asc: isAsc, desc: isDesc}">
          <a href="javascript:void(0);" data-type="2">价格</a>
        </li>
      </ul>
    </div>
    <div class="goods-list">
      <ul class="clearfix">
        <li v-for="good in goodsList" :key="good.id">
          <div class="image">
            <router-link :to="`/detail/${good.id}`">
              <!--<img :src="good.defaultImg" alt="">-->
              <!--<img v-lazy="good.defaultImg" alt="">-->
              <!--src的属性值为默认图片地址，指令的绑定值才是真实的图片地址-->
              <img src="../../../assets/loading.gif" v-lazy-load="good.defaultImg" alt="">
            </router-link>
          </div>
          <div class="price">
            <em>¥</em>
            <i>{{good.price}}.00</i>
          </div>
          <div class="detail">
            <a href="javascript:void(0);" :title="good.title">{{good.title}}</a>
          </div>
          <div class="comment">
            已有<span>2000</span>人评价
          </div>
          <div class="operate">
            <a class="add-cart" href="javascript:void(0);">加入购物车</a>
            <a class="collection" href="javascript:void(0);">收藏</a>
          </div>
        </li>
      </ul>
    </div>
    <Pagination :pageNo="pageNo" :pageSize="pageSize" :total="total" :continues="5"></Pagination>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "Detail",
    props: ['goodsList'],
    data(){
      return {
        searchParams: {}
      }
    },
    methods: {
      // 点击“综合”、“价格”的事件处理函数
      handleToggle(e){
        if(e.target.dataset.type){
          const originType = this.searchParams.order.split(':')[0];
          const originSort = this.searchParams.order.split(':')[1];
          this.searchParams.order = this.searchParams.order.replace(/\d/, e.target.dataset.type);
          if(e.target.dataset.type === originType){
            // 当前点击的项为已选中的项，就对asc和desc取反
            const curSort = (originSort === 'desc' ? 'asc' : 'desc');
            this.searchParams.order = this.searchParams.order.replace(/[a-z]+/, curSort);
          }
          // 通知Search组件重新发起请求获取数据
          this.$bus.$emit('sort');
        }
      }
    },
    computed: {
      // 对于searchParams.order字符串：1代表综合，2代表价格，asc代表升序，desc代表降序
      isOne(){
        return this.searchParams.order ? this.searchParams.order.startsWith('1') : false;
      },
      isTwo(){
        return this.searchParams.order ? this.searchParams.order.startsWith('2') : false;
      },
      isAsc(){
        return this.searchParams.order ? this.searchParams.order.endsWith('asc') : false;
      },
      isDesc(){
        return this.searchParams.order ? this.searchParams.order.endsWith('desc') : false;
      },
      pageNo(){
        return this.searchParams.pageNo ? this.searchParams.pageNo : 1;
      },
      pageSize(){
        return this.searchParams.pageSize ? this.searchParams.pageSize : 5;
      },
      ...mapState('search', {
        total: state => state.searchInfo.total
      })
    },
    mounted(){
      // 绑定自定义事件，接收Search组件传递过来的数据
      this.$bus.$on('deliverSearchParams', searchParams => {
        this.searchParams = searchParams;
      })
    },
    beforeDestroy() {
      // 解绑自定义事件
      this.$bus.$off('deliverSearchParams');
    }
  }
</script>

<style scoped lang="less">
  .detail {
    .navbar {
      background-color: #fbfbfb;
      border: 1px solid #e2e2e2;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
      ul {
        li {
          float: left;
          a {
            display: block;
            color: #777;
            padding: 11px 15px;
            text-decoration: none;
            cursor: pointer;
          }
          &.active a {
            color: #fff;
            background-color: #e1251b;
          }
          &.active.asc a::after {
            content: '↑';
          }
          &.active.desc a::after {
            content: '↓';
          }
        }
      }
    }
    .goods-list {
      margin-top: 20px;
      ul {
        li {
          float: left;
          width: 20%;
          margin-top: 20px;
          .image {
            a {
              display: block;
              height: 245px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .price {
            font-size: 18px;
            color: #c81623;
            font-weight: 700;
            line-height: 28px;
            padding-left: 20px;
            em {}
            i {}
          }
          .detail {
            width: 90%;
            padding-left: 20px;
            overflow:hidden;
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            a {
              text-decoration: none;
              line-height: 1.8;
            }
          }
          .comment {
            padding-left: 20px;
            margin-top: 8px;
            span {
              font-weight: 700;
              color: #646fb0;
            }
          }
          .operate {
            padding: 0 20px;
            margin-top: 12px;
            line-height: 18px;
            display: flex;
            justify-content: space-around;
            a {
              cursor: pointer;
              padding: 2px 14px;
              text-decoration: none;
            }
            .add-cart {
              border: 1px solid #e1251b;
              color: #e1251b;
              &:hover {
                background-color: #e1251b;
                color: white;
              }
            }
            .collection {
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              &:hover {
                background-color: #666;
                color: white;
              }
            }
          }
        }
      }
    }
  }
</style>