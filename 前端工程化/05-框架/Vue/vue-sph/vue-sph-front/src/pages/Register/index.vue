<template>
  <div class="register heart">
    <div class="main">
      <div class="title">
        <h2>注册新用户</h2>
        <div class="right">我有账号，去&nbsp;<router-link replace to="/login" class="login">登录</router-link>&nbsp;</div>
      </div>
      <div class="body">
        <form @submit.prevent="register">
          <div class="phone">
            <label for="phone">手机号：</label>
            <input @blur="validateSjh" type="text" id="phone" placeholder="请输入手机号" v-model.trim.lazy="formData['phone-number']">
            <div class="tip" v-show="tipShowWrap['phone-number']">手机号格式无效！</div>
          </div>
          <div class="verify">
            <label for="verify">验证码：</label>
            <input @blur="validateYzm" type="text" id="verify" placeholder="请输入验证码" v-model.trim.lazy="formData['verification-code']" autocomplete="off">
            <button type="button" @click="getCode">获取验证码</button>
            <div class="tip" v-show="tipShowWrap['verification-code']">验证码错误！</div>
          </div>
          <div class="login-password">
            <label for="login-password">登录密码：</label>
            <input @blur="validateDlmm" type="password" id="login-password" placeholder="请输入登录密码" v-model.trim.lazy="formData['login-password']">
            <div class="tip" v-show="tipShowWrap['login-password']">密码格式无效！</div>
          </div>
          <div class="confirm-password">
            <label for="confirm-password">确认密码：</label>
            <input @blur="validateQrmm" type="password" id="confirm-password" placeholder="请输入确认密码" v-model.trim.lazy="formData['confirm-password']">
            <div class="tip" v-show="tipShowWrap['confirm-password']">确认密码必须与登录密码保持一致！</div>
          </div>
          <div class="protocol">
            <input @blur="validateXy" type="checkbox" v-model.lazy="formData['agree-protocol']">
            <span>同意协议并注册《尚品汇用户协议》</span>
            <div class="tip" v-show="tipShowWrap['agree-protocol']">请先同意勾选协议！</div>
          </div>
          <button type="submit">完成注册</button>
        </form>
      </div>
    </div>
    <div class="copyright">
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
    name: 'Register',
    data(){
      return {
        formData: {
          'phone-number': '',
          'verification-code': '',
          'login-password': '',
          'confirm-password': '',
          'agree-protocol': false
        },
        tipShowWrap: {
          'phone-number': false,
          'verification-code': false,
          'login-password': false,
          'confirm-password': false,
          'agree-protocol': false,
        }
      }
    },
    methods: {
      // 验证手机号格式是否有效
      validateSjh(){
        const reg = /^1([3-57-9]\d|6[1-79])\d{8}$/;
        const res = reg.test(this.formData['phone-number']);
        this.tipShowWrap['phone-number'] = !res;
        return res;
      },
      // 验证验证码是否正确
      validateYzm(){
        const res = this.formData['verification-code'] && this.formData['verification-code'] === this.$store.state.user.verificationCode;
        this.tipShowWrap['verification-code'] = !res;
        return res;
      },
      // 验证登录密码格式是否正确（8-16位，且包含大写字母、小写字母、数字、特殊字符中的三种或以上）
      validateDlmm(){
        const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W_]+$)(?![a-z\d]+$)(?![a-z\W_]+$)(?![\d\W_]+$)\S{8,16}$/;
        const res = reg.test(this.formData['login-password']);
        this.tipShowWrap['login-password'] = !res;
        return res;
      },
      // 验证确认密码是否和登录密码保持一致
      validateQrmm(){
        const res = this.formData['confirm-password'] && this.formData['login-password'] === this.formData['confirm-password'];
        this.tipShowWrap['confirm-password'] = !res;
        return res;
      },
      // 验证用户协议是否勾选
      validateXy(){
        const res = this.formData['agree-protocol'];
        this.tipShowWrap['agree-protocol'] = !res;
        return res;
      },
      // 用户注册
      register(){
        const validateArr = [this.validateSjh(), this.validateYzm(), this.validateDlmm(), this.validateQrmm(), this.validateXy()];
        // 检测表单验证是否通过，不通过则直接返回
        if(validateArr.some(v => !v)){
          return;
        }
        this.$store.dispatch('user/register', {
          phone: this.formData["phone-number"],
          code: this.formData["verification-code"],
          password: this.formData["login-password"]
        }).then(value => {
          alert(value);
          this.$router.replace('/login');
        }, reason => {
          alert(reason);
        })
      },
      // 获取验证码
      getCode(){
        if(!this.validateSjh()){
          return;
        }
        this.$store.dispatch('user/getVerificationCode', this.formData['phone-number'])
            .then(value => {
              this.formData['verification-code'] = this.$store.state.user.verificationCode;
            }, reason => {
              alert(reason);
            });
      }
    }
  }
</script>

<style scoped lang="less">
  .register {
    margin-top: 80px;
    .main {
      height: 430px;
      border: 1px solid #dfdfdf;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 15px;
        font-size: 20px;
        font-weight: bold;
        background-color: #ececec;
        border-bottom: 1px solid #dfdfdf;
        .right {
          font-size: 14px;
          .login {
            color: #e1251b;
          }
        }
      }
      .body {
        form {
          .phone, .verify, .login-password, .confirm-password {
            width: 270px;
            height: 56px;
            margin: 0 auto;
            position: relative;
            label {
              position: absolute;
              right: 270px;
              font-size: 14px;
              width: 70px;
              height: 38px;
              line-height: 38px;
              text-align: right;
            }
            input {
              width: 270px;
              height: 38px;
              padding-left: 8px;
              border: 1px solid #999;
              font-size: 12px;
            }
            button {
              position: absolute;
              width: 82px;
              height: 38px;
              border: 1px solid #999;
              left: 275px;
            }
            .tip {
              position: absolute;
              color: red;
            }
          }
          .phone {
            margin-top: 40px;
          }
          .protocol {
            width: 270px;
            height: 56px;
            margin: 0 auto;
            input {
              vertical-align: -0.15em;
            }
            .tip {
              color: red;
            }
          }
          > button {
            display: block;
            width: 270px;
            height: 36px;
            margin: 0 auto;
            font-size: 16px;
            background-color: #e1251b;
            color: #fff;
          }
        }
      }
    }
    .copyright {
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
  }
</style>