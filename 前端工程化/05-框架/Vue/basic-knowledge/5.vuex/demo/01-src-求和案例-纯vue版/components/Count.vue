<template>
  <div>
    <h1>当前求和为：{{sum}}</h1>
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
      sum: 0,
      step: 1
    }
  },
  methods: {
    increment() {
      this.sum += this.step
    },
    decrement() {
      this.sum -= this.step
    },
    incrementOdd() {
      if (this.sum % 2) {
        this.sum += this.step
      }
    },
    incrementWait() {
      setTimeout(() => {
        this.sum += this.step
      }, 500)
    },
  },
}
</script>

<style scoped>
  button {
    margin-left: 5px;
  }
</style>
