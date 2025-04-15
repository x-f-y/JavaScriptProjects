<template>
  <div>
    <TypeNav></TypeNav>
    <AddCart></AddCart>
    <ProductDetail></ProductDetail>
    <GuessLike></GuessLike>
  </div>
</template>

<script>
  import AddCart from "@/pages/Detail/AddCart";
  import ProductDetail from "@/pages/Detail/ProductDetail";
  import GuessLike from "@/pages/Detail/GuessLike";

  export default {
    name: "Detail",
    components: {
      AddCart,
      ProductDetail,
      GuessLike
    },
    mounted() {
      // 通知vuex发起请求获取商品详情的数据
      this.$store.dispatch('detail/getGoodsInfo', this.$route.params.skuId);
    }
  }
</script>

<style scoped lang="less">
</style>