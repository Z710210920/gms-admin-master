<template>

  <div class="app-container inputDeep">

    <el-form label-width="80px" inline="true">
      <!-- 课程封面-->
      <el-form-item label="">
        <el-upload disabled style="text-align: center">
          <img :src="classInfo.cover">
        </el-upload>
      </el-form-item>
      <br>
      <el-form-item label="课程标题">
        <el-input v-model="classInfo.title" readonly="readonly"/>
      </el-form-item>
      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-input v-model="classInfo.coachName" :inline="true" readonly="readonly"/>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="classInfo.coachPhoneNumber" :inline="true" readonly="readonly"/>
      </el-form-item>
      <el-form-item label="当前课时">
        <el-input v-model="classInfo.currentTimes" :inline="true" readonly="readonly"/>
      </el-form-item>
      <br>
      <!-- 所属分类 TODO -->
      <el-form-item label="课程类别">
        <el-collapse v-model="activeNames" style="width: 170px" @change="handleChange">
          <el-collapse-item :title="classInfo.courseName" name="1">
            <div>&nbsp; &nbsp; &nbsp; 难度: {{ difficulty[classInfo.difficulty] }}</div>
            <div>&nbsp; &nbsp; &nbsp; 目标: {{ target[classInfo.target] }}</div>
            <div>&nbsp; &nbsp; &nbsp; 部位: {{ part[classInfo.part] }}</div>
          </el-collapse-item>
        </el-collapse>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input v-model="classInfo.classTimes" :inline="true" style="width: 195px" readonly="readonly"/>
      </el-form-item>

      <!-- 课程简介 -->
      <el-form-item label="课程价格">
        <el-input v-model="classInfo.classPrice" readonly="readonly"> CNY </el-input>
      </el-form-item>

      <el-form-item label="课程教室">
        <el-input v-model="classInfo.classRoomName" :inline="true" readonly="readonly"/>
      </el-form-item>
      <br>

      <el-form-item label="课程简介">
        <el-input :height="300" style="width: 750px" v-html="classInfo.description"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">报名</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import classInfo from '@/api/classInfo'
import course from '@/api/course'
import coach from '@/api/coach'
import classroom from '@/api/classroom'
import Tinymce from '@/components/Tinymce'
import classselection from '@/api/classselection'
import { mapGetters } from 'vuex'

const defaultForm = {
  'classBeginTime': '',
  'classCoachId': '',
  'classPrice': 0,
  'classRoomId': '',
  'classTimes': 0,
  'cover': process.env.OSS_PATH + '/classCover/default.jpg',
  'description': '',
  'equipmentRecordId': '',
  'status': '',
  'title': ''
}

export default {
  components: { Tinymce },
  computed: {
    ...mapGetters([
      'Id'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      id: '',
      classInfo: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseList: [],
      coachList: [],
      classroomList: [],
      BASE_API: process.env.BASE_API,
      target: ['热身', '拉伸放松', '柔韧性', '减脂', '塑形', '增肌'],
      part: ['全身', '腹部', '腿部', '腰部', '背部', '胸部', '手臂', '肩部', '臀部', '颈部', '脸部'],
      difficulty: ['零基础', '初学', '进阶', '强化', '挑战'],
      classselection: {
        classId: '',
        user: ''
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log('watch $route')
      this.init()
    }
  },
  created() {
    console.log('info created')
    this.init()
  },
  methods: {
    init() {
      this.id = this.$route.params.id
      this.classselection.user = this.Id
      this.classselection.classId = this.id
      this.fetchClassInfoById(this.id)
    },
    fetchClassInfoById(id) {
      classInfo.getClassInfoById(id).then(response => {
        this.classInfo = response.data.item
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
    getAllCourse() {
      course.getAllCourse()
        .then(response => { // 请求成功
          // response接口返回的数据
          this.courseList = response.data.item
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    getAllCoach() {
      coach.getAllCoach()
        .then(response => { // 请求成功
          // response接口返回的数据
          this.coachList = response.data.item
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    getAllClassRoom() {
      classroom.getAllClassRoom()
        .then(response => { // 请求成功
          // response接口返回的数据
          this.classroomList = response.data.item
        })
        .catch(error => {
          console.log((error))
        })// 请求失败
    },
    next() {
      console.log('next')
      this.$router.push({ path: '/class/chapter/1' })
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
    handleAvatarSuccess(res, file) {
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.classInfo.cover = res.data.url
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>
  .tinymce-container {
    line-height: 29px;
  }
  /* 利用穿透，设置input边框隐藏 */
  .inputDeep>>>.el-input__inner {
    border: 0;
  }
  /* 如果你的 el-input type 设置成textarea ，就要用这个了 */
  .inputDeep>>>.el-textarea__inner {
    border: 0;
    resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
  }
</style>
