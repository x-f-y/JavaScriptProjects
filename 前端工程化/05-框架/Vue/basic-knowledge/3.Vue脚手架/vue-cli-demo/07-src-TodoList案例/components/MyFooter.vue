<template>
  <div class="todo-footer" v-show="allTodo">
    <label>
      <input type="checkbox" :checked="isAllChecked" @change="checkAll"/>
    </label>
    <span>
      <span>已完成{{finishedTodo}}</span> / 全部{{allTodo}}
    </span>
    <button class="btn btn-danger" @click="deleteCheckedTodo">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: 'MyFooter',
    props: ['todos', 'checkAllTodo', 'deleteCheckedTodo'],
    computed: {
      finishedTodo(){
        return this.todos.reduce((pre, cur) => {
          return pre + (cur.done ? 1 : 0)
        }, 0)
      },
      allTodo(){
        return this.todos.length
      },
      isAllChecked(){
        return this.finishedTodo === this.allTodo && this.allTodo > 0
      }
    },
    methods: {
      checkAll(e){
        this.checkAllTodo(e.target.checked)
      }
    }
  }
</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }
  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }
  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>