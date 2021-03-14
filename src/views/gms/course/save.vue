<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item>
        <el-input v-model="course.name" placeholder="课程名称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="course.target" clearable placeholder="健身目的">
          <el-option :value="0" label="热身"/>
          <el-option :value="1" label="拉伸放松"/>
          <el-option :value="2" label="柔韧性"/>
          <el-option :value="3" label="减脂"/>
          <el-option :value="4" label="塑形"/>
          <el-option :value="5" label="增肌"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="course.part" clearable placeholder="部位">
          <el-option :value="0" label="全身"/>
          <el-option :value="1" label="腹部"/>
          <el-option :value="2" label="腿部"/>
          <el-option :value="3" label="腰部"/>
          <el-option :value="4" label="背部"/>
          <el-option :value="5" label="胸部"/>
          <el-option :value="6" label="手臂"/>
          <el-option :value="7" label="肩部"/>
          <el-option :value="8" label="臀部"/>
          <el-option :value="9" label="颈部"/>
          <el-option :value="10" label="脸部"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="course.difficulty" clearable placeholder="难度">
          <el-option :value="0" label="零基础"/>
          <el-option :value="1" label="初学"/>
          <el-option :value="2" label="进阶"/>
          <el-option :value="3" label="强化"/>
          <el-option :value="4" label="挑战"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="course.duration" clearable placeholder="时长">
          <el-option :value="0" label="0~20分钟"/>
          <el-option :value="1" label="20~40分钟"/>
          <el-option :value="2" label="40~60分钟"/>
          <el-option :value="3" label="60~80分钟"/>
          <el-option :value="4" label="80~100分钟"/>
          <el-option :value="5" label="100~120分钟"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import course from '@/api/course'

export default{
  data() {
    return {
      course: {
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getCourse(id)
      }
    },
    saveOrUpdate() {
      if (!this.course.courseId) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 保存
    getCourse(id) {
      course.getCourse(id)
        .then(response => {
          this.course = response.data.item
        })
    },
    saveData() {
      course.save(this.course)
        .then(response => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.saveBtnDisabled = true
          this.$router.push({ path: '/course/list' })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$message({
            type: 'error',
            message: '保存失败!'
          })
        })
    },
    updateData() {
      course.update(this.course.courseId, this.course)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.saveBtnDisabled = true
          this.$router.push({ path: '/course/list' })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$message({
            type: 'error',
            message: '修改失败!'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
