<template>
  <div @click="handleClick" v-show="show" class="to-top-container">Top</div>
</template>

<script>
export default {
  data(){
    return {
      show: false
    }
  },
  methods: {
    handleScroll(dom){
      if(!dom){
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleClick(){
      this.$bus.$emit('setMainScroll', 0);
    }
  },
  created(){
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed(){
    this.$bus.$off('mainScroll', this.handleScroll);
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.to-top-container {
  position: fixed;
  z-index: 99;
  right: 50px;
  bottom: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: @primary;
  color: #fff;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
</style>