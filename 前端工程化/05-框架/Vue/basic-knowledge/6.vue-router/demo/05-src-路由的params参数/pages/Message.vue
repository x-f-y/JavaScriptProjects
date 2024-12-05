<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- params参数的字符串写法 -->
        <!--<router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp;-->
        <!-- params参数的对象写法 -->
        <router-link :to="{
          name: 'xiangqing',
          // path: '/home/message/detail', // 注意：对于这种写法，只能用name指定跳转的路径，不能用path
          params: {
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