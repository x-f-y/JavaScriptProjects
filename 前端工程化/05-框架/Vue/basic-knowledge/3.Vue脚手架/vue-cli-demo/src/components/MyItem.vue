<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="select"/>
      <span v-show="!canEdit">{{todo.title}}</span>
      <input v-show="canEdit" type="text" :value="todo.title" @blur="finishEdit" ref="ipt">
    </label>
    <button class="btn btn-danger" @click="deleteItem">删除</button>
    <button v-show="!canEdit" class="btn btn-edit" @click="edit">编辑</button>
  </li>
</template>

<script>
  import pubsub from 'pubsub-js'
  export default {
    name: 'MyItem',
    data(){
      return {
        canEdit: false,
      }
    },
    props: ['todo'],
    methods: {
      select(){
        this.$bus.$emit('checkTodo', this.todo.id)
      },
      deleteItem(){
        if(confirm('确认删除吗？')){
          pubsub.publish('deleteTodo', this.todo.id)
        }
      },
      edit(){
        this.canEdit = true
        this.$nextTick(function(){
          this.$refs.ipt.focus()
        })
      },
      finishEdit(e){
        this.canEdit = false
        if(e.target.value.trim()){
          this.$bus.$emit('updateTodo', this.todo.id, e.target.value)
        }else{
          alert('输入不能为空')
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