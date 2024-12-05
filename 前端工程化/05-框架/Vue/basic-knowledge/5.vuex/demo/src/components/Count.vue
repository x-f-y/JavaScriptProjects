<template>
  <div>
    <h1>当前求和为：{{sum}}</h1>
    <h3>当前求和放大10倍为：{{bigSum}}</h3>
    <h3>我在{{school}}，学习{{subject}}</h3>
    <h3 style="color: red">Person组件的总人数为{{personList.length}}</h3>
    <select v-model.number="step">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(step)">+</button>
    <button @click="decrement(step)">-</button>
    <button @click="incrementOdd(step)">当前求和为奇数再加</button>
    <button @click="incrementWait(step)">等一等再加</button>
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
      ...mapState('countAbout', ['sum', 'school', 'subject']),
      ...mapState('personAbout', ['personList']),
      ...mapGetters('countAbout', ['bigSum'])
    },
    methods: {
      ...mapMutations('countAbout', {increment: 'JIA', decrement: 'JIAN'}),
      ...mapActions('countAbout', {incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
    }
  }
</script>

<style scoped>
  button {
    margin-left: 5px;
  }
</style>
