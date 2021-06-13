<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">设备入库模板说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'static/excel/设备入库模板.xlsx'">点击下载模版</a>
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
          :action="BASE_API+'/gmsservice/equipment/addByExcel'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary" @click="abled()">选取文件</el-button>
          <el-button
            :disabled="able"
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
      element-loading-text="数据加载中"
      border
      :hidden = "Ifhidden"
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

      <el-table-column prop="equipmentName" label="器材名称" sortable align="center"/>
      <el-table-column prop="equipmentTotalNumber" label="数量" sortable align="center"/>
    </el-table>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import equipment from '@/api/equipment'

export default {
  data() {
    return {
      list: null,
      Ifhidden: true,
      BASE_API: process.env.BASE_API, // 接口API地址
      OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false,
      able: true,
      equipment: {}
    }
  },
  methods: {
    submitUpload() {
      this.fileUploadBtnText = '正在上传'
      this.importBtnDisabled = true
      this.loading = true
      this.$refs.upload.submit()
    },
    abled() {
      this.able = false
    },
    fileUploadSuccess(response) {
      if (response.success === true) {
        this.list = response.data.item
        console.log(this.equipment)
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
