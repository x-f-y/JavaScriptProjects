<template>
  <div class="list-container heart clearfix">
    <div class="left">
      <Carousel name="bannerSwiper" :carouselList="bannerList" :immediate="false"></Carousel>
    </div>
    <div class="right">
      <div class="news">
        <div class="title">
          <h3>尚品汇快报</h3>
          <span>更多</span>
        </div>
        <ul class="news-nav">
          <li><span>[特惠]</span>&nbsp;备战开学季，全民半价购数码</li>
          <li><span>[公告]</span>&nbsp;品优购稳占家电网购六成份额</li>
          <li><span>[特惠]</span>&nbsp;百元中秋全品类礼券限量领</li>
          <li><span>[公告]</span>&nbsp;上品优生鲜 享阳澄湖大闸蟹</li>
          <li><span>[特惠]</span>&nbsp;每日享折扣品优品质游</li>
        </ul>
      </div>
      <ul class="img-nav">
        <li><i></i><span>话费</span></li>
        <li><i></i><span>机票</span></li>
        <li><i></i><span>电影票</span></li>
        <li><i></i><span>游戏</span></li>
        <li><i></i><span>彩票</span></li>
        <li><i></i><span>加油站</span></li>
        <li><i></i><span>酒店</span></li>
        <li><i></i><span>火车票</span></li>
        <li><i></i><span>众筹</span></li>
        <li><i></i><span>理财</span></li>
        <li><i></i><span>礼品卡</span></li>
        <li><i></i><span>白条</span></li>
      </ul>
      <div class="ads">
        <img src="./images/ad1.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'ListContainer',
    computed: {
      ...mapState('home', {
        bannerList: state => state.bannerList
      })
    },
    mounted() {
      // 通知vuex发起请求获取轮播图数据，存放在state中
      this.$store.dispatch('home/getBannerList')
    }
  }
</script>

<style scoped lang="less">
  .list-container {
    padding-left: 210px;
    .left {
      float: left;
      width: 730px;
      height: 455px;
      margin: 5px 5px 0;
      .swiper {
        width: 730px;
        height: 455px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right {
      float: left;
      width: 250px;
      height: 455px;
      margin-top: 5px;
      .news {
        border: 1px solid #e4e4e4;
        .title {
          position: relative;
          height: 32px;
          padding: 0 16px;
          line-height: 32px;
          font-size: 14px;
          h3 {
            float: left;
          }
          span {
            float: right;
            &::after {
              content: '>';
              margin-left: 8px;
            }
          }
          &::after {
            content: '';
            position: absolute;
            width: 95%;
            height: 1px;
            background-color: #e4e4e4;
            top: 32px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .news-nav {
          height: 132px;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          li {
            color: #666666;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            span {
              font-weight: bold;
            }
          }
        }
      }
      .img-nav {
        width: 250px;
        height: 210px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, 1fr);
        li {
          border-bottom: 1px solid #e4e4e4;
          border-left: 1px solid #e4e4e4;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          i {
            display: block;
            width: 30px;
            height: 30px;
            // 在样式中使用~@代表src目录，在脚本中使用@代表src目录
            background: url(~@/assets/icons.png) no-repeat;
          }
          &:nth-child(1) i {
            background-position: -15px -10px;
          }
          &:nth-child(2) i {
            background-position: -81px -10px;
          }
          &:nth-child(3) i {
            background-position: -143px -10px;
          }
          &:nth-child(4) i {
            background-position: -205px -10px;
          }
          &:nth-child(5) i {
            background-position: -16px -81px;
          }
          &:nth-child(6) i {
            background-position: -81px -81px;
          }
          &:nth-child(7) i {
            background-position: -143px -80px;
          }
          &:nth-child(8) i {
            background-position: -207px -80px;
          }
          &:nth-child(9) i {
            background-position: -17px -152px;
          }
          &:nth-child(10) i {
            background-position: -80px -153px;
          }
          &:nth-child(11) i {
            background-position: -142px -150px;
          }
          &:nth-child(12) i {
            background-position: -209px -150px;
          }
          &:nth-child(4n) {
            border-right: 1px solid #e4e4e4;
          }
        }
      }
      .ads {
        height: 75px;
        margin-top: 4px;
      }
    }
  }
</style>