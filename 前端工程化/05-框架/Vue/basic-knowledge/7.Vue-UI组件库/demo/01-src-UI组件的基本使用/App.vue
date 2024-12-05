<template>
  <div>
    <button>原生的按钮</button>
    <input type="text">
    <hr>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <hr>
    <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
    <hr>
    <el-button icon="el-icon-search" circle></el-button>
    <el-button type="primary" icon="el-icon-zoom-out" circle></el-button>
    <el-button type="success" icon="el-icon-check" circle></el-button>
    <el-button type="info" icon="el-icon-message" circle></el-button>
    <el-button type="warning" icon="el-icon-star-off" circle></el-button>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
