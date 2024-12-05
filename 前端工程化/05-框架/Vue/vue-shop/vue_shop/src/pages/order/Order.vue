<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索框区域 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="orderList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template scope="scope">
            {{scope.row.create_time | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="addressVisible = true" size="mini" type="primary" icon="el-icon-edit"></el-button>
            <el-button @click="showProgressBox" size="mini" type="success" icon="el-icon-location"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>
    <!-- 修改地址的对话框 -->
    <el-dialog
        title="修改地址"
        @close="addressDialogClosed"
        :visible.sync="addressVisible">
      <el-form :model="addressForm" :rules="addressRules" ref="addressFormRef" label-width="85px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader clearable :options="citydata" v-model="addressForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 显示物流进度的对话框 -->
    <el-dialog
        title="物流进度"
        :visible.sync="progressVisible">
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>>

<script>
  import citydata from "@/pages/order/citydata";

  export default {
    name: 'Order',
    data(){
      return {
        // 订单列表数据
        orderList: [],
        // 查询参数对象
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        // 订单总条数
        total: 0,
        // 控制修改地址对话框的显示与隐藏
        addressVisible: false,
        // 修改地址表单的数据对象
        addressForm: {
          address1: [],
          address2: ''
        },
        // 修改地址表单的验证规则对象
        addressRules: {
          address1: [
            { trigger: 'change', required: true, message: '请选择省市区/县' }
          ],
          address2: [
            { trigger: 'blur', required: true, message: '请填写详细地址' }
          ]
        },
        // 全国各个省市区县的名称列表
        citydata,
        // 控制显示物流进度对话框的显示与隐藏
        progressVisible: false,
        // 物流信息数组
        progressInfo: []
      }
    },
    methods: {
      // 获取订单数据
      async getOrderList(){
        const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
        if(res.meta.status !== 200) return this.$message.error('获取订单数据失败')
        this.orderList = res.data.goods
        this.total = res.data.total
      },
      // pagesize 改变时触发
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize
        this.getOrderList()
      },
      // pagenum 改变时触发
      handleCurrentChange(newPage){
        this.queryInfo.pagenum = newPage
        this.getOrderList()
      },
      // 监听修改地址对话框的关闭事件
      addressDialogClosed(){
        this.$refs.addressFormRef.resetFields()
      },
      // 点击定位图标触发的事件
      async showProgressBox(){
        /*const { data: res } = await this.$http.get('kuaidi/1106975712662')
        if(res.meta.status !== 200) return this.$message.error('获取物流进度失败')
        this.progressInfo = res.data*/
        // 获取物流信息接口已不能使用，这里伪造一个物流信息的数据
        this.progressInfo = [
          {
            "time": "2018-05-10 09:39:00",
            "ftime": "2018-05-10 09:39:00",
            "context": "已签收,感谢使用顺丰,期待再次为您服务",
            "location": ""
          },
          {
            "time": "2018-05-10 08:23:00",
            "ftime": "2018-05-10 08:23:00",
            "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
            "location": ""
          },
          {
            "time": "2018-05-10 07:32:00",
            "ftime": "2018-05-10 07:32:00",
            "context": "快件到达 [北京海淀育新小区营业点]",
            "location": ""
          },
          {
            "time": "2018-05-10 02:03:00",
            "ftime": "2018-05-10 02:03:00",
            "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
            "location": ""
          },
          {
            "time": "2018-05-09 23:05:00",
            "ftime": "2018-05-09 23:05:00",
            "context": "快件到达 [北京顺义集散中心]",
            "location": ""
          },
          {
            "time": "2018-05-09 21:21:00",
            "ftime": "2018-05-09 21:21:00",
            "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
            "location": ""
          },
          {
            "time": "2018-05-09 13:07:00",
            "ftime": "2018-05-09 13:07:00",
            "context": "顺丰速运 已收取快件",
            "location": ""
          },
          {
            "time": "2018-05-09 12:25:03",
            "ftime": "2018-05-09 12:25:03",
            "context": "卖家发货",
            "location": ""
          },
          {
            "time": "2018-05-09 12:22:24",
            "ftime": "2018-05-09 12:22:24",
            "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
            "location": ""
          },
          {
            "time": "2018-05-08 21:36:04",
            "ftime": "2018-05-08 21:36:04",
            "context": "商品已经下单",
            "location": ""
          }
        ]
        this.progressVisible = true
      }
    },
    created() {
      this.getOrderList()
    },
    // 解决bug：用户直接在浏览器上输入路径或者直接点击浏览器的回退和前进按钮，但是左侧二级菜单激活选中状态不变
    beforeRouteEnter(to, from, next){
      next(vc => {
        sessionStorage.setItem('activePath', 'orders')
        vc.$store.dispatch('saveNavStatus', 'orders')
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
  .el-cascader {
    width: 100%;
  }
</style>