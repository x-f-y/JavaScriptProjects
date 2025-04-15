<template>
  <div class="image-loader-container">
    <!-- 占位图 -->
    <img class="placeholder" :src="placeholder" ref="placeholderRef" alt="">
    <!-- 原图 -->
    <img
      :src="src"
      @load="handleLoad"
      @transitionend="handleTransitionend"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
      alt=""
    >
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data(){
    return {
      originLoaded: false // 原图是否加载完成
    }
  },
  computed: {
    // 原图的不透明度
    originOpacity(){
      return this.originLoaded ? 1 : 0;
    }
  },
  methods: {
    handleLoad(){
      // 原图加载完成后触发
      this.originLoaded = true;
    },
    handleTransitionend(){
      // 移除占位图
      this.$refs.placeholderRef.remove();
      this.$emit('load');
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";

.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  > img {
    .self-fill();
    object-fit: cover;
  }

  .placeholder {
    // 高斯模糊
    filter: blur(2vw);
  }
}
</style>