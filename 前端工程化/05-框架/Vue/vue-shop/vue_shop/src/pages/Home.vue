<template>
  <el-container class="home-container">
    <el-header>
      <div class="logo-wrap">
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="logout" type="info">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
            ref="elMenu"
            :default-active="activePath"
            :router="true"
            :collapse-transition="false"
            :collapse="isCollapse"
            :unique-opened="true"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff">
          <el-submenu :index="subMenu.id + ''" v-for="subMenu in menuList" :key="subMenu.id">
            <template slot="title">
              <i :class="iconsObj[subMenu.id]"></i>
              <span slot="title">{{subMenu.authName}}</span>
            </template>
            <el-menu-item
                @click="saveNavStatus(menuItem.path)"
                :index="menuItem.path"
                v-for="menuItem in subMenu.children"
                :key="menuItem.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{menuItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Home',
    data(){
      return {
        // 左侧菜单数据
        menuList: [],
        // 左侧一级菜单 id 和字体图标的映射关系
        iconsObj: {
          '125': 'iconfont icon-users',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao'
        },
        // 左侧菜单是否折叠
        isCollapse: false
      }
    },
    computed: {
      // 被激活选中的二级菜单对应的路径
      ...mapState(['activePath'])
    },
    watch: {
      // 当用户点击浏览器回退按钮，回退到 /home/welcome 页面或者直接在浏览器上输入路径 /home/welcome 时
      // 此时activePath 为空字符串，应该折叠所有的 subMenu
      activePath(newValue){
        if(!newValue){
          this.$refs.elMenu.close('125')
          this.$refs.elMenu.close('103')
          this.$refs.elMenu.close('101')
          this.$refs.elMenu.close('102')
          this.$refs.elMenu.close('145')
        }
      }
    },
    methods: {
      // 点击退出登录按钮的事件处理函数
      logout(){
        // 清空 sessionStorage (包括 token)
        sessionStorage.clear()
        // 跳转到登录页
        this.$router.replace('/login')
      },
      // 发送请求获取左侧菜单列表
      async getMenuList(){
        const { data: res } = await this.$http.get('menus')
        if(res.meta.status !== 200) return this.$message.error('左侧菜单列表获取失败')
        this.menuList = res.data
      },
      // 点击按钮切换菜单的折叠与展开状态
      toggleCollapse(){
        this.isCollapse = !this.isCollapse
      },
      // 点击每个二级菜单时将其激活状态保存到 sessionStorage 中
      saveNavStatus(activePath) {
        sessionStorage.setItem('activePath', activePath)
        this.$store.dispatch('saveNavStatus', activePath)
      }
    },
    created() {
      this.getMenuList()
      this.$store.dispatch('saveNavStatus', sessionStorage.getItem('activePath'))
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0;
      background-color: #373d41;
      .logo-wrap {
        display: flex;
        align-items: center;
        span {
          margin-left: 15px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .el-container {
      .el-aside {
        background-color: #333744;
        transition: all 0.3s;
        .toggle-button {
          background-color: #4a5064;
          color: #fff;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
        .el-menu {
          border-right: none;
          .iconfont {
            margin-right: 10px;
          }
        }
      }
      .el-main {
        background-color: #eaedf1;
      }
    }
  }
</style>