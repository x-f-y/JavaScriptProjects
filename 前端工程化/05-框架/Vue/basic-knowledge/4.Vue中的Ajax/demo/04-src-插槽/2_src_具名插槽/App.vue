<template>
  <div class="container">
    <Category title="美食">
      <!-- 传递给默认插槽 -->
      <template v-slot:default>
        <img src="./assets/img.png" alt="">
      </template>
      <!-- 传递给center插槽 -->
      <template v-slot:center>
        <a slot="footer" href="#">更多美食</a>
      </template>
      <!-- 传递给footer插槽 -->
      <template v-slot:footer>
        <h3 style="background-color: red">hello world</h3>
      </template>
    </Category>

    <Category title="游戏">
      <!-- 传递给默认插槽 -->
      <template v-slot:default>
        <ul slot="center">
          <li v-for="(game, index) in games" :key="index">{{game}}</li>
        </ul>
      </template>
      <!-- 传递给center插槽 -->
      <template v-slot:center>
        <div class="foot">
          <a href="#">单机游戏</a>
          <a href="#">网络游戏</a>
        </div>
      </template>
      <!-- 传递给footer插槽 -->
      <template v-slot:footer>
        <h3 style="background-color: green">hello world</h3>
      </template>
    </Category>

    <Category title="电影">
      <template v-slot:default>
        <video slot="center" src="./assets/video.mp4" controls></video>
      </template>
      <template v-slot:center>
        <div class="foot">
          <a href="#">经典</a>
          <a href="#">热门</a>
          <a href="#">推荐</a>
        </div>
      </template>
      <template v-slot:footer>
        <h3 style="background-color: blue">hello world</h3>
      </template>
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
  .container, .foot {
    display: flex;
    justify-content: space-around;
  }
  /*img, video {
    width: 100%;
  }*/
</style>