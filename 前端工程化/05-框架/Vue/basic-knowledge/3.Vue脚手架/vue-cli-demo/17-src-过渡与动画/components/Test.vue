<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="atguigu" appear>
      <h1 v-show="isShow">你好啊</h1>
    </transition>
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
@keyframes hello {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
.atguigu-enter-active {
  animation: hello 600ms linear;
}
.atguigu-leave-active {
  animation: hello 600ms linear reverse;
}
h1 {
  text-align: center;
  background-color: orange;
}
</style>