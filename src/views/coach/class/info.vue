<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/><!--
      <el-step title="创建课程大纲"/>-->
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="classInfo.title" placeholder=" 示例：瑜伽课：30天炼成魔鬼小蛮腰！！！"/>
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程类别">
        <el-select
          v-model="classInfo.courseId"
          placeholder="请选择">
          <el-option
            v-for="course in courseList"
            :key="course.courseId"
            :label="course.name"
            :value="course.courseId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="课程教室">
        <el-select
          v-model="classInfo.classRoomId"
          placeholder="请选择">
          <el-option
            v-for="classroom in classroomList"
            :key="classroom.classRoomId"
            :label="classroom.classRoomName"
            :value="classroom.classRoomId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="classInfo.classTimes" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介 -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="classInfo.description"/>
      </el-form-item>
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/gmsoss/fileoss/classInfo'"
          class="avatar-uploader">
          <img :src="classInfo.cover">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="classInfo.classPrice" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveorUpdata">保存并下一步</el-button>
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
      BASE_API: process.env.BASE_API
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
      this.classInfo.classCoachId = this.Id
      if (this.$route.params && this.$route.params.id) {
        this.id = this.$route.params.id
        this.fetchClassInfoById(this.id)
      } else {
        this.classInfo = { ...defaultForm }
      }
      this.getAllCourse()
      this.getAllClassRoom()
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
    // 保存
    saveorUpdata() {
      if (this.$route.params && this.$route.params.id) {
        this.updateData()
      } else {
        this.saveData()
      }
    },
    saveData() {
      classInfo.saveClassInfo(this.classInfo).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        return response// 将响应结果传递给then
      }).then(response => {
        this.$router.push({ path: '/class/publish/' + response.data.classId })
        /* this.$router.push({ path: '/class/chapter/' + response.data.classId })*/
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
    updateData() {
      classInfo.updateClassInfoById(this.id, this.classInfo).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        return response// 将响应结果传递给then
      }).then(response => {
        this.$router.push({ path: '/class/publish/' + this.id })
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
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
</style>
