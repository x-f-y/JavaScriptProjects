<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" ref="image" :style="imagePosition">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="showWords"
       />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoader';

export default {
  props: ['carousel'],
  components: {
    ImageLoader
  },
  data(){
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, // 外层容器的尺寸
      innerSize: null, // 里层图片的尺寸
      mouseX: 0,
      mouseY: 0
    }
  },
  computed: {
    imagePosition(){
      if(!this.containerSize || !this.innerSize){
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left = -this.mouseX * extraWidth / this.containerSize.width;
      const top = -this.mouseY * extraHeight / this.containerSize.height;
      return {
        transform: `translate(${left}px, ${top}px)`
      };
    },
    center(){
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2
      }
    }
  },
  methods: {
    handleMouseMove(e){
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave(){
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
    setSize(){
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight
      };
    },
    showWords(){
      this.$refs.title.style.opacity = 1;
      this.$refs.desc.style.opacity = 1;
      this.$refs.title.style.width = '0px';
      this.$refs.desc.style.width = '0px';
      // 强制重新渲染
      this.$refs.container.clientWidth;
      this.$refs.title.style.transition = "1s";
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.title.style.width = this.titleWidth + 'px';
      this.$refs.desc.style.width = this.descWidth + 'px';
    }
  },
  mounted(){
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed(){
    window.removeEventListener('resize', this.setSize);
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.carousel-item-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .carousel-img {
    width: 105%;
    height: 105%;
    transition: 0.3s;
  }

  .title, .desc {
    position: absolute;
    left: 30px;
    letter-spacing: 3px;
    white-space: nowrap;
    text-shadow: 
      1px 0 0 rgba(0, 0, 0, 0.5),
      -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5),
      0 -1px 0 rgba(0, 0, 0, 0.5);
    opacity: 0;
    overflow: hidden;
  }

  .title {
    top: calc(50% - 40px);
    font-size: 2em;
    color: #fff;
  }

  .desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>