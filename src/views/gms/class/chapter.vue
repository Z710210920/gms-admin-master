<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-button type="text" @click="dialogChapterFormVisible = true">添加章节</el-button>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="classchapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="classchapter.title"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/vod/video/upload'"
            :limit="1"
            class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 章节 -->
    <ul class="classchanpterList">
      <li
        v-for="classchapter in classchapterNestedList"
        :key="classchapter.id">
        <p>
          {{ classchapter.title }}

          <span class="acts">
            <el-button type="text" @click="addvedio(classchapter.id)">添加课时</el-button>
            <el-button type="text" @click="editClassChapter(classchapter.id)">编辑</el-button>
            <el-button type="text" @click="removeClassChapter(classchapter.id)">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="classchanpterList classvideoList">
          <li
            v-for="classvideo in classchapter.children"
            :key="classvideo.id">
            <p>{{ classvideo.title }}
              <span class="acts">
                <el-button type="text" @click="editVideo(classvideo.id)">编辑</el-button>
                <el-button type="text" @click="removeVideo(classvideo.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import classchapter from '@/api/classchapter'
import video from '@/api/classvideo'
import vod from '@/api/vod'

export default {
  data() {
    return {
      dialogChapterFormVisible: false, // 是否显示章节表单
      classchapter: {// 章节对象
        title: '',
        sort: 0
      },
      fileList: [], //  上传文件列表
      BASE_API: process.env.BASE_API, // 接口API地址
      saveBtnDisabled: false, // 保存按钮是否禁用
      classId: '', // 所属课程
      classchapterNestedList: [], // 章节嵌套课时列表
      saveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      chapterId: '', // 课时所在的章节id
      video: {// 课时对象
        title: '',
        free: false,
        videoSourceId: '',
        videoOriginalName: ''
      }
    }
  },

  created() {
    console.log('chapter created')
    this.init()
  },

  methods: {
    previous() {
      console.log('previous')
      this.$router.push({ path: '/class/info/' + this.classId })
    },
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleVodRemove(file, fileList) {
      console.log(file)
      vod.removeById(this.video.videoSourceId).then(
        response => {
          this.video.videoSourceId = ''
          this.video.videoOriginalName = ''
          this.fileList = []
          this.$message({
            type: 'success',
            message: response.message
          })
        })
    },
    addvedio(id) {
      this.dialogVideoFormVisible = true
      this.chapterId = id
      this.fileList = []
      this.video = {
        title: '',
        free: false,
        videoSourceId: '',
        videoOriginalName: ''
      }
    },
    next() {
      console.log('next')
      this.$router.push({ path: '/class/publish/' + this.classId })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.classId = this.$route.params.id
        // 根据id获取课程基本信息
        this.fetchClassChapterNestedListByClassId()
      }
    },

    fetchClassChapterNestedListByClassId() {
      classchapter.getNestedTreeList(this.classId).then(response => {
        this.classchapterNestedList = response.data.items
      })
    },
    editClassChapter(classchapterId) {
      this.dialogChapterFormVisible = true
      classchapter.getById(classchapterId).then(response => {
        this.classchapter = response.data.item
      })
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.classchapter.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    saveOrUpdateVideo() {
      this.saveVideoBtnDisabled = true
      if (!this.video.id) {
        this.saveDataVideo()
      } else {
        this.updateDataVideo()
      }
    },
    //  成功回调
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoId
      this.video.videoOriginalName = file.name
    },
    //  视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },

    editVideo(videoId) {
      this.dialogVideoFormVisible = true
      video.getVideoInfoById(videoId).then(response => {
        this.video = response.data.item
        this.fileList = [{ 'name': this.video.videoOriginalName }]
      })
    },
    updateDataVideo() {
      console.log(this.video)
      video.updateVideoInfoById(this.video.id, this.video).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.helpSaveVideo()
      })
    },

    saveDataVideo() {
      this.video.classId = this.classId
      this.video.chapterId = this.chapterId
      console.log(this.video)
      video.saveVideoInfo(this.video).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.helpSaveVideo()
      })
    },

    helpSaveVideo() {
      this.dialogVideoFormVisible = false// 如果保存成功则关闭对话框
      this.fetchClassChapterNestedListByClassId()// 刷新列表
      this.video.title = ''// 重置章节标题
      this.fileList = []
      this.video.videoSourceId = ''// 重置视频资源id
      this.saveVideoBtnDisabled = false
    },

    saveData() {
      this.classchapter.classId = this.classId
      classchapter.save(this.classchapter).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.helpSave()
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },

    updateData() {
      classchapter.updateById(this.classchapter).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.helpSave()
      }).catch((response) => {
        // console.log(response)
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
    removeClassChapter(classchapterId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return classchapter.removeById(classchapterId)
      }).then(() => {
        this.fetchClassChapterNestedListByClassId()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
    },
    removeVideo(videoId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return video.removeById(videoId)
      }).then(() => {
        this.fetchClassChapterNestedListByClassId()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },

    helpSave() {
      this.dialogChapterFormVisible = false// 如果保存成功则关闭对话框
      this.fetchClassChapterNestedListByClassId()// 刷新列表
      this.classchapter.title = ''// 重置章节标题
      this.saveBtnDisabled = false
    }
  }
}
</script>

<style scoped>
  .classchanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .classchanpterList li{
    position: relative;
  }
  .classchanpterList p{
    float: left;
    font-size: 20px;
    margin: 15px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
    border-radius:25px;
  }
  .classchanpterList .acts {
    float: right;
    font-size: 14px;
  }

  .classvideoList{
    padding-left: 50px;
  }
  .classvideoList p{
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }

</style>

