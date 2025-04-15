<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floorObj="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import ListContainer from "@/pages/Home/ListContainer";
  import TodayRecommend from "@/pages/Home/TodayRecommend";
  import Rank from "@/pages/Home/Rank";
  import Like from "@/pages/Home/Like";
  import Floor from "@/pages/Home/Floor";
  import Brand from "@/pages/Home/Brand";

  export default {
    name: 'Home',
    components: {
      ListContainer,
      TodayRecommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    computed: {
      ...mapState('home', {
        floorList: state => state.floorList
      })
    },
    mounted() {
      // 通知vuex发起请求获取楼层数据
      this.$store.dispatch('home/getFloorList');
    }
  }
</script>

<style scoped lang="less">

</style>