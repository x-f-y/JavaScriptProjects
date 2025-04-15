<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <Bread class="mb5"></Bread>
      <SearchSelector class="mb5" :attrsList="attrsList" :trademarkList="trademarkList"></SearchSelector>
      <Detail class="mb5" :goodsList="goodsList"></Detail>
      <HotSale class="mb5"></HotSale>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Bread from '@/pages/Search/Bread';
  import SearchSelector from '@/pages/Search/SearchSelector';
  import Detail from '@/pages/Search/Detail';
  import HotSale from '@/pages/Search/HotSale';

  export default {
    name: 'Search',
    components: {
      Bread,
      SearchSelector,
      Detail,
      HotSale
    },
    data(){
      return {
        // 发起请求时携带的参数
        searchParams: {
          category1Id: '', // 一级分类id
          category2Id: '', // 二级分类id
          category3Id: '', // 三级分类id
          categoryName: '', // 分类名称
          keyword: '', // 搜索关键字
          props: [], // 商品属性的数组：["属性ID:属性值:属性名"] 示例：["2:6.0～6.24英寸:屏幕尺寸"]
          trademark: '', // 品牌："品牌ID:品牌名称" 示例："1:苹果"
          order: '1:desc', // 排序方式  1:综合, 2:价格, asc:升序, desc:降序 示例："1:desc"
          pageNo: 1, // 页码
          pageSize: 5 // 每页数量
        }
      }
    },
    methods: {
      getData(){
        // 通知vuex发起请求获取搜索模块的数据
        this.$store.dispatch('search/getSearchInfo', this.searchParams);
      }
    },
    computed: {
      ...mapGetters('search', ['goodsList', 'attrsList', 'trademarkList'])
    },
    mounted(){
      // 整理请求参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 发起请求获取数据
      this.getData();
      // 触发自定义事件，传递数据给Bread组件和Detail组件
      this.$bus.$emit('deliverSearchParams', this.searchParams);
      // 绑定自定义事件，接收SearchSelector组件传递过来的数据，并重新发起请求获取数据
      this.$bus.$on('deliverTrademark', trademark => {
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
        this.getData();
      })
      // 绑定自定义事件，接收SearchSelector组件传递过来的数据，并重新发起请求获取数据
      this.$bus.$on('deliverAttr', (attr, attrValue) => {
        const prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
        if(!this.searchParams.props.includes(prop)){
          this.searchParams.props.push(prop);
          this.getData();
        }
      })
      // 绑定自定义事件，接收Bread组件的通知
      this.$bus.$on('removeTrademark', () => {
        this.getData();
      })
      // 绑定自定义事件，接收Bread组件的通知
      this.$bus.$on('removeAttr', () => {
        this.getData();
      })
      // 绑定自定义事件，接收Detail组件的通知
      this.$bus.$on('sort', () => {
        this.getData();
      })
      // 绑定自定义事件，接收Pagination组件的通知
      this.$bus.$on('handlePage', page => {
        this.searchParams.pageNo = page;
        this.getData();
      })
    },
    beforeRouteUpdate(to, from, next){
      // 重置一级分类、二级分类和三级分类的id
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
      // 整理请求参数
      Object.assign(this.searchParams, to.query, to.params);
      // 发起请求获取数据
      this.getData();
      next();
    },
    beforeDestroy() {
      // 解绑自定义事件
      this.$bus.$off(['deliverTrademark', 'deliverAttr', 'removeTrademark', 'removeAttr', 'sort', 'handlePage']);
    }
  }
</script>

<style scoped lang="less">
  .main {
    margin: 10px 0;
    .mb5 {
      margin-bottom: 5px;
    }
  }
</style>