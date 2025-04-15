<template>
  <div class="home-container" ref="container" @mousewheel="handleMouseWheel">
    <ul class="carousel-container" :style="{ marginTop }" @transitionend="handleTransitionEnd">
      <li v-for="item in banners" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div class="icon icon-up" v-show="index > 0" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div class="icon icon-down" v-show="index < banners.length - 1" @click="switchTo(index + 1)">
      <Icon type="arrowDown" />
    </div>
    <ul class="indicators">
      <li v-for="(item, i) in banners" :key="item.id" :class="{ active: index === i }" @click="switchTo(i)"></li>
    </ul>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Icon from '@/components/Icon';
import CarouselItem from './CarouselItem';
import { getBanners } from '@/api/banner';
import debounce from '@/utils/debounce';
import Loading from '@/components/Loading';

export default {
  components: {
    CarouselItem,
    Icon,
    Loading
  },
  data(){
    return {
      banners: [],
      index: 0, // 当前显示的轮播图索引
      containerHeight: 0, // 整个容器的高度
      switching: false, // 是否正在切换中
      isLoading: true
    }
  },
  computed: {
    marginTop(){
      return -this.index * this.containerHeight + 'px';
    }
  },
  methods: {
    switchTo(i){
      this.index = i;
    },
    handleMouseWheel: debounce(function(e){
      if(this.switching){
        return;
      }
      if(e.deltaY > 0 && this.index < this.banners.length - 1){
        // 向下滚动
        this.switching = true;
        this.index++;
      }else if(e.deltaY < 0 && this.index > 0){
        // 向上滚动
        this.switching = true;
        this.index--;
      }
    }, 300),
    handleTransitionEnd(){
      this.switching = false;
    },
    handleResize(){
      this.containerHeight = this.$refs.container.clientHeight;
    }
  },
  async created(){
    this.banners = await getBanners();
    this.isLoading = false;
  },
  mounted(){
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener('resize', this.handleResize);
  },
  destroyed(){
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';

.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;

    > li {
      width: 100%;
      height: 100%;
    }
  }

  .icon {
    .self-x-center();
    font-size: 30px;
    cursor: pointer;
    color: @gray;
    @gap: 25px;
    @jump: 5px;

    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }

    &.icon-down {
      bottom: @gap;
      animation: jump-down 2s infinite;
    }

    @keyframes jump-up {
      from {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      to {
        transform: translate(-50%, @jump);
      }
    }

    @keyframes jump-down {
      from {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      to {
        transform: translate(-50%, -@jump);
      }
    }
  }

  .indicators {
    .self-y-center();
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    > li {
      box-sizing: border-box;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: @words;
      border: 1px solid #fff;
      cursor: pointer;

      &.active {
        background-color: #fff;
      }
    }
  }
}
</style>