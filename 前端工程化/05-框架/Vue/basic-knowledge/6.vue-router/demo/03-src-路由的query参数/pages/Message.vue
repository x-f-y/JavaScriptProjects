<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- query参数的字符串写法 -->
        <!--<router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp;-->
        <!-- query参数的对象写法 -->
        <router-link :to="{
          path: '/home/message/detail',
          query: {
            id: m.id,
            title: m.title
          }
        }">{{m.title}}</router-link>&nbsp;&nbsp;
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
    }
  }
</script>