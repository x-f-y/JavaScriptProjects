<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside></SiteAside>
        </div>
      </template>
      <template #default>
        <RouterView></RouterView>
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import SiteAside from '@/components/SiteAside';
import Layout from '@/components/Layout';
import ToTop from '@/components/ToTop';

export default {
  name: 'App', // 如果组件没有在注册的时候指定名字，则使用该名字
  components: {
    SiteAside,
    Layout,
    ToTop
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";

.app-container {
  .self-fill(fixed);

  .aside {
    width: 250px;
  }
}
</style>
