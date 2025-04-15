<template>
  <div class="search-selector heart">
    <div class="brand clearfix">
      <div class="title">品牌</div>
      <div class="body">
        <ul class="clearfix">
          <li v-for="trademark in trademarkList" :key="trademark.tmId" @click="handleTrademarkClick(trademark)">
            {{trademark.tmName}}
          </li>
        </ul>
      </div>
      <div class="right">
        <a href="javascript:void(0);" class="multiple">多选</a>
        <a href="javascript:void(0);" class="more">更多</a>
      </div>
    </div>
    <div class="row-item clearfix" v-for="attr in attrsList" :key="attr.attrId">
      <div class="title">{{attr.attrName}}</div>
      <ul class="body clearfix">
        <li v-for="(attrValue, index) in attr.attrValueList" :key="index" @click="handleAttrClick(attr,attrValue)">
          <a href="javascript:void(0);">{{attrValue}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchSelector",
    props: ['attrsList', 'trademarkList'],
    methods: {
      // 点击品牌的事件处理函数
      handleTrademarkClick(trademark){
        // 触发自定义事件，传递数据给Search组件，并通知Search组件重新发起请求获取数据
        this.$bus.$emit('deliverTrademark', trademark);
      },
      // 点击售卖属性的事件处理函数
      handleAttrClick(attr, attrValue){
        // 触发自定义事件，传递数据给Search组件，并通知Search组件重新发起请求获取数据
        this.$bus.$emit('deliverAttr', attr, attrValue);
      }
    }
  }
</script>

<style scoped lang="less">
  .search-selector {
    .brand {
      border: 1px solid #e4e4e4;
      display: flex;
      .title {
        float: left;
        width: 125px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        line-height: 26px;
        background-color: #f1f1f1;
      }
      .body {
        float: left;
        padding: 10px 0 10px 15px;
        ul {
          width: 945px;
          li {
            float: left;
            width: 106px;
            height: 52px;
            border: 1px solid #e4e4e4;
            margin-left: -1px;
            text-align: center;
            line-height: 52px;
            color: #e1251b;
            font-weight: 700;
            font-style: italic;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            img {
              width: 100%;
              height: 100%;
            }
            &:nth-child(n+10){
              margin-top: -1px;
            }
          }
        }
      }
      .right {
        float: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding-left: 10px;
        line-height: 18px;
        .multiple {
          display: inline-block;
          height: 20px;
          border: 1px solid #d5d5d5;
          background-color: #ffffff;
          padding: 0 10px;
        }
        .more {
          color: #666666;
          margin-left: 5px;
        }
      }
    }
    .row-item {
      border: 1px solid #e4e4e4;
      border-top-width: 0;
      .title {
        float: left;
        width: 125px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        line-height: 26px;
        background-color: #f1f1f1;
      }
      .body {
        float: left;
        color: #666666;
        height: 36px;
        display: flex;
        align-items: center;
        padding-left: 15px;
        li {
          float: left;
          margin-right: 30px;
          a {}
        }
      }
    }
  }
</style>