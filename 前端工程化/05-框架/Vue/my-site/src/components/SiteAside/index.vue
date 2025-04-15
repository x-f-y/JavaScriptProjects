<template>
  <div class="site-aside-container" v-if="data">
    <Avatar :url="data.avatar" />
    <h1 class="title">{{ data.siteTitle }}</h1>
    <Menu />
    <Contact />
    <p class="footer">{{ data.icp }}</p>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar';
import Menu from './Menu';
import Contact from './Contact';
import { mapState } from 'vuex';

export default {
  components: {
    Avatar,
    Menu,
    Contact
  },
  computed: mapState('setting', ['data'])
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.site-aside-container {
  width: 100%;
  height: 100%;
  background-color: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: hidden auto;

  .avatar-container {
    margin: 0 auto;
  }

  .title {
    font-size: 1.2em;
    color: #fff;
    text-align: center;
    margin-bottom: 24px;
  }

  .contact-container {
    padding-left: 20px;
  }

  .footer {
    text-align: center;
    font-size: 12px;
  }
}
</style>