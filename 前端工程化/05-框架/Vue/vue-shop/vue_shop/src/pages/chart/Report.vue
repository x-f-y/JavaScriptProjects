<template>
  <div>
    <!-- 面包屑到导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2. 为 ECharts 准备一个定义了宽高的 DOM -->
      <div id="main" style="width: 750px;height: 400px;"></div>
    </el-card>
  </div>
</template>>

<script>
  // 1. 引入 echarts
  import  * as echarts from 'echarts'
  import _ from 'lodash'

  export default {
    name: 'Report',
    data(){
      return {
        // 需要合并的数据
        options: {
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
      }
    },
    async mounted() {
      // 3. 基于准备好的 dom，初始化 echarts 实例
      let myChart = echarts.init(document.getElementById('main'));
      // 4. 指定图表的配置项和数据
      let { data: res } = await this.$http.get('reports/type/1')
      if(res.meta.status !== 200) return this.$message.error('获取折线图数据失败')
      const result =_.merge(res.data, this.options)
      // 5. 使用刚指定的配置项和数据显示图表
      myChart.setOption(result);
    },
    // 解决bug：用户直接在浏览器上输入路径或者直接点击浏览器的回退和前进按钮，但是左侧二级菜单激活选中状态不变
    beforeRouteEnter(to, from, next){
      next(vc => {
        sessionStorage.setItem('activePath', 'reports')
        vc.$store.dispatch('saveNavStatus', 'reports')
      })
    }
  }
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
  }
</style>