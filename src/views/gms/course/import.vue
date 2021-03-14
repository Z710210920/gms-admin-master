<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">课程excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'/static/excel/%E6%B7%BB%E5%8A%A0%E8%AF%BE%E7%A8%8B%E7%A7%8D%E7%B1%BB%E6%A8%A1%E6%9D%BF.xlsx'">点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel文件">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/gmsservice/course/addByExcel'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      :hidden="Ifhidden"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current--rows>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="课程名称" width="160" align="center"/>
      <el-table-column
        :filters="target_filter"
        :filter-method="filterHandler"
        property="target"
        column-key="target"
        label="健身目的"
        sortable
        width="160"
        filter-placement="bottom-end"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :type= "scope.row.target > 2 ? 'primary':'success'"
            disable-transitions>{{ target [ scope.row.target ] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :filters="part_filter"
        :filter-method="filterHandler"
        align="center"
        property="part"
        column-key="part"
        label="部位"
        sortable
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type= "scope.row.part > 5 ? 'primary':'success'"
            disable-transitions>{{ part [ scope.row.part ] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :filters="difficulty_filter"
        :filter-method="filterHandler"
        align="center"
        property="difficulty"
        column-key="difficulty"
        label="课程难度"
        sortable
        width="160"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type= "scope.row.difficulty > 2 ? 'primary':'success'"
            disable-transitions>{{ difficulty [ scope.row.difficulty ] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="duration" label="课程时长" width="160" sortable align="center"/>
    </el-table>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import course from '@/api/course'

export default {
  data() {
    return {
      list: null,
      Ifhidden: true,
      BASE_API: process.env.BASE_API, // 接口API地址
      OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false,
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
  methods: {
    submitUpload() {
      this.fileUploadBtnText = '正在上传'
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },

    fileUploadSuccess(response) {
      if (response.success === true) {
        this.list = response.data.item
        console.log(this.course)
        this.fileUploadBtnText = '导入成功'
        this.loading = false
        this.Ifhidden = false
        this.$message({
          type: 'success',
          message: response.message
        })
      }
    },

    fileUploadError(response) {
      this.fileUploadBtnText = '导入失败'
      this.loading = false
      this.$message({
        type: 'error',
        message: '导入失败'
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
