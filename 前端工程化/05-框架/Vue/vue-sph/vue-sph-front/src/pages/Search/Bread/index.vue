<template>
  <div class="bread heart clearfix">
    <h3>全部结果</h3>
    <ul>
      <!-- 分类名称对应的面包屑 -->
      <li v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryNameTag">x</i></li>
      <!-- 搜索关键字对应的面包屑 -->
      <li v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeywordTag">x</i></li>
      <!-- 所点击的品牌对应的面包屑 -->
      <li v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademarkTag">x</i></li>
      <!-- 所点击的售卖属性对应的面包屑 -->
      <li v-for="(prop,index) in searchParams.props" :key="index">{{prop.split(':')[1]}}<i @click="removeAttrTag(index)">x</i></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Bread",
    data(){
      return {
        searchParams: {}
      }
    },
    methods: {
      removeCategoryNameTag(){
        // 重置分类名称和一级、二级、三级分类id
        // 注意：该组件的数据searchParams是由Search组件传递过来的，共用一个地址。
        // 改变该组件searchParams中的某些属性值，则Search组件中的SearchParams也会跟着改变
        this.searchParams.categoryName = '';
        this.searchParams.category1Id = '';
        this.searchParams.category2Id = '';
        this.searchParams.category3Id = '';
        // 移除地址栏的query参数（跳转后，Search组件的beforeRouteUpdate钩子会执行）
        this.$router.replace({
          name: 'search',
          params: this.$route.params,
        })
      },
      removeKeywordTag(){
        // 重置搜索关键字
        this.searchParams.keyword = '';
        // 移除地址栏的params参数
        this.$router.replace({
          name: 'search',
          query: this.$route.query
        })
      },
      removeTrademarkTag(){
        // 重置trademark字段
        this.searchParams.trademark = '';
        // 通知Search组件发起请求重新获取数据
        this.$bus.$emit('removeTrademark');
      },
      removeAttrTag(index){
        // 从searchParams.props中删除对应的数组项
        this.searchParams.props.splice(index, 1);
        // 通知Search组件重新发起请求获取数据
        this.$bus.$emit('removeAttr');
      }
    },
    mounted() {
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
  .bread {
    padding-bottom: 18px;
    h3 {
      float: left;
      margin: 0 15px;
      color: #666;
      line-height: 22px;
      &:hover {
        color: #4cb9fc;
      }
    }
    ul {
      float: left;
      cursor: pointer;
      li {
        display: inline-block;
        margin-right: 5px;
        color: #000;
        background-color: #f7f7f7;
        padding: 0 7px;
        transition: color 400ms;
        height: 22px;
        border: 1px solid #dedede;
        line-height: 20px;
        i {
          font-size: 14px;
          margin-left: 10px;
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
  }
</style>