<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"></MyHeader>
        <MyList :todos="todos"></MyList>
        <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @deleteCheckedTodo="deleteCheckedTodo"></MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'
  import MyHeader from './components/MyHeader'
  import MyList from './components/MyList'
  import MyFooter from './components/MyFooter'
  export default {
    name: 'App',
    data(){
      return {
        todos: JSON.parse(localStorage.getItem('todos')) || []
      }
    },
    components: {
      MyHeader,
      MyList,
      MyFooter
    },
    methods: {
      addTodo(todoObj){
        this.todos.unshift(todoObj)
      },
      checkTodo(id){
        this.todos.forEach(v => {
          if(v.id === id){
            v.done = !v.done
          }
        })
      },
      deleteTodo(_, id){
        this.todos = this.todos.filter(v => {
          return v.id !== id
        })
      },
      checkAllTodo(flag){
        this.todos.forEach(v => v.done = flag)
      },
      deleteCheckedTodo(){
        this.todos = this.todos.filter(v => v.done === false)
      }
    },
    watch: {
      todos: {
        deep: true,
        handler(value){
          localStorage.setItem('todos', JSON.stringify(value))
        }
      }
    },
    mounted() {
      this.$bus.$on('checkTodo', this.checkTodo)
      this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
    },
    beforeDestroy() {
      this.$bus.$off('checkTodo')
      pubsub.unsubscribe(this.pubId)
    }
  }
</script>

<style>
  body {
    background: #fff;
  }
  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }
  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }
  .btn:focus {
    outline: none;
  }
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>