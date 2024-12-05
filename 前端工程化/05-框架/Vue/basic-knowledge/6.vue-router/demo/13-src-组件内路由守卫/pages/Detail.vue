<template>
  <ul>
    <li>消息编号：{{id}}</li>
    <li>消息标题：{{title}}</li>
    <li>测试一下：{{demo}}</li>
  </ul>
</template>

<script>
  export default {
    name: 'Detail',
    props: ['id', 'title', 'demo']
  }
</script>