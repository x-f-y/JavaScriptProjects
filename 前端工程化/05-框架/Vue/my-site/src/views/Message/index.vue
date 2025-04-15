<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import { getMessages, postMessage } from '@/api/message';
import MessageArea from '@/components/MessageArea';
import mainScroll from '@/mixins/mainScroll';

export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  components: {
    MessageArea
  },
  data(){
    return {
      page: 1,
      limit: 10
    }
  },
  computed: {
    hasMore(){
      return this.data.rows.length < this.data.total;
    }
  },
  methods: {
    async fetchData(){
      return await getMessages(this.page, this.limit);
    },
    async handleSubmit(formData, callback){
      const resp = await postMessage(formData);
      this.data.rows.unshift(resp);
      this.data.total++;
      callback && callback('感谢您的评论！');
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

<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;

  .message-area-container {
    width: 700px;
    margin: 0 auto;
  }
}
</style>