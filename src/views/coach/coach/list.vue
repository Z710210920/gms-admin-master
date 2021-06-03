<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="coachQuery.coachName" placeholder="教练名"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="coachQuery.level" clearable placeholder="教练头衔">
          <el-option :value="0" label="普通教练"/>
          <el-option :value="1" label="特约教练"/>
        </el-select>
        <el-form-item>
          <el-input v-model="coachQuery.coachRealName" placeholder="真实姓名"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="coachQuery.coachPhoneNumber" placeholder="电话"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="coachQuery.coachIdentityNumber" placeholder="身份证号码"/>
        </el-form-item>
        <!--
         <el-form-item label="添加时间">
        <el-date-picker
          v-model="searchObj.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
        -->
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
      <el-table-column prop="coachName" label="名称" width="120" align="center"/>
      <el-table-column
        :filters="[{ text: '普通教练', value: 0 },{ text: '特约教练', value: 1 }]"
        :filter-method="filterHandler"
        property="level"
        column-key="level"
        label="头衔"
        filter-placement="bottom-end"
        align="center"
        width="120">
        <template slot-scope="scope">
          <el-tag
            :type= "scope.row.level===0 ? 'primary':'success'"
            disable-transitions>{{ scope.row.level===0?'普通教练':'特约教练' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="coachRealName" label="真实姓名" width="120" align="center"/>
      <el-table-column prop="coachPhoneNumber" label="电话" width="200" align="center"/>
      <el-table-column prop="coachIdentityNumber" label="身份证号码" width="200" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/coach/edit/'+scope.row.coachId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.coachId)">删除</el-button>
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
import coach from '@/api/coach'

export default {
  data() { // 定义变量和初始值
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      coachQuery: {}
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用coach.js定义的方法
    getList(page = 1) {
      this.page = page
      coach.getCoachListPage(this.page, this.limit, this.coachQuery)
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
      this.coachQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该教练, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        coach.removeDataById(id)
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
