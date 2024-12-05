<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
                v-for="(item1, index1) in scope.row.children"
                :key="item1.id"
                :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row
                    v-for="(item2, index2) in item1.children"
                    :key="item2.id"
                    :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']">
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag
                        type="success"
                        closable
                        @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag
                        type="warning"
                        v-for="item3 in item2.children"
                        :key="item3.id"
                        closable
                        @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="285px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditRoleDialog(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(scope.row.id)">删除</el-button>
            <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" @close="setRightDialogClosed">
      <el-tree
          :data="rightList"
          :props="treeProps"
          show-checkbox
          node-key="id"
          ref="treeRef"
          default-expand-all
          :default-checked-keys="defKeys"></el-tree>
      <span slot="footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色的对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" @close="addRoleDialogClosed">
      <el-form status-icon ref="addRoleFormRef" :model="addRoleForm" :rules="addRoleFormRules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色的对话框 -->
    <el-dialog title="修改角色" :visible.sync="editRoleDialogVisible">
      <el-form :model="editRoleForm" label-width="70px">
        <el-form-item label="角色名称">
          <el-select v-model="editRoleForm.roleName" placeholder="请选择角色名称">
            <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.roleName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data(){
    return {
      // 所有角色列表数据
      roleList: [],
      // 控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      // 控制添加角色对话框的显示与隐藏
      addRoleDialogVisible: false,
      // 控制修改角色对话框的显示与隐藏
      editRoleDialogVisible: false,
      // 所有权限数据
      rightList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中节点的 id 值的数组
      defKeys: [],
      // 打开分配权限对话框时当前角色对应的 id 值
      roleId: 0,
      // 添加角色表单的数据对象
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 修改角色表单的数据对象
      editRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 添加角色表单的验证规则对象
      addRoleFormRules: {
        roleName: [
          { trigger: 'blur', required: true, message: '请输入角色名称' }
        ]
      }
    }
  },
  methods: {
    // 获取所有角色列表数据
    async getRoleList(){
      const { data: res } = await this.$http.get('roles')
      if(res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.roleList = res.data
    },
    // 根据 id 删除对应的权限
    async removeRightById(role, rightId){
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirmResult === 'cancel') {
        return this.$message.info('已取消删除')
      }else if(confirmResult === 'confirm') {
        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if(res.meta.status !== 200) return this.$message.error('删除权限失败')
        role.children = res.data
      }
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role){
      // 将当前角色的 id 保存到 data 中
      this.roleId = role.id
      // 获取所有权限数据
      const { data: res } = await this.$http.get('rights/tree')
      if(res.meta.status !== 200) return this.$message.error('获取权限失败')
      this.rightList = res.data
      // 获取当前角色的所有三级权限的 id 值
      this.getLeafKeys(role)
      this.setRightDialogVisible = true
    },
    // 递归函数，用来获取某一角色下的所有最后一级权限（这里是三级权限）对应的 id，并保存到 defKeys 数组中
    getLeafKeys(roleObj){
      if(!roleObj.children) {
        this.defKeys.push(roleObj.id)
        return
      }
      roleObj.children.forEach(v => {
        this.getLeafKeys(v)
      })
    },
    // 监听设置权限对话框的关闭
    setRightDialogClosed(){
      this.defKeys = []
    },
    // 监听添加角色对话框的关闭
    addRoleDialogClosed(){
      // 对添加用户表单进行重置并移除所有校验结果
      this.$refs.addRoleFormRef.resetFields()
      this.addRoleForm.roleDesc = ''
    },
    // 点击分配权限对话框的确定按钮触发的事件
    async allotRights(){
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if(res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.getRoleList()
      this.setRightDialogVisible = false
    },
    // 点击添加角色对话框的确认按钮触发的事件
    addRole(){
      // 表单预验证
      this.$refs.addRoleFormRef.validate(async valid => {
        if(!valid) return
        // 验证通过，发起网络请求添加角色
        const { data: res } = await this.$http.post('roles',this.addRoleForm)
        if(res.meta.status !== 201) return this.$message.error('添加角色失败')
        this.$message.success('添加角色成功')
        this.addRoleDialogVisible = false
        this.getRoleList()
      })
    },
    // 展示修改角色对话框
    showEditRoleDialog(role){
      this.roleId = role.id
      this.editRoleForm.roleName = role.roleName
      this.editRoleForm.roleDesc = role.roleDesc
      this.editRoleDialogVisible = true
    },
    // 点击修改角色对话框的确认按钮触发的事件
    async editRole(){
      const { data: res } = await this.$http.put('roles/' + this.roleId, this.editRoleForm)
      if(res.meta.status !== 200) return this.$message.error('修改角色失败')
      this.$message.success('修改角色成功')
      this.getRoleList()
      this.editRoleDialogVisible = false
    },
    // 点击每一个 tableItem 的删除按钮就会触发的事件
    async deleteRole(id){
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirmResult === 'cancel') return this.$message.info('已取消删除')
      else if(confirmResult === 'confirm'){
        const { data: res } = await this.$http.delete('roles/' + id)
        if(res.meta.status !== 200) return this.$message.error('删除角色失败')
        this.$message.success('删除角色成功')
        this.getRoleList()
      }
    }
  },
  created() {
    this.getRoleList()
  },
  // 解决bug：用户直接在浏览器上输入路径或者直接点击浏览器的回退和前进按钮，但是左侧二级菜单激活选中状态不变
  beforeRouteEnter(to, from, next){
    next(vc => {
      sessionStorage.setItem('activePath', 'roles')
      vc.$store.dispatch('saveNavStatus', 'roles')
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
    .bdtop {
      border-top: 1px solid #eeeeee;
    }
    .bdbottom {
      border-bottom: 1px solid #eeeeee;
    }
    .el-row {
      margin: 0 50px;
      .el-tag {
        margin: 7px;
      }
    }
  }
  .vcenter {
    display: flex;
    align-items: center;
  }
  .el-select {
    width: 100%;
  }
</style>