<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
     />
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea';
import fetchData from '@/mixins/fetchData';
import { getComments, postComment } from '@/api/blog';

export default {
  components: {
    MessageArea
  },
  mixins: [fetchData({ total: 0, rows: []})],
  computed: {
    hasMore(){
      return this.data.rows.length < this.data.total;
    }
  },
  data(){
    return {
      page: 1,
      limit: 10
    }
  },
  methods: {
    async fetchData(){
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    async handleSubmit(formData, callback){
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback && callback('评论成功');
    },
    async fetchMore(){
      if(!this.hasMore){
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    handleScroll(dom){
      if(this.isLoading || !dom){
        return;
      }
      const dis = dom.scrollHeight - dom.clientHeight - dom.scrollTop;
      if(dis < 100){
        this.fetchMore();
      }
    }
  },
  created(){
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed(){
    this.$bus.$off('mainScroll', this.handleScroll);
  }
}
</script>

<style scoped>
.blog-comment-container {
  margin: 30px 0;
}
</style>