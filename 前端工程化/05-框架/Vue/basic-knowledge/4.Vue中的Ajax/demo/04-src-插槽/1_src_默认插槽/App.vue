<template>
  <div class="container">
    <Category title="美食">
      <img src="./assets/img.png" alt="">
    </Category>

    <Category title="游戏">
      <ul>
        <li v-for="(game, index) in games" :key="index">{{game}}</li>
      </ul>
    </Category>

    <Category title="电影">
      <video src="./assets/video.mp4" controls></video>
    </Category>
  </div>
</template>

<script>
  import Category from './components/Category'
  export default {
    name: 'App',
    components: {
      Category
    },
    data(){
      return {
        games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽']
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
  }
  /*img, video {
    width: 100%;
  }*/
</style>