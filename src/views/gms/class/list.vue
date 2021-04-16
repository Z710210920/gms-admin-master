<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">

      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="ClassInfo.courseId"
          placeholder="请选择课程类别"/>
        <el-option
          v-for="course in courseList"
          :key="course.courseId"
          :label="course.name"
          :value="course.courseId"/>
      </el-form-item>

      <!-- 标题 -->
      <el-form-item>
        <el-input v-model="ClassInfo.title" placeholder="课程标题"/>
      </el-form-item>
      <!-- 讲师 -->
      <el-form-item>
        <el-select
          v-model="ClassInfo.coachId"
          placeholder="请选择讲师">
          <el-option
            v-for="coach in coachList"
            :key="coach.coachId"
            :label="coach.coachName"
            :value="coach.coachId"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList">

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="课程信息" width="470" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img :src="scope.row.cover" alt="scope.row.title" width="150px">
            </div>
            <div class="title">
              <a href="">{{ scope.row.title }}</a>
              <p>{{ scope.row.classTimes }}课时</p>
            </div>
          </div>

        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.modifiedtime.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100" align="center" >
        <template slot-scope="scope">
          {{ Number(scope.row.classPrice) === 0 ? '免费' :
          '¥' + scope.row.classPrice.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="buyCount" label="付费学员" width="100" align="center" >
        <template slot-scope="scope">
          {{ scope.row.buyCount }}人
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <router-link :to="'/class/info/' + scope.row.classId">
            <el-button type="text" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
          </router-link>
          <router-link :to="'/class/chapter/'+scope.row.classId">
            <el-button type="text" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.classId)">删除</el-button>
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
      @current-change="fetchData"
    />
  </div>
</template>

<script>
import course from '@/api/course'
import classInfo from '@/api/classInfo'
import coach from '@/api/coach'

export default {
  data() { // 定义变量和初始值
    return {
      listLoading: true, // 是否显示loading信息
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      ClassInfo: {
        courseId: '',
        title: '',
        coachId: ''
      }, // 查询条件
      coachList: [],
      courseList: []
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.fetchData()
    // 初始化分类列表
    this.initCourseList()
    // 获取讲师列表
    this.initCoachList()
  },
  methods: { // 创建具体的方法，调用coach.js定义的方法
    fetchData(page = 1) {
      this.page = page
      this.listLoading = true
      classInfo.getPageList(this.page, this.limit, this.ClassInfo)
        .then(response => { // 请求成功
          // response接口返回的数据
          if (response.success === true) {
            this.list = response.data.item
            this.total = response.data.total
            console.log(this.list)
          }
          this.listLoading = false
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    initCoachList() {
      coach.getAllCoach().then(response => {
        this.coachList = response.data.item
      })
    },

    initCourseList() {
      course.getAllCourse().then(response => {
        this.courseList = response.data.item
      })
    },
    resetData() {
      this.ClassInfo = {}
      this.fetchData()
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        classInfo.removeById(id)
          .then(response => { // 请求成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          })
          .catch(error => {
            console.log((error))
          })// 请求失败
      })
    },
  }
}
</script>

<style scoped>
  .myClassList .info {
    width: 450px;
    overflow: hidden;
  }
  .myClassList .info .pic {
    width: 150px;
    height: 90px;
    overflow: hidden;
    float: left;
  }
  .myClassList .info .pic a {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .myClassList .info .pic img {
    display: block;
    width: 100%;
  }
  .myClassList td .info .title {
    width: 280px;
    float: right;
    height: 90px;
  }
  .myClassList td .info .title a {
    display: block;
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    color: #00baf2;
    margin-bottom: 12px;
  }
  .myClassList td .info .title p {
    line-height: 20px;
    margin-top: 5px;
    color: #818181;
  }
</style>
