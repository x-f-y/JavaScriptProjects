<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论：{{ blog.commentNumber }}</a>
      <RouterLink :to="{
        name: 'CategoryBlog',
        params: {
          categoryId: blog.category.id
        }
      }">{{ blog.category.name }}</RouterLink>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import formatDate from '@/utils/formatDate';
import '@/styles/markdown.css';
import 'highlight.js/styles/github.css';

export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate
  },
  mounted(){
    const hash = location.hash;
    if(!hash){
      return;
    }
    const ele = document.getElementById(hash.substring(1));
    // 滚动ele的祖先元素，直至ele出现在视口的顶部
    ele.scrollIntoView();
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.blog-detail-container {
  .aside {
    font-size: 12px;
    color: @gray;

    span, a {
      margin-right: 15px;
    }
  }

  .markdown-body {
    margin: 2em 0;
  }
}
</style>