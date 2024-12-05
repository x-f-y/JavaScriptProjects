<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>
      <!-- 级联选择器区域 -->
      <el-row class="cascader">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
              v-model="selectedCateKeys"
              :options="cateList"
              :props="{ expandTrigger: 'hover', ...cateProps }"
              @change="handleChange"></el-cascader>
        </el-col>
      </el-row>
      <!-- tabs 标签页区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加动态参数的面板 -->
          <el-button
              type="primary"
              size="mini"
              :disabled="isDisabled"
              @click="addParamsDialogVisible = true">添加参数</el-button>
          <el-table v-if="activeName === 'many'" :data="paramList" border stripe>
            <el-table-column type="expand">
              <template scope="scope">
                <el-row>
                  <el-col>
                    <el-tag
                        closable
                        v-for="(v, i) in scope.row.attr_vals"
                        :key="i"
                        @close="handleTagClosed(i, scope.row)">{{v}}</el-tag>
                    <el-input
                        v-if="scope.row.inputVisible"
                        class="input-new-tag"
                        v-model="scope.row.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(scope.row)"
                        @blur="handleInputConfirm(scope.row)">
                    </el-input>
                    <el-button v-else size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <pre>{{scope.row}}</pre> -->
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showEditParamsDialog(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加静态属性的面板 -->
          <el-button
              type="primary"
              size="mini"
              :disabled="isDisabled"
              @click="addParamsDialogVisible = true">添加属性</el-button>
          <el-table v-if="activeName === 'only'" :data="paramList" border stripe>
            <el-table-column type="expand">
              <template scope="scope">
                <el-row>
                  <el-col>
                    <el-tag
                        closable
                        v-for="(v, i) in scope.row.attr_vals"
                        :key="i"
                        @close="handleTagClosed(i, scope.row)">{{v}}</el-tag>
                    <el-input
                        v-if="scope.row.inputVisible"
                        class="input-new-tag"
                        v-model="scope.row.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(scope.row)"
                        @blur="handleInputConfirm(scope.row)">
                    </el-input>
                    <el-button v-else size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <pre>{{scope.row}}</pre> -->
                <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showEditParamsDialog(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加动态参数和添加静态属性的对话框 -->
    <el-dialog :title="'添加' + tileText" :visible.sync="addParamsDialogVisible" @close="addParamsDialogClosed">
      <el-form status-icon :rules="addParamsFormRules" ref="addParamsFormRef" :model="addParamsForm" label-width="80px">
        <el-form-item :label="tileText" prop="attr_name">
          <el-input v-model="addParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addParamsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改动态参数和修改静态属性的对话框 -->
    <el-dialog :title="'修改' + tileText" :visible.sync="editParamsDialogVisible" @close="editParamsDialogClosed">
      <el-form status-icon :rules="editParamsFormRules" ref="editParamsFormRef" :model="editParamsForm" label-width="80px">
        <el-form-item :label="tileText" prop="attr_name">
          <el-input v-model="editParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editParamsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Params',
    data(){
      return {
        // 所有商品分类数据列表
        cateList: [],
        // 级联选择器选中的 id 数组
        selectedCateKeys: [],
        // 级联选择器的配置选项
        cateProps: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        // 被激活选中的 tabs 标签页的名称
        activeName: 'many',
        // 动态参数和静态属性的数据列表
        paramList: [],
        // 控制添加动态参数和静态属性对话框的显示与隐藏
        addParamsDialogVisible: false,
        // 控制修改动态参数和修改属性对话框的显示与隐藏
        editParamsDialogVisible: false,
        // 添加参数表单的数据对象
        addParamsForm: {
          attr_name: ''
        },
        // 修改参数表单的数据对象
        editParamsForm: {
          attr_name: ''
        },
        // 添加分类参数表单的验证规则对象
        addParamsFormRules: {
          attr_name: [
            { trigger: 'blur', required: true, message: '请输入参数名称' }
          ]
        },
        // 修改分类参数表单的验证规则对象
        editParamsFormRules: {
          attr_name: [
            { trigger: 'blur', required: true, message: '请输入参数名称' }
          ]
        },
      }
    },
    computed: {
      // 控制添加参数按钮和添加属性按钮的禁用状态
      isDisabled(){
        return this.selectedCateKeys.length !== 3
      },
      // 当前选中的三级分类的 id
      selectedThreeCateId(){
        return this.selectedCateKeys.length===3 ? this.selectedCateKeys[2] : null
      },
      // 添加参数和修改参数对话框的标题
      tileText(){
        return this.activeName === 'many' ? '动态参数' : '静态属性'
      }
    },
    methods:{
      // 获取所有商品分类数据
      async getCateList(){
        const { data: res } = await this.$http.get('categories')
        if(res.meta.status !== 200) return this.$message.error('获取分类列表数据失败')
        this.cateList = res.data
      },
      // 级联选择器选中的节点发生变化时触发
      handleChange(){
        if (this.selectedCateKeys.length !== 3) {
          // 选中的是不是三级分类
          this.selectedCateKeys = []
          this.paramList = []
        } else {
          this.getParamList(this.activeName)
        }
      },
      // 发起请求获取参数列表
      async getParamList(type){
        if(this.selectedCateKeys.length === 3){
          const { data: res } = await this.$http.get(`categories/${this.selectedThreeCateId}/attributes`,{
            params: {
              sel: type
            }
          })
          if(res.meta.status !== 200) return this.$message.error('获取参数列表失败')
          res.data.forEach(v => {
            v.attr_vals = v.attr_vals ? v.attr_vals.split(' ') : []
            // 控制按钮与输入框的切换显示
            v.inputVisible = false,
            // 绑定输入框输入的内容
            v.inputValue = ''
          })
          this.paramList = res.data
        }
      },
      // tabs 标签页被选中时触发
      handleTabClick(){
        // 重新发起请求获取参数列表
        this.getParamList(this.activeName)
      },
      // 监听添加参数对话框的关闭事件
      addParamsDialogClosed(){
        this.$refs.addParamsFormRef.resetFields()
      },
      // 监听修改参数对话框的关闭事件
      editParamsDialogClosed(){
        this.$refs.editParamsFormRef.resetFields()
      },
      // 点击添加参数对话框的确定按钮触发的事件
      addParams(){
        this.$refs.addParamsFormRef.validate(async valid => {
          if(!valid) return
          const { data: res } = await this.$http.post(`categories/${this.selectedThreeCateId}/attributes`, {
            attr_name: this.addParamsForm.attr_name,
            attr_sel: this.activeName
          })
          if(res.meta.status !== 201) return this.$message.error('添加失败')
          this.$message.success('添加成功')
          this.getParamList(this.activeName)
          this.addParamsDialogVisible = false
        })
      },
      // 点击每一个 tableItem 的编辑按钮，展示修改参数对话框
      showEditParamsDialog(params){
        this.editParamsForm.attr_id = params.attr_id
        this.editParamsForm.attr_name = params.attr_name
        this.editParamsDialogVisible = true
      },
      // 点击修改参数对话框的确定按钮触发的事件
      editParams(){
        this.$refs.editParamsFormRef.validate(async valid => {
          if(!valid) return
          const { data: res } = await this.$http.put(`categories/${this.selectedThreeCateId}/attributes/${this.editParamsForm.attr_id}`,{
            attr_name: this.editParamsForm.attr_name,
            attr_sel: this.activeName
          })
          if(res.meta.status !== 200) return this.$message.error('修改参数失败')
          this.$message.success('修改参数成功')
          this.getParamList(this.activeName)
          this.editParamsDialogVisible = false
        })
      },
      // 点击每一个 tableItem 的删除按钮，删除对应的参数列表
      async deleteParams(attr_id){
        const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if(confirmResult === 'cancel') return this.$message.info('已取消删除')
        else if(confirmResult === 'confirm') {
          const { data: res } = await this.$http.delete(`categories/${this.selectedThreeCateId}/attributes/${attr_id}`)
          if(res.meta.status !== 200) return this.$message.error('删除参数失败')
          this.$message.success('删除参数成功')
          this.getParamList(this.activeName)
        }
      },
      // 将对 attr_vals 的操作保存到数据库
      async saveAttrVals(params){
        const { data: res } = await this.$http.put(`categories/${this.selectedThreeCateId}/attributes/${params.attr_id}`,{
          attr_name: params.attr_name,
          attr_sel: params.attr_sel,
          attr_vals: params.attr_vals.join(' ')
        })
        if(res.meta.status !== 200) return this.$message.error('添加参数项失败')
      },
      // 输入框失去焦点或者按下 enter 键都会触发的事件
      handleInputConfirm(params){
        if(!params.inputValue.trim()){
          params.inputValue = ''
          params.inputVisible = false
          return
        }
        params.attr_vals.push(params.inputValue.trim())
        params.inputValue = ''
        params.inputVisible = false
        this.saveAttrVals(params)
      },
      // 点击 new tag 按钮触发的事件
      showInput(params){
        params.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 点击，每一个 tag 的关闭图标触发的事件
      handleTagClosed(index, params){
        params.attr_vals.splice(index, 1)
        this.saveAttrVals(params)
      }
    },
    created() {
      this.getCateList()
    },
    // 解决bug：用户直接在浏览器上输入路径或者直接点击浏览器的回退和前进按钮，但是左侧二级菜单激活选中状态不变
    beforeRouteEnter(to, from, next){
      next(vc => {
        sessionStorage.setItem('activePath', 'params')
        vc.$store.dispatch('saveNavStatus', 'params')
      })
    }
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
  }
  .cascader {
    margin: 15px 0px;
  }
  .el-cascader {
    width: 250px;
  }
  .el-table {
    margin-top: 15px;
    font-size: 12px;
    .el-row {
      margin: 0 50px;
    }
  }
  .el-tag {
    margin: 10px;
  }
  .input-new-tag {
    width: 120px;
  }
</style>