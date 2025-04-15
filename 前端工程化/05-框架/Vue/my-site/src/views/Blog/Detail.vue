<template>
  <Layout>
    <template #default>
      <div ref="mainContainer" class="main-container" v-loading="isLoading">
        <BlogDetail v-if="data" :blog="data" />
        <BlogComment v-if="!isLoading" />
      </div>
    </template>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC v-if="data" :toc="data.toc" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from '@/mixins/fetchData';
import mainScroll from '@/mixins/mainScroll';
import { getBlog } from '@/api/blog';
import BlogDetail from './components/BlogDetail';
import BlogTOC from './components/BlogTOC';
import BlogComment from './components/BlogComment';
import Layout from '@/components/Layout';
import { titleController } from '@/utils';

export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    BlogDetail,
    BlogTOC,
    BlogComment,
    Layout
  },
  methods: {
    async fetchData(){
      const resp = await getBlog(this.$route.params.id);
      if(!resp){
        // 文章不存在
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    }
  }
}
</script>

<style scoped lang="less">
.main-container {
  position: relative;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 20px;
  scroll-behavior: smooth;
}

.right-container {
  width: 300px;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 20px;
}
</style>