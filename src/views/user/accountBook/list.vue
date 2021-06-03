<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="accountBookQuery.type" clearable placeholder="状态">
          <el-option :value="0" label="充值"/>
          <el-option :value="1" label="上课"/>
          <el-option :value="2" label="私教"/>
          <el-option :value="3" label="自由练习"/>
          <el-option :value="4" label="退款"/>
          <el-option :value="5" label="续费月卡"/>
        </el-select>
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

      <el-table-column prop="id" label="订单编号" width="180" align="center"/>
      <el-table-column label="类型" width="120" align="center">
        <template slot-scope="scope">
          {{ account_type[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" align="center"/>
      <el-table-column prop="createtime" label="金额" width="180" align="center"/>
      <el-table-column prop="note" label="备注" size="50" align="center"/>
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
import accountBook from '@/api/accountBook'
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
      accountBookQuery: {
        userId: ''
      },
      account_type: ['充值', '上课', '私教', '自由练习', '退款', '续费月卡'],
      el_tag_type: ['warning', 'success', 'success', 'success', 'success', 'primary'],
      accountBook_state: ['已拒绝', '待确认', '待授课', '上课中', '待评价', '已评价']
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.accountBookQuery.userId = this.Id
    this.getList()
  },
  methods: { // 创建具体的方法，调用accountBook.js定义的方法
    getList(page = 1) {
      this.page = page
      accountBook.getUserListPage(this.page, this.limit, this.accountBookQuery)
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
      this.accountBookQuery = {}
      this.getList()
    },
    cancel(id) {
      this.$confirm('此操作将永久取消该订单, 同时退还你已支付的金额, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        accountBook.cancel(id)
          .then(response => { // 请求成功
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
            this.init()
          })
          .catch(error => {
            console.log((error))
          })// 请求失败
      })
    },
    update(id) {
      accountBook.update(id)
      this.getList()
    },
    refuse(id) {
      accountBook.refused(id)
      this.getList()
    },
    addNewAccountBook() {
      this.$router.push({ path: '/accountBook/save' })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        accountBook.removeDataById(id)
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
