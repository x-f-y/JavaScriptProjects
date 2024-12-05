<template>
  <div class="container">
    <Category title="游戏">
      <template v-slot="{games}">
        <ul>
          <li v-for="(game, index) in games" :key="index">{{game}}</li>
        </ul>
      </template>
      <template v-slot:center="{message}">
        <h3 style="background-color: red">{{message}}</h3>
      </template>
    </Category>

    <Category title="游戏">
      <template v-slot="{games}">
        <ol>
          <li v-for="(game, index) in games" :key="index">{{game}}</li>
        </ol>
      </template>
      <template v-slot:center="{message}">
        <h3 style="background-color: green">{{message}}</h3>
      </template>
    </Category>

    <Category title="游戏">
      <template v-slot:default="{games}">
        <h4 v-for="(game, index) in games" :key="index">{{game}}</h4>
      </template>
      <template v-slot:center="{message}">
        <h3 style="background-color: blue">{{message}}</h3>
      </template>
    </Category>
  </div>
</template>

<script>
  import Category from './components/Category'
  export default {
    name: 'App',
    components: {
      Category
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>