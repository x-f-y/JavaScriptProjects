<template>
  <div class="row">
    <!-- 初次展示 -->
    <h1 v-show="stateData.isFirst">欢迎使用！</h1>
    <!-- 正在发送请求 -->
    <h1 v-show="stateData.isLoading">加载中...</h1>
    <!-- 请求成功 -->
    <div v-show="stateData.isSucceed" class="card" v-for="user in userList" :key="user.id">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style='width: 100px'/>
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
    <!-- 请求失败 -->
    <h1 v-show="stateData.errMessage">{{stateData.errMessage}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'List',
    data(){
      return {
        userList: [],
        stateData: {
          // 是否为初次展示
          isFirst: true,
          // 是否正在加载
          isLoading: false,
          // 是否请求成功
          isSucceed: false,
          // 错误信息
          errMessage: ''
        }
      }
    },
    mounted(){
      this.$bus.$on('getUsers', (users) => {
        this.userList = users.map(( {id, avatar_url, html_url, login} ) => {
          return { id, avatar_url, html_url, login }
        })
      })
      this.$bus.$on('updateStateData', (stateObj) => {
        this.stateData = Object.assign(this.stateData, stateObj)
      })
    },
    beforeDestroy() {
      this.$bus.$off(['getUsers', 'updateStateData'])
    }
  }
</script>

<style scoped>
  .album {
    min-height: 50rem; /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
  }

  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>