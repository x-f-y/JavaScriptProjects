<template>
  <ul class="todo-main">
    <transition-group>
      <MyItem v-for="todo in todos" :key="todo.id" :todo="todo"></MyItem>
    </transition-group>
  </ul>
</template>

<script>
  import MyItem from './MyItem'
  export default {
    name: 'MyList',
    components: {
      MyItem
    },
    props: ['todos']
  }
</script>

<style scoped>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }
  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
  @keyframes todo {
    from{
      transform: translateX(100%);
    }
    to{
      transform: translateX(0);
    }
  }
  .v-enter-active {
    animation: todo 500ms;
  }
  .v-leave-active {
    animation: todo 500ms reverse;
  }
</style>