<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{
            name: 'BlogDetail',
            params: {
              id: item.id
            }
          }">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title">
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{
            name: 'BlogDetail',
            params: {
              id: item.id
            }
          }">
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink :to="{
              name: 'CategoryBlog',
              params: {
                categoryId: item.category.id
              }
            }">{{ item.category.name }}</RouterLink>
          </div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading"></Empty>
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
     />
  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import mainScroll from '@/mixins/mainScroll';
import { getBlogs } from '@/api/blog';
import formatDate from '@/utils/formatDate';
import Pager from '@/components/Pager';
import Empty from '@/components/Empty';

export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("container")],
  components: {
    Pager,
    Empty
  },
  computed: {
    routeInfo(){
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const categoryId = +this.$route.params.categoryId || -1;
      return {
        page,
        limit,
        categoryId
      };
    }
  },
  watch: {
    async $route(){
      this.$refs.container.scrollTop = 0;
      this.isLoading = true;
      this.data = await this.fetchData();
      this.isLoading = false;
    }
  },
  methods: {
    formatDate,
    async fetchData(){
      return await getBlogs(this.routeInfo.page, this.routeInfo.limit, this.routeInfo.categoryId);
    },
    handlePageChange(newPage){
      const query = {
        page: newPage,
        limit: this.routeInfo.limit
      };
      if(this.routeInfo.categoryId === -1){
        this.$router.push({
          name: 'Blog',
          query
        });
      }else{
        this.$router.push({
          name: 'CategoryBlog',
          query,
          params: {
            categoryId: this.routeInfo.categoryId
          }
        });
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.blog-list-container {
  position: relative;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
  line-height: 1.7;
  scroll-behavior: smooth;

  > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid @gray;

      .thumb {
        flex-shrink: 0;

        img {
          display: block;
          max-width: 250px;
          border-radius: 5px;
        }
      }
    
      .main {
        flex-grow: 1;

        h2 {
          margin: 0;
        }

        .aside {
          font-size: 12px;
          color: @gray;

          span {
            margin-right: 15px;
          }
        }
    
        .desc {
          margin: 15px 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>