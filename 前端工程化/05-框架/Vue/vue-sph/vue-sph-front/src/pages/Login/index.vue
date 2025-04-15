<template>
  <div>
    <div class="login">
      <div class="login-wrap heart">
        <div class="login-form">
          <table>
            <tr @click="changeTab">
              <td :class="{active: type===0}">
                <a data-type="0" href="javascript:void(0);">扫描登录</a>
              </td>
              <td :class="{active: type===1}">
                <a data-type="1" href="javascript:void(0);">账户登录</a>
              </td>
            </tr>
          </table>
          <div class="content">
            <form @submit.prevent="login">
              <div class="phone clearfix">
                <i></i>
                <input @blur="validatePhone" name="phone" type="text" placeholder="请输入手机号" v-model.trim.lazy="phone">
                <span v-show="showPhoneTip">手机号格式无效！</span>
              </div>
              <div class="password clearfix">
                <i></i>
                <input @blur="validatePassword" name="password" type="password" placeholder="请输入密码" v-model.trim.lazy="password">
                <span v-show="showPasswordTip">密码格式无效！</span>
              </div>
              <div class="setting">
                <div class="auto">
                  <input type="checkbox">自动登录
                </div>
                <span class="admin-login" @click="adminLogin">管理员登录</span>
                <span class="visitor-login" @click="visitorLogin">游客登录</span>
                <span>忘记密码？</span>
              </div>
              <button type="submit">登录</button>
            </form>
            <div class="footer">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
              </ul>
              <router-link replace to="/register" class="register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright heart">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return {
        type: 1, // 0表示扫描登录，1表示账户登录
        phone: '',
        password: '',
        showPhoneTip: false,
        showPasswordTip: false
      }
    },
    methods: {
      // 验证手机号格式是否正确
      validatePhone(){
        const reg = /^1([3-57-9]\d|6[1-79])\d{8}$/;
        const res = reg.test(this.phone);
        this.showPhoneTip = !res;
        return res;
      },
      // 验证密码格式是否正确
      validatePassword(){
        const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W_]+$)(?![a-z\d]+$)(?![a-z\W_]+$)(?![\d\W_]+$)\S{8,16}$/;
        const res = reg.test(this.password);
        this.showPasswordTip = !res;
        return res;
      },
      // 切换登录选项卡
      changeTab(e){
        const { type } = e.target.dataset;
        if(!type){
          return;
        }
        this.type = Number(type);
      },
      // 普通用户登录
      login(){
        const validateArr = [this.validatePhone(), this.validatePassword()];
        // // 检测表单验证是否通过，不通过则直接返回
        if(validateArr.some(v => !v)){
          return;
        }
        this.$store.dispatch('user/login', {
          phone: this.phone,
          password: this.password
        }).then(value => {
          alert(value);
          const toPath = this.$route.query.redirect || '/home';
          this.$router.replace(toPath);
        }, reason => {
          alert(reason);
        })
      },
      // 管理员登录
      adminLogin(){
        this.$store.dispatch('user/login', {
          phone: "13700000000",
          password: "111111"
        }).then(value => {
          alert(value);
          this.$router.replace('/home');
        }, reason => {
          alert(reason);
        })
      },
      // 游客登录
      visitorLogin(){
        this.$router.replace('/home');
      }
    }
  }
</script>

<style scoped lang="less">
  .login {
    background-color: #e93854;
    margin-bottom: 20px;
    .login-wrap {
      position: relative;
      height: 540px;
      background: url("./images/loginbg.png") top center no-repeat;
      .login-form {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 420px;
        padding: 40px 20px;
        background-color: #fff;
        table {
          width: 100%;
          border-collapse: collapse;
          tr {
            td {
              width: 50%;
              height: 50px;
              text-align: center;
              line-height: 48px;
              border: 1px solid #ddd;
              a {
                font-size: 20px;
                font-weight: 700;
                text-decoration: none;
              }
              &.active {
                color: #e1251b;
                border-bottom: none;
                border-top-color: #e1251b;
              }
            }
          }
        }
        .content {
          padding: 18px;
          border: 1px solid #ddd;
          border-top: none;
          form {
            .phone, .password {
              position: relative;
              margin-bottom: 20px;
              i {
                float: left;
                width: 37px;
                height: 32px;
                border: 1px solid #ccc;
                border-radius: 2px 0 0 2px;
              }
              input {
                float: left;
                width: 305px;
                height: 32px;
                border: 1px solid #ccc;
                border-left: none;
                border-radius: 0 2px 2px 0;
                font-size: 14px;
                padding-left: 8px;
              }
              span {
                position: absolute;
                top: 35px;
                left: 40px;
                color: red;
              }
            }
            .phone {
              margin-top: 10px;
              i {
                background: url("~@/assets/icons.png") -8px -200px no-repeat;
              }
            }
            .password i {
              background: url("~@/assets/icons.png") -71px -200px no-repeat;
            }
            .setting {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 5px;
              .auto {
                input {
                  vertical-align: -0.15em;
                }
              }
              .visitor-login, .admin-login {
                cursor: pointer;
              }
            }
            button {
              width: 100%;
              height: 36px;
              margin-top: 15px;
              padding: 6px;
              font-size: 16px;
              background-color: #e1251b;
              color: #fff;
              word-spacing: 4px;
            }
          }
          .footer {
            margin-top: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 5px;
            ul {
              display: flex;
              li {
                margin: 0 2px;
                img {
                  display: block;
                  width: 35px;
                  height: 35px;
                }
              }
            }
            .register {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
  .copyright {
    padding-bottom: 20px;
    ul {
      display: flex;
      justify-content: center;
      li {
        padding: 0 20px;
        margin: 15px 0;
        &:nth-of-type(n+2) {
          border-left: 1px solid #e4e4e4;
        }
      }
    }
    .address, .beian {
      text-align: center;
      line-height: 24px;
    }
  }
</style>