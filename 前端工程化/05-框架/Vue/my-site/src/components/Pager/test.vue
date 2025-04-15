<template>
  <!-- Pager组件抛出（触发）pageChange事件的时候，可以使用$event访问到被抛出的值（也就是传递的参数，这里是新的页码） -->
  <Pager :current="current" :total="total" @pageChange="handlePageChange($event)" />
</template>

<script>
import Pager from './';

export default {
  components: {
    Pager
  },
  data(){
    return {
      current: 1,
      total: 302
    }
  },
  methods: {
    handlePageChange(newPage){
      this.current = newPage;
      console.log(newPage);
    }
  }
}
</script>

<style scoped></style>
