<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="select"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" @click="deleteItem">删除</button>
  </li>
</template>

<script>
  export default {
    name: 'MyItem',
    props: ['todo', 'checkTodo', 'deleteTodo'],
    methods: {
      select(){
        this.checkTodo(this.todo.id)
      },
      deleteItem(){
        if(confirm('确认删除吗？')){
          this.deleteTodo(this.todo.id)
        }
      }
    }
  }
</script>

<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }
  li label {
    float: left;
    cursor: pointer;
  }
  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }
  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }
  li:before {
    content: initial;
  }
  li:last-child {
    border-bottom: none;
  }
  li:hover {
    background-color: #dddddd;
  }
  li:hover button {
    display: inline-block;
  }
</style>