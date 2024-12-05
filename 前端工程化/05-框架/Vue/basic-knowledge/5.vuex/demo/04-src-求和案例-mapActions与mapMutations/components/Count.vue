<template>
  <div>
    <h1>当前求和为：{{sum}}</h1>
    <h3>当前求和放大10倍为：{{bigSum}}</h3>
    <h3>我在{{school}}，学习{{subject}}</h3>
    <select v-model.number="step">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <!--<button @click="increment(step)">+</button>
    <button @click="decrement(step)">-</button>
    <button @click="incrementOdd(step)">当前求和为奇数再加</button>
    <button @click="incrementWait(step)">等一等再加</button>-->
    <button @click="JIA(step)">+</button>
    <button @click="JIAN(step)">-</button>
    <button @click="jiaOdd(step)">当前求和为奇数再加</button>
    <button @click="jiaWait(step)">等一等再加</button>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from "vuex"
  export default {
    name: 'Count',
    data() {
      return {
        step: 1,
      }
    },
    computed: {
      ...mapState(['sum', 'school', 'subject']),
      ...mapGetters(['bigSum'])
    },
    methods: {
      // ...mapMutations({increment: 'JIA', decrement: 'JIAN'}),
      // ...mapActions({incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
      ...mapMutations(['JIA', 'JIAN']),
      ...mapActions(['jiaOdd', 'jiaWait'])
    }
  }
</script>

<style scoped>
  button {
    margin-left: 5px;
  }
</style>
