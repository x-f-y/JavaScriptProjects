<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from './RightList';
import fetchData from '@/mixins/fetchData';
import { getBlogCategories } from '@/api/blog';

export default {
  mixins: [fetchData([])],
  components: {
    RightList
  },
  computed: {
    categoryId(){
      return +this.$route.params.categoryId || -1;
    },
    limit(){
      return +this.$route.query.limit || 10;
    },
    list(){
      const totalArticleCount = this.data.reduce((pre, cur) => pre + cur.articleCount, 0);
      let result = [
        { id: -1, name: '全部', articleCount: totalArticleCount},
        ...this.data
      ];
      result = result.map(item => ({
        name: item.name,
        isSelect: item.id === this.categoryId,
        aside: `${item.articleCount}篇`,
        id: item.id
      }));
      return result;
    }
  },
  methods: {
    async fetchData(){
      return await getBlogCategories();
    },
    handleSelect(item){
      const query = {
        page: 1,
        limit: this.limit
      };
      if(item.id === -1){
        this.$router.push({
          name: 'Blog',
          query
        });
      }else{
        this.$router.push({
          name: 'CategoryBlog',
          query,
          params: {
            categoryId: item.id
          }
        });
      }
    }
  },
}
</script>

<style scoped lang="less">
.blog-category-container {
  position: relative;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;

  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    line-height: 40px;
    margin: 0;
  }
}
</style>