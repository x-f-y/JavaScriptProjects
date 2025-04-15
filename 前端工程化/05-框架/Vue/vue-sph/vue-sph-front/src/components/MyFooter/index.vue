<template>
  <div class="my-footer">
    <div class="main heart">
      <div class="help">
        <div class="left clearfix">
          <dl>
            <dt>购物指南</dt>
            <dd>购物流程</dd>
            <dd>会员介绍</dd>
            <dd>生活旅行/团购</dd>
            <dd>常见问题</dd>
            <dd>购物指南</dd>
          </dl>
          <dl>
            <dt>配送方式</dt>
            <dd>上门自提</dd>
            <dd>211限时达</dd>
            <dd>配送服务查询</dd>
            <dd>配送费收取标准</dd>
            <dd>海外配送</dd>
          </dl>
          <dl>
            <dt>支付方式</dt>
            <dd>货到付款</dd>
            <dd>在线支付</dd>
            <dd>分期付款</dd>
            <dd>邮局汇款</dd>
            <dd>公司转账</dd>
          </dl>
          <dl>
            <dt>售后服务</dt>
            <dd>售后政策</dd>
            <dd>价格保护</dd>
            <dd>退款说明</dd>
            <dd>返修/退换货</dd>
            <dd>取消订单</dd>
          </dl>
          <dl>
            <dt>特色服务</dt>
            <dd>夺宝岛</dd>
            <dd>DIY装机</dd>
            <dd>延保服务</dd>
            <dd>尚品汇E卡</dd>
            <dd>尚品汇通信</dd>
          </dl>
        </div>
        <div class="right">
          <span>帮助中心</span>
          <img src="./images/wx_cz.jpg" alt="">
        </div>
      </div>
      <div class="copyright">
        <ul class="help-nav clearfix">
          <li><a href="javascript:void(0);">关于我们</a></li>
          <li><a href="javascript:void(0);">联系我们</a></li>
          <li><a href="javascript:void(0);">关于我们</a></li>
          <li><a href="javascript:void(0);">商家入驻</a></li>
          <li><a href="javascript:void(0);">营销中心</a></li>
          <li><a href="javascript:void(0);">友情链接</a></li>
          <li><a href="javascript:void(0);">关于我们</a></li>
          <li><a href="javascript:void(0);">营销中心</a></li>
          <li><a href="javascript:void(0);">友情链接</a></li>
          <li><a href="javascript:void(0);">关于我们</a></li>
        </ul>
        <p class="address">地址：北京市昌平区宏福科技园综合楼6层</p>
        <p class="police">京ICP19006430号</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyFooter'
  }
</script>

<style scoped lang="less">
  .my-footer {
    background-color: #eaeaea;
    .main {
      .help {
        height: 200px;
        padding-top: 30px;
        border-bottom: 1px solid #e4e1e1;
        .left {
          float: left;
          margin-left: 40px;
          dl {
            float: left;
            margin-right: 125px;
            line-height: 22px;
            dt {
              font-weight: bold;
              font-size: 14px;
            }
          }
        }
        .right {
          float: right;
          display: flex;
          margin-right: 40px;
          flex-direction: column;
          align-items: center;
          span {
            display: block;
            margin-bottom: 5px;
          }
          img {
            width: 90px;
          }
        }
      }
      .copyright {
        padding: 22px 0;
        text-align: center;
        .help-nav {
          display: inline-block;
          li {
            float: left;
            a {
              padding: 0 12px;
            }
            &:nth-child(n+2)::before {
              content: '|';
            }
          }
        }
        .address {
          margin-top: 13px;
        }
        .police {
          margin-top: 13px;
        }
      }
    }
  }
</style>