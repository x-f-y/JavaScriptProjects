<template>
  <div class="floor heart">
    <div class="title clearfix">
      <h2>{{floorObj.name}}</h2>
      <ul class="nav clearfix">
        <li v-for="(nav, index) in floorObj.navList" :key="index" :class="{active: index === 0}">
          <a href="javascript:void(0);">{{nav.text}}</a>
        </li>
      </ul>
    </div>
    <div class="body">
      <div class="left">
        <div class="nav">
          <ul>
            <li v-for="(keyword, index) in floorObj.keywords" :key="index">{{keyword}}</li>
          </ul>
          <div class="img">
            <img :src="floorObj.imgUrl" alt="">
          </div>
        </div>
        <div class="carousel">
          <Carousel name="floorSwiper" :carouselList="floorObj.carouselList" :immediate="true"></Carousel>
        </div>
      </div>
      <div class="right">
        <div class="ads">
          <img :src="floorObj.recommendList[0]" alt="">
          <img :src="floorObj.recommendList[1]" alt="">
        </div>
        <div class="big-img">
          <img :src="floorObj.bigImg" alt="">
        </div>
        <div class="ads">
          <img :src="floorObj.recommendList[2]" alt="">
          <img :src="floorObj.recommendList[3]" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Floor',
    props: ['floorObj'],
  }
</script>

<style scoped lang="less">
  .floor {
    margin-top: 15px;
    .title {
      line-height: 46px;
      border-bottom: 2px solid #c81623;
      h2 {
        float: left;
        font-size: 20px;
        font-weight: bold;
        color: #c81623;
      }
      .nav {
        float: right;
        color: #666666;
        li {
          float: left;
          a {
            padding: 0 12px;
          }
          &.active {
            color: #e1251b;
          }
          &:nth-child(n+2)::before {
            content: "|";
          }
          &:hover {
            color: #4f4cd4;
          }
        }
      }
    }
    .body {
      display: flex;
      height: 360px;
      .left {
        flex-basis: 540px;
        display: flex;
        .nav {
          flex-basis: 210px;
          ul {
            height: 110px;
            padding: 15px 15px;
            background-color: #f7f7f7;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
            column-gap: 15px;
            li {
              display: flex;
              justify-content: center;
              align-items: center;
              border-bottom: 1px solid #e4e4e4;
            }
          }
          .img {
            height: 250px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .carousel {
          flex-basis: 330px;
          .swiper {
            width: 330px;
            height: 360px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .right {
        flex-basis: 660px;
        display: flex;
        .ads {
          flex-grow: 1;
          img {
            display: block;
            width: 100%;
            height: 50%;
            border-bottom: 1px solid #e4e4e4;
            transition: all 400ms;
            &:hover {
              opacity: 0.8;
            }
          }
        }
        .big-img {
          flex-grow: 1;
          border-style: solid;
          border-color: #e4e4e4;
          border-width: 0 1px 1px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>