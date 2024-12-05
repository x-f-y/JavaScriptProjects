<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加分类按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <tree-table
          :data="cateList"
          :columns="columns"
          border
          :show-row-hover="false"
          :show-index="true"
          :expand-type="false"
          index-text="#"
          :selection-type="false">
        <!-- 是否有效自定义模板列 -->
        <template slot="isValid" scope="scope">
          <!-- <pre>{{scope}}</pre> -->
          <i class="el-icon-success" style="color: lightgreen" v-if="!scope.row.cat_deleted"></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </template>
        <!-- 排序自定义模板列 -->
        <template slot="sort" scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
          <el-tag size="mini" v-else-if="scope.row.cat_level === 2" type="warning">三级</el-tag>
        </template>
        <!-- 操作自定义模板列 -->
        <template slot="operation" slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showEditCateDialog(scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteCate(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页器区域 -->
      <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :page-sizes="[3, 5, 10, 15]"
          :current-page="queryInfo.pagenum"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" @close="addCateDialogClosed">
      <el-form status-icon ref="addCateFormRef" :model="addCateForm" :rules="addCateFormRules" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
              :props="cascaderProps"
              :options="parentCateList"
              clearable
              v-model="selectedKeys"
              @change="parentCateChanged"></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改分类对话框 -->
    <el-dialog title="修改分类" :visible.sync="editCateDialogVisible">
      <el-form status-icon ref="editCateFormRef" :model="editCateForm" :rules="editCateFormRules" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Categories',
    data(){
      return {
        // 商品分类数据列表
        cateList: [],
        // 发送请求获取商品分类数据的参数列表
        queryInfo: {
          type: 3,
          pagenum: 1,
          pagesize: 5
        },
        // 商品分类总数据条数
        total: 0,
        // 表格各列的配置
        columns: [
          {
            label: '分类名称',
            prop: 'cat_name'
          },
          {
            label: '是否有效',
            type: 'template',
            template: 'isValid'
          },
          {
            label: '排序',
            type: 'template',
            template: 'sort'
          },
          {
            label: '操作',
            type: 'template',
            template: 'operation'
          }
        ],
        // 控制添加分类对话框的显示与隐藏
        addCateDialogVisible: false,
        // 添加分类表单的数据对象
        addCateForm: {
          // 父分类的 id，为 0 表示默认添加一级分类
          cat_pid: 0,
          // 分类名称
          cat_name: '',
          // 分类层级，为 0 表示默认添加一级分类
          cat_level: 0
        },
        // 级联选择器选中的 id 数组
        selectedKeys: [],
        // 添加分类表单的验证规则对象
        addCateFormRules: {
          cat_name: [
            { trigger: 'blur', required: true, message: '请输入分类名称' }
          ]
        },
        // 父级分类列表数据
        parentCateList: [],
        // 级联选择器配置选项
        cascaderProps: {
          expandTrigger: 'hover',
          label: 'cat_name',
          value: 'cat_id',
          children: 'children',
          checkStrictly: true
        },
        // 控制修改分类对话框的显示与隐藏
        editCateDialogVisible: false,
        // 修改分类表单的数据对象
        editCateForm: {
          cat_name: ''
        },
        // 修改分类表单的验证规则对象
        editCateFormRules: {
          cat_name: [
            { trigger: 'blur', required: true, message: '请输入分类名称' }
          ]
        },
        // 点击每一个 tableItem 的编辑按钮和删除按钮时，该 tableItem 对应的分类 id
        selectedCatId: 0
      }
    },
    methods: {
      // 获取商品分类数据
      async getCateList(){
        const { data: res } = await this.$http.get('categories',{ params: this.queryInfo })
        if(res.meta.status !== 200) return this.$message.error('获取分类数据失败')
        this.cateList = res.data.result
        this.total = res.data.total
      },
      // pageSize 改变时会触发
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize
        this.getCateList()
      },
      // currentPage 改变时会触发
      handleCurrentChange(newPage){
        this.queryInfo.pagenum = newPage
        this.getCateList()
      },
      // 获取父级分类列表数据
      async getParentCateList(){
        const { data: res } = await this.$http.get('categories',{ params: { type: 2 } })
        if(res.meta.status !== 200) return this.$message.error('获取父级分类数据失败')
        this.parentCateList = res.data
      },
      // 点击添加分类按钮，展示添加分类对话框
      showAddCateDialog(){
        this.getParentCateList()
        this.addCateDialogVisible = true
      },
      // 当级联选择器选中的节点发生变化时触发
      parentCateChanged(){
        if(this.selectedKeys.length === 0){
          this.addCateForm.cat_pid = 0
          this.addCateForm.cat_level = 0
        } else if(this.selectedKeys.length > 0){
          this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
          this.addCateForm.cat_level = this.selectedKeys.length
        }
      },
      // 监听添加分类对话框的关闭事件
      addCateDialogClosed(){
        this.$refs.addCateFormRef.resetFields()
        this.selectedKeys = []
        this.addCateForm.cat_level = 0
        this.addCateForm.cat_pid = 0
      },
      // 点击添加分类对话框的确定按钮触发的事件
      addCate(){
        // 表单预验证
        this.$refs.addCateFormRef.validate(async valid => {
          if(!valid) return
          // 预验证通过，发送请求添加分类
          const { data: res } = await this.$http.post('categories', this.addCateForm)
          if(res.meta.status !== 201) return this.$message.error('添加分类失败')
          this.$message.success('添加分类成功')
          this.getCateList()
          this.addCateDialogVisible = false
        })
      },
      // 点击每一个 tableItem 的编辑分类按钮，展示修改分类对话框
      showEditCateDialog(cate){
        this.selectedCatId = cate.cat_id
        this.editCateForm.cat_name = cate.cat_name
        this.editCateDialogVisible = true
      },
      // 点击修改分类对话框的确定按钮触发的事件
      editCate(){
        // 表单预验证
        this.$refs.editCateFormRef.validate(async valid => {
          if(!valid) return
          // 预验证通过，发起请求修改分类
          const { data: res } = await this.$http.put('categories/' + this.selectedCatId, this.editCateForm)
          if(res.meta.status !== 200) return this.$message.error('修改分类失败')
          this.$message.success('修改分类成功')
          this.getCateList()
          this.editCateDialogVisible = false
        })
      },
      // 点击每一个 tableItem 的删除分类按钮触发的事件
      async deleteCate(cat_id){
        const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if(confirmResult === 'cancel'){
          this.$message.info('已取消删除')
        }else if(confirmResult === 'confirm'){
          const { data: res } = await this.$http.delete('categories/' + cat_id)
          if(res.meta.status !== 200) return this.$message.error('删除分类失败')
          this.$message.success('删除分类成功')
          this.getCateList()
        }
      }
    },
    created() {
      this.getCateList()
    },
    // 解决bug：用户直接在浏览器上输入路径或者直接点击浏览器的回退和前进按钮，但是左侧二级菜单激活选中状态不变
    beforeRouteEnter(to, from, next){
      next(vc => {
        sessionStorage.setItem('activePath', 'categories')
        vc.$store.dispatch('saveNavStatus', 'categories')
      })
    }
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
  }
  .zk-table {
    margin-top: 15px;
  }
  .el-pagination {
    margin-top: 15px;
  }
  .el-cascader {
    width: 100%;
  }
</style>