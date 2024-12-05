<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索框和添加用户按钮 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="173px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" @close="addFormClosed">
      <el-form status-icon :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" @close="editFormClosed">
      <el-form status-icon :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" @close="setRoleDialogClosed">
      <el-form :model="userInfo" label-width="85px">
        <el-form-item label="当前的用户">
          <el-input v-model="userInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="当前的角色">
          <el-input v-model="userInfo.role_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="分配新角色">
          <el-select v-model.number="selectdRoleId" placeholder="请选择">
            <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data(){
    // 自定义邮箱的验证规则
    var checkEmail = (rule, value, callback) => {
      const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if(!emailReg.test(value)) {
        return callback(new Error('请输入合法的邮箱'))
      }
      return callback()
    }
    // 自定义手机号的验证规则
    var checkMobile = (rule, value, callback) => {
      const mobileReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if(!mobileReg.test(value)) {
        return callback(new Error('请输入合法的手机号'))
      }
      return callback()
    }
    return {
      // 请求用户数据列表的请求参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 用户列表数据
      userList: [],
      // 用户总数
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单的验证规则对象
      addFormRules: {
        username: [
          { trigger: 'blur', required: true, message: '请输入用户名' },
          { trigger: 'blur', min: 3, max: 10, message: '用户名长度在 3 到 10 个字符' }
        ],
        password: [
          { trigger: 'blur', required: true, message: '请输入密码' },
          { trigger: 'blur', min: 6, max: 15, message: '密码长度在 6 到 15 个字符' }
        ],
        email: [
          { trigger: 'blur', required: true, message: '请输入邮箱' },
          { trigger: 'blur', validator: checkEmail }
        ],
        mobile: [
          { trigger: 'blur', required: true, message: '请输入手机号' },
          { trigger: 'blur', validator: checkMobile }
        ]
      },
      // 修改用户表单的验证规则对象
      editFormRules: {
        email: [
          { trigger: 'blur', required: true, message: '请输入邮箱' },
          { trigger: 'blur', validator: checkEmail }
        ],
        mobile: [
          { trigger: 'blur', required: true, message: '请输入手机号' },
          { trigger: 'blur', validator: checkMobile }
        ]
      },
      // 查询到的用户信息
      editForm: {},
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      roleList: [],
      // 分配角色对话框中选中的角色对应的 id 值
      selectdRoleId: ''
    }
  },
  methods:{
    // 发起请求获取用户数据列表
    async getUserList(){
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if(res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // pageSize 改变时会触发
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // currentPage 改变时会触发
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听 switch 开关状态的改变
    async userStateChanged(userInfo){
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if(res.meta.status !== 200){
        this.$message.error('更新用户状态失败')
        this.getUserList()
        return
      }
      this.$message.success('更新用户状态成功')
    },
    // 监听添加用户表单的关闭事件
    addFormClosed(){
      // 重置表单
      this.$refs.addFormRef.resetFields()
    },
    // 监听修改用户表单的关闭事件
    editFormClosed(){
      this.$refs.editFormRef.resetFields()
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed(){
      this.selectdRoleId = ''
    },
    // 点击添加用户表单的确认按钮就会触发的事件
    addUser(){
      // 表单预验证
      this.$refs.addFormRef.validate(async valid => {
        if(!valid) return
        // 校验通过，发起网络请求添加新用户
        const { data: res } = await this.$http.post('users', this.addForm)
        if(res.meta.status !== 201) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        // 关闭表单
        this.addDialogVisible = false
        // 重新发送请求获取用户列表数据
        this.getUserList()
      })
    },
    // 点击编辑用户表单的确认按钮就会触发的事件
    editUser(){
      // 表单预验证
      this.$refs.editFormRef.validate(async valid => {
        if(!valid) return
        // 校验通过，发起网络请求修改用户信息
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if(res.meta.status !== 200) return this.$message.error('修改用户失败')
        this.$message.success('修改用户成功')
        // 关闭表单
        this.editDialogVisible = false
        // 重新发送请求获取用户列表数据
        this.getUserList()
      })
    },
    // 点击每一个 TableItem 的删除按钮触发的事件
    deleteUser(id){
      this.$confirm('此操作将永久删除该用户，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('users/' + id)
        if(res.meta.status !== 200) return this.$message.error('删除用户失败')
        this.$message({
          type: 'success',
          message: '删除用户成功'
        })
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击每一个 tableItem 的编辑按钮触发的事件
    async showEditDialog(id){
      const { data: res } = await this.$http.get('users/' + id)
      if(res.meta.status !== 200) return this.$message.error('修改用户失败')
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 点击每一个 tableItem 的分配角色按钮触发的事件
    async setRole(userInfo){
      this.userInfo = userInfo
      // 在展示对话框之前，获取所有的角色列表
      const { data: res } = await this.$http.get('roles')
      if(res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.roleList = res.data
      this.setRoleDialogVisible = true
    },
    // 点击分配角色对话框的确认按钮触发的事件
    async saveRoleInfo(){
      if(!this.selectdRoleId) return this.$message.error('请选择要分配的角色')
      const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`,{ rid: this.selectdRoleId })
      if(res.meta.status !== 200) return this.$message.error('更新角色失败')
      this.$message.success('更新角色成功')
      this.getUserList()
      this.setRoleDialogVisible = false
    }
  },
  created() {
    this.getUserList()
  },
  // 解决bug：用户直接在浏览器上输入路径或者直接点击浏览器的回退和前进按钮，但是左侧二级菜单激活选中状态不变
  beforeRouteEnter(to, from, next){
    next(vc => {
      sessionStorage.setItem('activePath', 'users')
      vc.$store.dispatch('saveNavStatus', 'users')
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
  .el-select {
    width: 100%;
  }
</style>