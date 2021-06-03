<template>
  <div class="app-container">
    <!--月卡-->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="选择月卡类型" style="text-align:center">
      <el-form>账户余额： {{ user.balance }}</el-form>
      <el-form label-width="120px">
        <div class="block">
          <el-slider
            v-model="renawalMessage.type"
            :step="1"
            max="3"
            show-stops
            @change="alert(renawalMessage.type)"/>
        </div>
      </el-form>
      <el-form>
        <el-radio-group v-model="renawalMessage.type" align="center" border="true" size="medium" text-color="#FFE325" style="text-align:center" @change="isEnough()">
          <el-radio-button v-for="(item, index) in length" :key="index" :label="index" :format-tooltip="formatTooltip" :disabled="user.balance < price[index]" style="zoom: 110%;">
            时长： {{ item }}个月
            <br>
            价格： {{ item*150-index*10 }}
          </el-radio-button>
        </el-radio-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hidden()">取 消</el-button>
        <el-button :disabled="!enough" type="primary" @click="renewalcard()">续 费</el-button>
      </div>
    </el-dialog>
    <el-form label-width="120px">
      <el-form-item lable="模式">
        <el-switch
          v-model="edit"
          active-text="查看"
          inactive-text="修改"/>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.userName" :readonly="edit"/>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="user.userRealName" :readonly="edit"/>
      </el-form-item>
      <el-form-item label="我的余额">
        <el-input v-model="user.balance" readonly="true"/>
      </el-form-item>
      <el-form-item label="我的会员卡">
        <el-input v-model="user.deadline" :inline="true" readonly="true" style="width:380px"/>
        <el-button @click="show()">
          续费月卡
        </el-button>
      </el-form-item>
      <!--<el-form-item label="讲师排序">
        <el-input-number v-model="user.sort" controls-position="right" min="0"/>
      </el-form-item>-->
      <el-form-item label="用户等级">
        <el-select v-model="user.level" clearable placeholder="请选择" disabled="true">
          <el-option :value="0" label="会员用户"/>
          <el-option :value="1" label="特约用户"/>
          <el-option :value="2" label="至尊用户"/>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="user.userPhoneNumber" :readonly="edit"/>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="user.userIdentityNumber" :readonly="edit"/>
      </el-form-item>
      <el-form-item :hidden="edit" label="密码">
        <el-input v-model="user.userPassword" type="password"/>
      </el-form-item>
      <el-form-item label="用户简介">
        <el-input v-model="user.intro" :rows="10" :readonly="edit" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="用户头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="user.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button :disabled="edit" type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
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
          :url="BASE_API+'/gmsoss/fileoss/user'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="edit" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from '@/api/user'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
import store from '../../store'
import membershipcard from '../../api/membershipcard'

export default{
  components: { ImageCropper, PanThumb },
  computed: {
    ...mapGetters([
      'Id'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      user: {
      },
      edit: true,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false,
      imagecropperKey: 0,
      renawalMessage: {
        type: 0,
        userId: ''
      },
      length: [1, 3, 6, 12],
      enough: false,
      dialogChapterFormVisible: false,
      BASE_API: process.env.BASE_API,
      tip: ['月卡', '季卡', '半年卡', '年卡'],
      el_tag_type: ['warning', 'success', 'primary'],
      price: [150, 440, 880, 1770]
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
    isEnough() {
      this.enough = (this.length[this.renawalMessage.type] * 100 - this.renawalMessage.type * 10) < this.user.balance
    },
    show() {
      this.dialogChapterFormVisible = true
      this.renawalMessage.userId = this.user.userId
      this.isEnough()
    },
    renewalcard() {
      membershipcard.renewalcard(this.renawalMessage)
        .then(response => {
          this.$message({
            type: 'success',
            message: '续费成功!'
          })
          this.hidden()
          this.init()
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.$message({
            type: 'error',
            message: error.data.message
          })
        })
    },
    formatTooltip(val) {
      return this.tip[val]
    },
    hidden() {
      this.dialogChapterFormVisible = false
      this.enough = false
    },
    cropSuccess(data) {
      this.imagecropperShow = false
      // eslint-disable-next-line no-undef
      console.log(data)
      // eslint-disable-next-line no-undef
      this.user.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      user.getUser(this.Id)
        .then(response => {
          this.user = response.data.item
          this.user.userPassword = ''
        })
    },
    saveOrUpdate() {
      user.update(this.user.userId, this.user)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.saveBtnDisabled = true
          if (this.user.userPassword !== '') {
            alert('修改了密码,请重新登录')
            store.dispatch('LogOut')
            store.dispatch('FedLogOut')
          } else {
            this.init()
          }
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
