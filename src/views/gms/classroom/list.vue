<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="classroomQuery.classRoomName" placeholder="教室名称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="classroomQuery.maximum" clearable placeholder="教室容量">
          <el-option :value="0" label="0~20"/>
          <el-option :value="1" label="20~40"/>
          <el-option :value="2" label="40~60"/>
          <el-option :value="3" label="60~80"/>
          <el-option :value="4" label="80~100"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <!--<router-link to="/classroom/save">
        <el-button type="success">添加教室</el-button>
      </router-link>-->
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
      <el-table-column prop="picture" label="图片" width="80" header-align="center" align="center">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="" trigger="hover">
            <img :src="scope.row.picture" alt="" style="width: 150px;height: 150px">
            <img slot="reference" :src="scope.row.picture" style="width: 30px;height: 30px">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="classRoomName" label="教室名称" width="160" align="center"/>
      <el-table-column prop="maximum" label="教室容量" width="160" sortable align="center"/>
      <el-table-column prop="intro" label="简介"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/classroom/edit/'+scope.row.classRoomId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.classroomId)">删除</el-button>
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
import classroom from '@/api/classroom'

export default {
  data() { // 定义变量和初始值
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      classroomQuery: {},
      target: ['热身', '拉伸放松', '柔韧性', '减脂', '塑形', '增肌'],
      part: ['全身', '腹部', '腿部', '腰部', '背部', '胸部', '手臂', '肩部', '臀部', '颈部', '脸部'],
      difficulty: ['零基础', '初学', '进阶', '强化', '挑战'],
      target_filter: [{ text: '热身', value: 0 },
        { text: '拉伸放松', value: 1 },
        { text: '柔韧性', value: 2 },
        { text: '减脂', value: 3 },
        { text: '塑形', value: 4 },
        { text: '增肌', value: 5 }],
      part_filter: [
        { text: '全身', value: 0 },
        { text: '腹部', value: 1 },
        { text: '腿部', value: 2 },
        { text: '腰部', value: 3 },
        { text: '背部', value: 4 },
        { text: '胸部', value: 5 },
        { text: '手臂', value: 6 },
        { text: '肩部', value: 7 },
        { text: '臀部', value: 8 },
        { text: '颈部', value: 9 },
        { text: '脸部', value: 10 }],
      difficulty_filter: [
        { text: '零基础', value: 0 },
        { text: '初学', value: 1 },
        { text: '进阶', value: 2 },
        { text: '强化', value: 3 },
        { text: '挑战', value: 4 }]
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用coach.js定义的方法
    getList(page = 1) {
      this.page = page
      classroom.getClassroomListPage(this.page, this.limit, this.classroomQuery)
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
      this.classroomQuery = {}
      this.getList()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        classroom.removeDataById(id)
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
