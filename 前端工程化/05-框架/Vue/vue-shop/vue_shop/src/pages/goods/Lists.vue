<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索框和添加商品按钮区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
              v-model="queryInfo.query"
              clearable
              placeholder="请输入内容"
              @clear="getGoodsList">
            <el-button @click="getGoodsList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span=4>
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column width="95px" label="商品价格(元)" prop="goods_price"></el-table-column>
        <el-table-column width="70px" label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column width="140px" label="创建时间">
          <template scope="scope">
            {{scope.row.add_time | formatDate}}
          </template>
        </el-table-column>
        <el-table-column width="130px" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-button @click="deleteGood(scope.row.goods_id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器区域 -->
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Lists',
    data(){
      return {
        // 商品列表数据
        goodsList: [],
        // 查询参数对象
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        // 商品总数量
        total: 0
      }
    },
    methods: {
      // 发起请求获取所有商品列表数据
      async getGoodsList(){
        const { data: res } = await this.$http.get('goods',{ params: this.queryInfo })
        if(res.meta.status !== 200) return this.$message.error('获取商品列表数据失败')
        this.total = res.data.total
        this.goodsList = res.data.goods
      },
      // 监听分页器 pagesize 的改变
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize
        this.getGoodsList()
      },
      // 监听分页器 pagenum 的改变
      handleCurrentChange(newPage){
        this.queryInfo.pagenum = newPage
        this.getGoodsList()
      },
      // 点击删除按钮，删除对应的商品
      async deleteGood(goods_id){
        const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if(confirmResult === 'cancel') this.$message.info('已取消删除')
        else {
          const { data: res } = await this.$http.delete('goods/' + goods_id)
          if(res.meta.status !== 200) return this.$message.error('删除商品失败')
          this.$message.success('删除商品成功')
          this.getGoodsList()
        }
      },
      // 点击添加商品按钮，跳转到添加商品界面
      goAddPage(){
        this.$router.push('/home/addGood')
      }
    },
    created() {
      this.getGoodsList()
    },
    // 解决bug：用户直接在浏览器上输入路径或者直接点击浏览器的回退和前进按钮，但是左侧二级菜单激活选中状态不变
    beforeRouteEnter(to, from, next){
      next(vc => {
        sessionStorage.setItem('activePath', 'goods')
        vc.$store.dispatch('saveNavStatus', 'goods')
      })
    }
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
  }
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
  .el-pagination {
    margin-top: 15px;
  }
</style>