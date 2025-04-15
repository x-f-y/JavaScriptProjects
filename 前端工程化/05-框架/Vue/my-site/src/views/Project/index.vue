<template>
  <div class="project-container" v-loading="loading" ref="projectContainer">
    <div class="project-item" v-for="item in data" :key="item.id">
      <a
        class="thumb"
        :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
        :target="item.url ? '_blank' : '_self'"
      >
        <img v-lazy="item.thumb" alt="">
      </a>
      <div class="info">
        <h2>
          <a
            :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
            :target="item.url ? '_blank' : '_self'"
          >
            {{ item.name }}
          </a>
          <a class="github" v-if="item.github" :href="item.github" target="_blank">github</a>
        </h2>
        <p v-for="(desc, i) in item.description" :key="i">{{ desc }}</p>
      </div>
    </div>
    <Empty v-if="!loading && data.length === 0" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mainScroll from '@/mixins/mainScroll';
import Empty from '@/components/Empty';

export default {
  components: {
    Empty
  },
  mixins: [mainScroll("projectContainer")],
  computed: mapState('project', ['loading', 'data']),
  created(){
    this.$store.dispatch('project/fetchProject');
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;

  .project-item {
    transition: 0.5s;
    padding: 20px;
    display: flex;
    gap: 15px;
    margin-bottom: 20px;

    &:hover {
      box-shadow: -1px 1px 5px #000;
      transform: scale(1.01) translate(3px, -3px);
      color: inherit;
    }

    .thumb {
      flex-shrink: 0;

      img {
        width: 250px;
        object-fit: cover;
        border-radius: 5px;
      }
    }

    .info {
      flex-grow: 1;
      line-height: 1.7;

      h2 {
        margin: 0;

        .github {
          font-size: 14px;
          color: @primary;
        }
      }
    }
  }
}
</style>