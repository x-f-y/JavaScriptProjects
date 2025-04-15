<template>
  <div class="blog-container">
    <Layout>
      <template #default>
        <BlogList />
      </template>
      <template #right>
        <BlogCategory />
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout';
import BlogCategory from './components/BlogCategory';
import BlogList from './components/BlogList';

export default {
  components: {
    Layout,
    BlogCategory,
    BlogList
  }
}
</script>

<style scoped lang="less">
.blog-container {
  height: 100%;

  .blog-category-container {
    width: 300px;
  }
}
</style>