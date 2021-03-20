<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="userQuery.userName" placeholder="用户名"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="userQuery.level" clearable placeholder="用户等级">
          <el-option :value="0" label="会员用户"/>
          <el-option :value="1" label="特约用户"/>
          <el-option :value="2" label="至尊用户"/>
        </el-select>
        <el-form-item>
          <el-input v-model="userQuery.userRealName" placeholder="真实姓名"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userQuery.userPhoneNumber" placeholder="电话"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userQuery.userIdentityNumber" placeholder="身份证号码"/>
        </el-form-item>
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
      <el-table-column align="center" prop="avatar" label="头像" width="50">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="20" height="20">
        </template>
      </el-table-column>

      <el-table-column prop="userName" label="名称" width="120" align="center"/>
      <el-table-column
        :filters="[{ text: '会员用户', value: 0 },{ text: '特约用户', value: 1 },{ text: '至尊用户', value: 2 }]"
        :filter-method="filterHandler"
        property="level"
        column-key="level"
        label="用户等级"
        filter-placement="bottom-end"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :type= "el_tag_type[scope.row.level]"
            disable-transitions>{{ user_level[scope.row.level] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userRealName" label="真实姓名" width="120" align="center"/>
      <el-table-column prop="userPhoneNumber" label="电话" width="200" align="center"/>
      <el-table-column prop="userIdentityNumber" label="身份证号码" width="200" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.userId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.userId)">删除</el-button>
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
import user from '@/api/user'

export default {
  data() { // 定义变量和初始值
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      userQuery: {},
      el_tag_type: ['warning', 'success', 'primary'],
      user_level: ['会员用户', '特约用户', '至尊用户']
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用user.js定义的方法
    getList(page = 1) {
      this.page = page
      user.getUserListPage(this.page, this.limit, this.userQuery)
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
      this.userQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        user.removeDataById(id)
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
