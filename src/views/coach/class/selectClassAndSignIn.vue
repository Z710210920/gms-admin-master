<template>
  <div class="app-container">
    <el-button type="primary" disabled="" @click="beginclass">开始第{{ classInfo.currentTimes+1 }}课时</el-button>
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

      <el-table-column prop="username" label="名称" width="120" align="center"/>
      <el-table-column prop="userPhoneNumber" label="电话" width="200" align="center"/>
      <el-table-column prop="signIntimes" label="签到次数" width="200" align="center"/>
      <el-table-column label="缺勤次数" width="200" align="center">
        <template slot-scope="scope">
          <el-tag
            :type= "classInfo.currentTimes-scope.row.signIntimes === 0 ? 'primary' : 'danger'"
            disable-transitions>{{ classInfo.currentTimes-scope.row.signIntimes }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="usersignin(scope.row.classselectionId)">签到</el-button>
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
import classselection from '@/api/classselection'
import user from '@/api/user'
import classInfo from '@/api/classInfo'
import signin from '@/api/signin'
import membershipcard from '@/api/membershipcard'

export default {
  data() { // 定义变量和初始值
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      user: {
        deadline: new Date()
      },
      userList: {},
      userQuery: {},
      userPhoneNumber: '',
      able: true,
      classId: 0,
      el_tag_type: ['warning', 'success', 'primary'],
      user_level: ['会员用户', '特约用户', '至尊用户'],
      Sign_up_button: false,
      dialogChapterFormVisible: false, // 是否显示章节表单
      classInfo: {
        'classBeginTime': '',
        'classCoachId': '',
        'classPrice': 0,
        'classRoomId': '',
        'classTimes': 0,
        'currentTimes': 0,
        'cover': process.env.OSS_PATH + '/classCover/default.jpg',
        'description': '',
        'equipmentRecordId': '',
        'status': '',
        'title': ''
      },
      classselection: {
        classId: '',
        user: ''
      },
      classQuery: {
        classId: '',
        user: ''
      },
      signin: {
        classselection: '',
        currentTimes: 0
      },
      topUpMessage: {
        userId: '',
        number: 0
      },
      status: false
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.init()
  },
  methods: { // 创建具体的方法，调用user.js定义的方法
    init() {
      this.classId = this.$route.params.id
      this.classselection.classId = this.classId
      this.classQuery.classId = this.classId
      this.fetchClassInfoById(this.classId)
      this.getList()
    },
    fetchClassInfoById(id) {
      classInfo.getClassInfoById(id).then(response => {
        this.classInfo = response.data.item
        this.status = this.classInfo.status === 'Normal'
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
    show() {
      this.dialogChapterFormVisible = true
      this.classselection.user = ''
    },
    getList(page = 1) {
      this.page = page
      signin.findAllSignInMessage(page, this.limit, this.classId)
        .then(response => { // 请求成功
          // response接口返回的数据
          this.list = response.data.item
          this.total = response.data.total
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    select() {
      user.getByPhoneNumber(this.userPhoneNumber).then(response => { // 请求成功
        this.user = response.data.item
        this.Sign_up_button = true
        this.classselection.user = this.user.userId
        this.topUpMessage.userId = this.user.userId
        this.able = (new Date() > Date.parse(this.user.deadline) && this.classInfo.classPrice > this.user.balance)
      })
    },
    saveOrUpdate() {
      classselection.SelectClass(this.classselection).then(response => { // 请求成功
        this.dialogChapterFormVisible = false
        this.getList()
        this.userPhoneNumber = ''
        this.user = ''
      })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    beginclass() {
      classInfo.nextPeriod(this.classId).then(response => { // 请求成功
        this.fetchClassInfoById(this.classId)
      })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    usersignin(classselectionId) {
      this.signin.classselection = classselectionId
      this.signin.currentTimes = this.classInfo.currentTimes
      signin.signin(this.signin).then(response => { // 请求成功
        this.getList()
      })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    top_up() {
      membershipcard.topUp(this.topUpMessage).then(response => { // 请求成功
        this.$message({
          type: 'success',
          message: '充值成功'
        })
        this.select()
      })
        .catch(error => {
          console.log((error))
        })// 请求失败
    }
  }
}
</script>

<style scoped>

</style>
