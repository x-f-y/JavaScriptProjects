<template>
  <div>
    <MyHeader v-show="$route.meta.showHeader"></MyHeader>
    <router-view></router-view>
    <MyFooter v-show="$route.meta.showFooter"></MyFooter>
  </div>
</template>

<script>
  import MyHeader from "@/components/MyHeader";
  import MyFooter from "@/components/MyFooter";

  export default {
    name: 'App',
    components: {
      MyHeader,
      MyFooter
    },
    mounted() {
      // 通知vuex发起请求获取分类列表数据，存放于state中
      this.$store.dispatch('home/getCategoryList');
    }
  }
</script>

<style>
  /*公共样式*/
  /*引入字体图标*/
  @import '../public/css/iconfont.css';
  /*使用 CSS3 的盒子模型*/
  * {
    box-sizing: border-box;
  }
  /*确定版心*/
  .heart {
    width: 1200px;
    margin: 0 auto;
  }
  /*统一设置背景颜色和字体*/
  body {
    background-color: #fff;
    font: 12px/1.3 "Microsoft YaHei",Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif;
    color: #333;
  }
  /*设置隐藏*/
  .hide {
    display: none;
  }
  /*清除浮动*/
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }
  /*默认显示垂直滚动条，防止因滚动条引起的页面闪烁*/
  html {
    overflow-y: scroll;
  }
  /*其它公共样式*/
  a:hover {
    /*color: #f40;*/
    text-decoration: underline;
  }
  button {
    cursor: pointer;
  }
</style>
