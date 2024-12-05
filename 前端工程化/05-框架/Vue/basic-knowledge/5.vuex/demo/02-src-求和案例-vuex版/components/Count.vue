<template>
  <div>
    <h1>当前求和为：{{$store.state.sum}}</h1>
    <select v-model.number="step">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: 'Count',
  data() {
    return {
      step: 1,
    }
  },
  methods: {
    increment() {
      this.$store.commit('JIA', this.step)
    },
    decrement() {
      this.$store.commit('JIAN', this.step)
    },
    incrementOdd() {
      this.$store.dispatch('jiaOdd', this.step)
    },
    incrementWait() {
      this.$store.dispatch('jiaWait', this.step)
    },
  }
}
</script>

<style scoped>
  button {
    margin-left: 5px;
  }
</style>
