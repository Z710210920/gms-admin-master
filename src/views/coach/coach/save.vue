<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="添加教练">
        <el-input v-model="coach.coachName"/>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="coach.coachRealName"/>
      </el-form-item>
      <el-form-item label="教练头衔">
        <el-select v-model="coach.level" clearable placeholder="请选择">
          <el-option :value="0" label="普通教练"/>
          <el-option :value="1" label="特约教练"/>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="coach.coachPhoneNumber"/>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="coach.coachIdentityNumber"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="coach.coachPassword" type="password"/>
      </el-form-item>
      <el-form-item label="教练简介">
        <el-input v-model="coach.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="教练头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="coach.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
    v-show：是否显示上传组件
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    :url：后台上传的url地址
    @close：关闭上传组件
    @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/gmsoss/fileoss/coach'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import coach from '@/api/coach'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default{
  components: { ImageCropper, PanThumb },
  data() {
    return {
      coach: {
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
      this.coach.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getCoachInfo(id)
      } else {
        this.coach = {
          level: 0,
          avatar: 'https://yuchen-gms.oss-cn-beijing.aliyuncs.com/avatar/2021/03/07/2b18e3eee96c479484110d8a41cafde3file.png'
        }
      }
    },
    saveOrUpdate() {
      if (!this.coach.coachId) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 保存
    getCoachInfo(id) {
      coach.getCoach(id)
        .then(response => {
          this.coach = response.data.item
          this.coach.coachPassword = ''
        })
    },
    saveData() {
      coach.save(this.coach)
        .then(response => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.saveBtnDisabled = true
          this.$router.push({ path: '/coach/list' })
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
      coach.update(this.coach.coachId, this.coach)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.saveBtnDisabled = true
          this.$router.push({ path: '/coach/list' })
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
