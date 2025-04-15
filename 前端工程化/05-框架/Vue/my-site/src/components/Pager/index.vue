<template>
  <!-- 可以使用$event获得原始的DOM事件，并将其传入handleClick函数 -->
  <div class="pager-container" v-if="totalPage > 1" @click="handleClick($event)">
    <a :data-page="1" :class="{ disabled: current === 1 }">|&lt;&lt;</a>
    <a :data-page="current - 1" :class="{ disabled: current === 1 }">&lt;&lt;</a>
    <a :data-page="n" v-for="(n, i) in pageNumbers" :key="i" :class="{ active: n === current }">{{ n }}</a>
    <a :data-page="current + 1" :class="{ disabled: current === totalPage }">&gt;&gt;</a>
    <a :data-page="totalPage" :class="{ disabled: current === totalPage }">&gt;&gt;|</a>
  </div>
</template>

<style lang="less" scoped>
// 注意：src目录在脚本中使用 @ 来表示，而在样式中要使用 ~@ 来表示
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;

  > a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;

    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }

    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>

<script>
export default {
  props: {
    // 当前页
    current: {
      type: Number,
      default: 1
    },
    // 总数据量
    total: {
      type: Number,
      default: 0
    },
    // 页容量
    limit: {
      type: Number,
      default: 10
    },
    // 可见页码数量
    visibleNumber: {
      type: Number,
      default: 10
    }
  },
  computed: {
    // 总页数
    totalPage(){
      return Math.ceil(this.total / this.limit);
    },
    // 显示的最小页码
    visibleMin(){
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if(min < 1){
        min = 1;
      }
      return min;
    },
    // 显示的最大页码
    visibleMax(){
      let max = this.visibleMin + this.visibleNumber - 1;
      if(max > this.totalPage){
        max = this.totalPage;
      }
      return max;
    },
    // 显示的页码范围数组
    pageNumbers(){
      const nums = [];
      for(let i = this.visibleMin; i <= this.visibleMax; i++){
        nums.push(i);
      }
      return nums;
    }
  },
  methods: {
    handleClick(e){
      let page = e.target.dataset.page;
      if(!page){
        return;
      }
      page = Number(page);
      if(page < 1){
        page = 1;
      }
      if(page > this.totalPage){
        page = this.totalPage;
      }
      if(page === this.current){
        return;
      }
      this.$emit('pageChange', page);
    }
  }
}
</script>