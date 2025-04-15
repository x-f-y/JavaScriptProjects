<template>
  <div class="test-container">
    <Loading v-if="isLoading" />
    <button @click="isLoading = !isLoading">切换隐藏/显示</button>
  </div>
</template>

<script>
import Loading from './';

export default {
  components: {
    Loading
  },
  data(){
    return {
      isLoading: true
    }
  }
}
</script>

<style scoped>
.test-container {
  height: 400px;
  position: relative;
}
</style>