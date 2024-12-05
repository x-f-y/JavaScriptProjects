<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <router-link :to="{
          name: 'xiangqing',
          params: {
            id: m.id,
            title: m.title,
          },
          query: {
            demo: 'hello world'
          }
        }">{{m.title}}</router-link>&nbsp;&nbsp;
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    data(){
      return {
        messageList: [
          {id: '001', title: '消息001'},
          {id: '002', title: '消息002'},
          {id: '003', title: '消息003'},
        ]
      }
    },
    methods: {
      pushShow(m){
        this.$router.push({
          name: 'xiangqing',
          params: {
            id: m.id,
            title: m.title,
          },
          query: {
            demo: 'hello world'
          }
        })
      },
      replaceShow(m){
        this.$router.replace({
          name: 'xiangqing',
          params: {
            id: m.id,
            title: m.title,
          },
          query: {
            demo: 'hello world'
          }
        })
      },
    }
  }
</script>