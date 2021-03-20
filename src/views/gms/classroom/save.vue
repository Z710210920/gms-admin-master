<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="教室图片">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="classroom.picture"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/gmsoss/fileoss/classroom'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item label="教室名称">
        <el-input v-model="classroom.classRoomName" placeholder="教室名称"/>
      </el-form-item>
      <el-form-item label="教室名称">
        <el-input v-model="classroom.maximum" placeholder="最大容量"/>
      </el-form-item>
      <el-form-item label="教室简介">
        <el-input v-model="classroom.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import classroom from '@/api/classroom'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default{
  components: { ImageCropper, PanThumb },
  data() {
    return {
      classroom: {
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false,
      imagecropperKey: 0,
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
    close() {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
    },
    cropSuccess(data) {
      this.imagecropperShow = false
      // eslint-disable-next-line no-undef
      console.log(data)
      // eslint-disable-next-line no-undef
      this.classroom.picture = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getClassroomInfo(id)
      } else {
        this.classroom = {
          picture: 'https://yuchen-gms.oss-cn-beijing.aliyuncs.com/classRoomPicture/default.jpg'
        }
      }
    },
    saveOrUpdate() {
      if (!this.classroom.classroomId) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 保存
    getClassroomInfo(id) {
      classroom.getClassroom(id)
        .then(response => {
          this.classroom = response.data.item
        })
    },
    saveData() {
      classroom.save(this.classroom)
        .then(response => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.saveBtnDisabled = true
          this.$router.push({ path: '/classroom/list' })
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
      classroom.update(this.classroom.classroomId, this.classroom)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.saveBtnDisabled = true
          this.$router.push({ path: '/classroom/list' })
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
