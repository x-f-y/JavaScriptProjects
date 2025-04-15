<template>
  <div class="swiper" :ref="name">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Swiper, {Navigation, Pagination} from "swiper";
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  export default {
    name: 'Carousel',
    props: ['name', 'carouselList', 'immediate'],
    created() {
      this.$watch('carouselList', {
        immediate: this.immediate,
        handler(){
          // 执行到这里时，说明轮播图数据已经从服务器上请求回来了
          this.$nextTick(() => {
            // 执行到这里时，说明轮播图数据已经从服务器上请求回来了，并且与轮播图相关的dom结构也已经更新完毕了
            // 初始化swiper实例
            new Swiper(this.$refs[this.name], {
              loop: true,
              modules: [Navigation, Pagination],
              pagination: {
                el: '.swiper-pagination',
                // 点击分页器时切换到指定的图片
                clickable: true
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            })
          })
        }
      })
    }
  }
</script>

<style scoped lang="less">

</style>