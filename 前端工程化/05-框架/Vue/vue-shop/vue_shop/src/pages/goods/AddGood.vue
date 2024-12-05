<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
          title="添加商品信息"
          type="info"
          center
          :closable="false"
          show-icon>
      </el-alert>
      <!-- 步骤条区域 -->
      <el-steps align-center :space="200" :active="+activeIndex" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tabs 区域 -->
      <el-form ref="addFormRef" status-icon label-position="top" :model="addForm" :rules="addFormRules" label-width="100px">
        <el-tabs @tab-click="tabClicked" :before-leave="beforeTabLeave" v-model="activeIndex" tab-position="left">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                  clearable
                  v-model="addForm.goods_cat"
                  :options="cateList"
                  :props="{ expandTrigger: 'hover', ...cateProp }"
                  @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox border v-for="(v, i) in item.attr_vals" :key="i" :label="v"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableDate" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
                :on-success="handleSuccess"
                :headers="headers"
                action="http://127.0.0.1:8888/api/private/v1/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="btn_add" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 预览图片的对话框 -->
    <el-dialog title="图片预览" :visible.sync="previewDialogVisible">
      <img :src="previewPath" alt="" class="previewImg">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AddGood',
    data(){
      return {
        // 激活选中的步骤条索引
        activeIndex: '0',
        // 添加商品的表单数据对象
        addForm: {
          goods_name: '',
          goods_price: 0,
          goods_weight: 0,
          goods_number: 0,
          // 级联选择器选中的 id 数组（商品所属分类）
          goods_cat: [],
          // 图片数组
          pics: [],
          goods_introduce: '',
          // 商品的参数（数组），包含动态参数和静态属性
          attrs: []
        },
        // 添加商品的表单验证规则对象
        addFormRules: {
          goods_name: [
            { trigger: 'blur', required: true, message: '请输入商品名称' }
          ],
          goods_price: [
            { trigger: 'blur', required: true, message: '请输入商品价格' }
          ],
          goods_weight: [
            { trigger: 'blur', required: true, message: '请输入商品重量' }
          ],
          goods_number: [
            { trigger: 'blur', required: true, message: '请输入商品数量' }
          ],
          goods_cat: [
            { trigger: 'change', required: true, message: '请选择商品所属的三级分类' }
          ]
        },
        // 所有商品分类数据
        cateList: [],
        // 级联选择器的配置对象
        cateProp: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        // 动态参数数据
        manyTableData: [],
        // 静态属性数据
        onlyTableDate: [],
        // 上传图片时的请求头
        headers: {
          Authorization: sessionStorage.getItem('token')
        },
        // 点击上传成功的图片进行预览时，该属性保存着该图片的路径
        previewPath: '',
        // 控制预览图片对话框的显示与隐藏
        previewDialogVisible: false
      }
    },
    computed: {
      // 选中的三级分类的 id
      cateId(){
        return this.addForm.goods_cat.length === 3 ? this.addForm.goods_cat[2] : null
      }
    },
    methods: {
      // 发起请求获取所有商品分类数据
      async getCateList(){
        const { data: res } = await this.$http.get('categories')
        if(res.meta.status !== 200) return this.$message.error('获取分类数据失败')
        this.cateList = res.data
      },
      // 级联选择器选中的节点发生变化就会触发的事件
      handleChange(){
        if(this.addForm.goods_cat.length !== 3){
          this.addForm.goods_cat = []
          return
        }
      },
      // tab 标签切换之前会执行的生命周期钩子
      beforeTabLeave(activeName, oldActiveName){
        if(oldActiveName === '0' && this.addForm.goods_cat.length !== 3){
          this.$message.error('请先选择商品分类')
          return false
        }
      },
      // tab 被选中时触发
      async tabClicked(){
        if(this.activeIndex === '1'){
          // 点击的是商品参数 tab，发起请求获取动态参数列表
          const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
            params: {
              sel: 'many'
            }
          })
          if(res.meta.status !== 200) return this.$message.error('获取动态参数数据失败')
          res.data.forEach(v => {
            v.attr_vals = v.attr_vals ? v.attr_vals.split(' ') : []
          })
          this.manyTableData = res.data
        } else if (this.activeIndex === '2'){
          // 点击的是商品属性 tab，发起请求获取静态属性列表
          const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
            params: {
              sel: 'only'
            }
          })
          if(res.meta.status !== 200) return this.$message.error('获取动态参数数据失败')
          this.onlyTableDate = res.data
        }
      },
      // 点击已上传的图片，进行图片预览
      handlePreview(file){
        this.previewPath = file.response.data.url
        this.previewDialogVisible = true
      },
      // 点击移除已上传的文件，触发的事件
      handleRemove(file){
        console.log(file)
        const path = file.response.data.tmp_path
        this.addForm.pics = this.addForm.pics.filter(v => v.pic !== path)
      },
      // 图片上传成功的钩子
      handleSuccess(response){
        const picInfo = { pic: response.data.tmp_path }
        this.addForm.pics.push(picInfo)
      },
      // 点击添加商品按钮触发的事件
      add(){
        this.$refs.addFormRef.validate(async valid => {
          if(!valid) return this.$message.error('请填写必要的表单项')
          this.addForm.goods_cat = this.addForm.goods_cat.join(',')
          this.manyTableData.forEach(item => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals.join(' ')
            }
            this.addForm.attrs.push(newInfo)
          })
          this.onlyTableDate.forEach(item => {
            const newInfo = {
              attr_id: item.attr_id,
              attr_value: item.attr_vals
            }
            this.addForm.attrs.push(newInfo)
          })
          // 发起请求添加商品
          const { data: res } = await this.$http.post('goods', this.addForm)
          if(res.meta.status !== 201) return this.$message.error('添加商品失败')
          this.$message.success('添加商品成功')
          this.$router.push('/home/goods')
        })
      }
    },
    created() {
      this.getCateList()
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
  .el-steps {
    margin: 15px 0;
  }
  .el-step__title {
    font-size: 13px;
  }
  .el-cascader {
    width: 280px;
  }
  .el-checkbox {
    margin: 0 10px 0 0;
  }
  .previewImg {
    width: 100%;
  }
  ::v-deep .ql-editor {
    min-height: 300px;
  }
  .btn_add {
    margin-top: 15px;
  }
</style>