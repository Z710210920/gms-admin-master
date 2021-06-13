<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="reserveQuery.userPhoneNumber" placeholder="用户电话"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="reserveQuery.reserveState" clearable placeholder="状态">
          <el-option :value="0" label="已拒绝"/>
          <el-option :value="1" label="待确认"/>
          <el-option :value="2" label="待授课"/>
          <el-option :value="3" label="上课中"/>
          <el-option :value="4" label="待评价"/>
          <el-option :value="5" label="已评价"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="primary" @click="addNewReserve()">预约</el-button>
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

      <el-table-column prop="userName" label="用户名称" width="120" align="center"/>
      <el-table-column prop="coachName" label="教练名称" width="120" align="center"/>
      <el-table-column prop="reserveTime" label="开始时间" width="240" align="center"/>
      <el-table-column prop="duration" label="时长（分钟）" width="120" align="center"/>
      <el-table-column prop="note" label="备注" size="50" align="center"/>
      <el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div v-if="new Date(scope.row.reserveTime).getTime() < new Date().getTime() && scope.row.reserveState != 4 && scope.row.reserveState != 5 && scope.row.reserveState != 0">
              已过期
            </div>
            <div v-else-if="scope.row.reserveState === 0">
              <el-button type="danger" size="mini" icon="el-icon-delete">已拒绝</el-button>
            </div>
            <div v-else-if="scope.row.reserveState === 1">
              <el-button :type= "el_tag_type[scope.row.reserveState]" size="mini" @click="update(scope.row.reserveId)">{{ reserve_state[scope.row.reserveState] }}</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="refuse(scope.row.reserveId)">拒绝</el-button>
            </div>
            <div v-else-if="scope.row.reserveState !== 4">
              <el-button :type= "el_tag_type[scope.row.reserveState]" size="mini" @click="update(scope.row.reserveId)">{{ reserve_state[scope.row.reserveState] }}</el-button>
            </div>
            <div v-else>
              <el-button :type= "el_tag_type[scope.row.reserveState]" size="mini">{{ reserve_state[scope.row.reserveState] }}</el-button>
            </div>
          </template>
        </el-table-column>
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
import reserve from '@/api/reserve'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'Id'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  data() { // 定义变量和初始值
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      reserveQuery: {},
      el_tag_type: ['warning', 'success', 'success', 'success', 'success', 'primary'],
      reserve_state: ['已拒绝', '待确认', '待授课', '上课中', '已完成', '已完成']
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用reserve.js定义的方法
    getList(page = 1) {
      this.page = page
      this.reserveQuery.coachId = this.Id
      reserve.getReserveListPage(this.page, this.limit, this.reserveQuery)
        .then(response => { // 请求成功
          // response接口返回的数据
          this.list = response.data.item
          this.total = response.data.total
          console.log(this.list)
          console.log(this.total)
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    resetData() {
      this.reserveQuery = {}
      this.getList()
    },
    update(id) {
      reserve.update(id).then(response => {
        this.getList()
      })
    },
    refuse(id) {
      reserve.refused(id).then(response =>{
        this.getList()
      })
    },
    addNewReserve() {
      this.$router.push({ path: '/reserve/save' })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reserve.removeDataById(id)
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
