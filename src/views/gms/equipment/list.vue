<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="equipmentQuery.equipmentName" placeholder="器材名称"/>
      </el-form-item>
      <el-form-item label="仅看有库存" prop="equipmentLeftNumber">
        <el-switch v-model="equipmentQuery.equipmentLeftNumber"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--表格-->
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current--rows>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page-1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="equipmentName" label="器材名称" sortable align="center"/>
      <el-table-column prop="equipmentTotalNumber" label="器材总数" width="320" sortable align="center"/>
      <el-table-column prop="equipmentLeftNumber" label="当前库存" width="320" sortable align="center"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/equipment/edit/'+scope.row.equipmentId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.equipmentId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import equipment from '@/api/equipment'

export default {
  data() { // 定义变量和初始值
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      equipmentQuery: {
        'equipmentLeftNumber': true,
        'equipmentName': ''
      }
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用coach.js定义的方法
    getList(page = 1) {
      this.page = page
      equipment.getEquipmentListPage(this.page, this.limit, this.equipmentQuery)
        .then(response => { // 请求成功
          // response接口返回的数据
          this.list = response.data.item
          this.total = response.data.total
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    resetData() {
      this.equipmentQuery = { 'equipmentLeftNumber': true, 'equipmentName': '' }
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该器材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        equipment.removeDataById(id)
          .then(response => { // 请求成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          })
          .catch(error => {
            console.log((error))
          })// 请求失败
      })
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style scoped>

</style>
