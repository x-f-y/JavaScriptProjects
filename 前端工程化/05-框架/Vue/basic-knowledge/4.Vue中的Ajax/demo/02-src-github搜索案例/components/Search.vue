<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="keyWord"/>&nbsp;
      <button @click="getUsers">Search</button>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Search',
    data(){
      return {
        keyWord: ''
      }
    },
    methods: {
      getUsers(){
        this.$bus.$emit('updateStateData', { isFirst: false, isLoading: true })
        axios.get('https://api.github.com/search/users?q=' + this.keyWord).then(response => {
          this.$bus.$emit('updateStateData', { isLoading: false, isSucceed: true })
          this.$bus.$emit('getUsers', response.data.items)
        }).catch(error => {
          this.$bus.$emit('updateStateData', { isLoading: false, errMessage: error.message })
        })
      }
    },
  }
</script>