<template>
  <ul class="right-list-container">
    <li v-for="(item, index) in list" :key="index">
      <span :class="{ active: item.isSelect }" @click="handleClick(item)">{{ item.name }}</span>
      <span :class="{ active: item.isSelect, aside: true }" v-if="item.aside" @click="handleClick(item)">{{ item.aside }}</span>
      <!-- 组件可以在自己的模板中递归调用自身，但必须为组件配置name选项 -->
      <!-- <RightList v-if="item.children" :list="item.children" @select="handleClick($event)" /> -->
      <RightList v-if="item.children" :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RightList',
  props: {
    list: {
      // [ { name: 'xxx', isSelect: true, aside: "demo" children: [ { name: 'yyy', isSelect: false }, ... ] }, ... ]
      type: Array,
      // 注意：默认值是对象或数组时，需要写成一个函数，将默认值返回
      default: () => []
    }
  },
  methods: {
    handleClick(item){
      if(!item.isSelect){
        this.$emit("select", item);
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.right-list-container {
  margin: 0;
  padding: 0;
  list-style-type: none;

  .right-list-container {
    margin-left: 1em;
  }

  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;

    > span {
      cursor: pointer;

      &.active {
        color: @warn;
        font-weight: bold;
      }
    }

    .aside {
      font-size: 12px;
      margin-left: 1em;
      color: @gray;
    }
  }
}
</style>