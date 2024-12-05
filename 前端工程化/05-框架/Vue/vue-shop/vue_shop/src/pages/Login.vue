<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef" class="form" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
        // 表单的数据绑定对象
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        // 表单的验证规则对象
        loginFormRules: {
          username: [
            { trigger: 'blur', required: true, message: '请输入用户名' },
            { trigger: 'blur', min: 3, max: 10, message: '长度在 3 到 10 个字符'}
          ],
          password: [
            { trigger: 'blur', required: true, message: '请输入密码' },
            { trigger: 'blur', min: 6, max: 15, message: '长度在 6 到 15 个字符'}
          ]
        }
      }
    },
    methods: {
      // 重置表单所有字段为初始值并移除所有校验结果
      reset(){
        this.$refs.loginFormRef.resetFields()
      },
      // 点击登录触发的事件
      login(){
        // 表单预验证
        this.$refs.loginFormRef.validate(async valid => {
          if(!valid) {
            // 验证不通过
            return
          }
          // 验证通过
          const { data: res } = await this.$http.post('login', this.loginForm)
          // console.log(res)
          if(res.meta.status !== 200){
            return this.$message({
              message: '登录失败',
              type: 'error'
            })
          }
          this.$message.success('登录成功')
          // 将登录成功之后的 token 保存到 sessionStorage 中
          sessionStorage.setItem('token', res.data.token)
          // 跳转到后台主页，路由地址是 /home
          this.$router.replace('/home')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_container {
    height: 100%;
    background-color: #2b4b6b;
    .login_box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
      height: 300px;
      border-radius: 3px;
      background-color: #fff;
      .avatar_box {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 130px;
        height: 130px;
        padding: 10px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 0 10px #ddd;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .form {
        margin-top: 100px;
        padding: 0 30px;
        .btns {
          text-align: right;
        }
      }
    }
  }
</style>