<template>
  <div class="my-header">
    <div class="top">
      <div class="main heart clearfix">
        <div class="login-register">
          <span>尚品汇欢迎您！</span>
          <template v-if="username">
            {{username}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a @click="logout" href="javascript:void(0);">退出登录</a>
          </template>
          <template v-else>
            请&nbsp;<router-link to="/login">登录</router-link>&nbsp;|&nbsp;免费<router-link to="/register">注册</router-link>
          </template>
        </div>
        <ul class="header-nav clearfix">
          <li><router-link to="/myOrder">我的订单</router-link></li>
          <li><router-link to="/shopCart">我的购物车</router-link></li>
          <li><a href="javascript:void(0);">我的尚品汇</a></li>
          <li><a href="javascript:void(0);">尚品汇会员</a></li>
          <li><a href="javascript:void(0);">企业采购</a></li>
          <li><a href="javascript:void(0);">关注尚品汇</a></li>
          <li><a href="javascript:void(0);">合作招商</a></li>
          <li><a href="javascript:void(0);">商家后台</a></li>
        </ul>
      </div>
    </div>
    <div class="bottom heart">
      <h1 class="logo">
        <router-link to="/home">
          <img src="./images/logo.png" alt="" title="尚品汇">
          <span class="hide">尚品汇</span>
        </router-link>
      </h1>
      <form class="search clearfix" @submit.prevent="goSearch">
        <input type="text" v-model.trim="keyword" ref="ipt">
        <button>搜索</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyHeader',
    data(){
      return {
        // 搜索关键词
        keyword: ''
      }
    },
    computed: {
      username(){
        return this.$store.state.user.userInfo.name;
      }
    },
    methods: {
      // 表单提交时触发的回调函数，可以是点击了搜索按钮，也可以是在输入框中按下了回车键
      goSearch(){
        this.$router.push({
          name: 'search',
          params: {
            // 设置了 params 参数可传可不传后，如果传递的是空串，跳转时路径会有问题，所以这里加上 “|| undefined”
            keyword: this.keyword || undefined
          },
          query: this.$route.query
        })
        // 清空输入框并移除焦点
        this.keyword = '';
        this.$refs.ipt.blur();
      },
      // 退出登录
      logout(){
        this.$store.dispatch('user/logout').then(value => {
          alert(value);
          this.$router.replace('/login');
        }, reason => {
          alert(reason);
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .my-header {
    .top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;
      color: #666;
      .main {
        .login-register {
          float: left;
          span {
            color: #333;
          }
        }
        .header-nav {
          float: right;
          li {
            float: left;
            a {
              padding: 0 12px;
            }
            &:nth-child(-n+7)::after {
              content: "|";
            }
          }
        }
      }
    }
    .bottom {
      height: 106px;
      padding: 30px 0;
      .logo {
        float: left;
        margin-left: 45px;
        a {
          img {
            display: block;
            height: 56px;
          }
        }
      }
      .search {
        float: right;
        input {
          float: left;
          width: 490px;
          height: 32px;
          border: 2px solid #ea4a36;
          text-indent: 5px;
        }
        button {
          display: block;
          float: right;
          width: 68px;
          height: 32px;
          background-color: #ea4a36;
          color: #ffffff;
        }
      }
    }
  }
</style>