<template>
  <div class="my-order heart clearfix">
    <aside @click="changeTab">
      <dl>
        <dt>订单中心</dt>
        <dd class="active"><router-link to="/myOrder/personOrder">个人订单</router-link></dd>
        <dd><router-link to="/myOrder/groupOrder">团购订单</router-link></dd>
      </dl>
      <dl>
        <dt>关注中心</dt>
        <dd><a href="javascript:void(0);">关注的店铺</a></dd>
        <dd><a href="javascript:void(0);">关注的商品</a></dd>
        <dd><a href="javascript:void(0);">关注的品牌</a></dd>
        <dd><a href="javascript:void(0);">关注的活动</a></dd>
      </dl>
      <dl>
        <dt>特色业务</dt>
        <dd><a href="javascript:void(0);">节能补贴</a></dd>
        <dd><a href="javascript:void(0);">医药服务</a></dd>
        <dd><a href="javascript:void(0);">定期送</a></dd>
      </dl>
      <dl>
        <dt>价格保护</dt>
        <dd><a href="javascript:void(0);">意见建议</a></dd>
        <dd><a href="javascript:void(0);">购买咨询</a></dd>
        <dd><a href="javascript:void(0);">交易纠纷</a></dd>
        <dd><a href="javascript:void(0);">我的发票</a></dd>
        <dd><a href="javascript:void(0);">价格保护</a></dd>
      </dl>
      <dl>
        <dt>设置</dt>
        <dd><a href="javascript:void(0);">个人信息</a></dd>
        <dd><a href="javascript:void(0);">浏览历史</a></dd>
        <dd><a href="javascript:void(0);">收货地址</a></dd>
      </dl>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'MyOrder',
    methods: {
      // 点击左侧菜单栏切换到对应的内容
      changeTab(e) {
        const ele = e.target;
        if (ele.tagName !== 'A') {
          return;
        }
        const dds = e.currentTarget.querySelectorAll('dd');
        for(const dd of dds){
          dd.classList.remove('active');
        }
        ele.parentElement.classList.add('active');
      }
    }
  }
</script>

<style lang="less" scoped>
  .my-order {
    margin-bottom: 10px;
    padding: 0 15px;
    aside {
      float: left;
      width: 150px;
      dl {
        line-height: 30px;
        dt {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          &::before {
            content: "";
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #77b72c;
          }
        }
        dd {
          position: relative;
          padding: 0 2.5em;
          display: flex;
          align-items: center;
          justify-content: space-between;
          a {
            text-decoration: none;
          }
          &::after {
            content: ">"
          }
          &.active {
            color: #e1251b;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              width: 2px;
              height: 27px;
              background-color: #e1251b;
            }
          }
        }
      }
    }
    main {
      float: right;
      width: 1000px;
    }
  }
</style>