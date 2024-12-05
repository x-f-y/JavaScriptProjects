<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group name="atguigu" appear>
      <h1 v-show="isShow" key="1">你好啊</h1>
      <h1 v-show="isShow" key="2">尚硅谷</h1>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
.atguigu-enter, .atguigu-leave-to {
  transform: translateX(-100%);
}
.atguigu-enter-active, .atguigu-leave-active {
  transition: 600ms linear;
}
.atguigu-leave, .atguigu-enter-to {
  transform: translateX(0);
}
h1 {
  text-align: center;
  background-color: orange;
}
</style>