<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" >
            <userInfo></userInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserBaseInfo, saveUserDetailById } from '@/api/user'
import userInfo from './components/user-info'
export default {
  data() {
    return {
      formData: {
        // username:'',
        // password:''
      },
    }
  },
    components:{
        userInfo
    },
  created() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      const res = await getUserBaseInfo(this.$route.params.id)
      this.formData = res
    },
    async onSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('修改成功')
    },
  },
}
</script>

<style scoped></style>
