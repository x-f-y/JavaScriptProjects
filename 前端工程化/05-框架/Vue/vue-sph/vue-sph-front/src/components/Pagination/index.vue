<template>
  <div class="pagination clearfix">
    <div class="wrap">
      <ul class="clearfix" @click="togglePage">
        <!-- 上一页 -->
        <li class="pre">
          <button :disabled="pageNo===1" :data-page="pageNo-1">上一页</button>
        </li>
        <!-- 左边部分 -->
        <li v-show="continuePagesRange.startPage>1" :class="{active:pageNo===1}">
          <a href="javascript:void(0);" :data-page="1">1</a>
        </li>
        <li class="dotted" v-show="continuePagesRange.startPage>2">
          <span>...</span>
        </li>
        <!-- 中间部分 -->
        <!--<li v-for="(page,index) in continuePagesRange.endPage-continuePagesRange.startPage+1" :key="index" :class="{active:pageNo===index+continuePagesRange.startPage}">-->
        <!--  <a href="javascript:void(0);" :data-page="index+continuePagesRange.startPage">{{index+continuePagesRange.startPage}}</a>-->
        <!--</li>-->
        <li v-for="(page,index) in continuePagesRange.endPage" :key="index" v-show="page>=continuePagesRange.startPage" :class="{active:pageNo===page}">
          <a :data-page="page" href="javascript:void(0);">{{page}}</a>
        </li>
        <!-- 右边部分 -->
        <li class="dotted" v-show="continuePagesRange.endPage<(totalPages-1)">
          <span>...</span>
        </li>
        <li v-show="continuePagesRange.endPage<totalPages" :class="{active:pageNo===totalPages}">
          <a href="javascript:void(0);" :data-page="totalPages">{{totalPages}}</a>
        </li>
        <!-- 下一页 -->
        <li class="next">
          <button :disabled="pageNo===totalPages" :data-page="pageNo+1">下一页</button>
        </li>
      </ul>
      <div class="total">共&nbsp;{{totalPages}}&nbsp;页</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'], // 当前页码，每页条目数，总条目数，连续页码数
    computed: {
      totalPages(){
        return Math.ceil(this.total / this.pageSize);
      },
      continuePagesRange(){
        let startPage = 0, endPage = 0; // 连续页的起始页码和结束页码
        const {totalPages, continues, pageNo} = this;
        if(totalPages < continues){ // 总页数小于连续页码数
          startPage = 1;
          endPage = totalPages;
        }else{
          startPage = pageNo - ((continues-1)/2);
          endPage = pageNo + ((continues-1)/2);
          // 边界判断
          if(startPage < 1){
            startPage = 1;
            endPage = continues;
          }
          if(endPage > totalPages){
            startPage = totalPages - continues + 1;
            endPage = totalPages;
          }
        }
        return {startPage, endPage};
      }
    },
    methods: {
      // 页码的点击事件处理函数
      togglePage(e){
        if(e.target.dataset.page){
          // 通知Search组件重新发起请求获取数据
          this.$bus.$emit('handlePage', Number(e.target.dataset.page));
          // 通知PersonOrder组件重新发起请求获取数据
          this.$bus.$emit('getPage', Number(e.target.dataset.page));
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    .wrap {
      ul {
        float: left;
        font-size: 14px;
        li {
          float: left;
          margin: 0 2px;
          border: 1px solid #e0e9ee;
          a {
            text-decoration: none;
            display: block;
            padding: 9px 18px;
          }
          button {
            font-size: 14px;
            padding: 9px 18px;
            color: #999;
            background-color: #fafafa;
            &:disabled {
              cursor: not-allowed;
            }
          }
          span {
            display: block;
            padding: 9px 18px;
          }
          &.pre, &.next {
            color: #999;
            background-color: #fafafa;
          }
          &.pre button::before {
            content: '<<'
          }
          &.active {
            background-color: #e1251b;
            color: #ffffff;
            border-color: transparent;
          }
          &.dotted {
            border-color: transparent;
          }
          &.next button::after {
            content: '>>';
          }
        }
      }
      .total {
        float: left;
        padding: 9px 18px;
        font-size: 14px;
        color: #333;
      }
    }
  }
</style>