<template>
  <div class="user-name">
    <span v-if="status === 'loading'">loading...</span>
    <template v-else-if="status === 'login'">
      <router-link to="/user">{{ user.name }}</router-link>
      <a href="" @click.prevent="handleLoginOut">退出</a>
    </template>
    <!-- exact-path：仅使用url的path部分进行匹配，忽略query和hash部分 -->
    <!-- 对于以下router-link，路径为/login?xxx=yyy或者/login#xxx时也能匹配 -->
    <router-link v-else to="/login" exact-path>Login</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('loginUser', ['user']),
    ...mapGetters('loginUser', ['status'])
  },
  methods: {
    async handleLoginOut(){
      await this.$store.dispatch('loginUser/loginOut');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.user-name {
  display: inline-block;
}

.user-name a,
.user-name span {
  margin-right: 15px;
}
</style>