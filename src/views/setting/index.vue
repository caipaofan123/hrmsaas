<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
          v-if="isHas(point.roles.add)"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button
                  size="small"
                  type="success"
                  @click="showRightDialog(row.id)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary"
                v-if="isHas(point.roles.edit)"
                >编辑</el-button>
                <el-button size="small" type="danger"
                v-if="isHas(point.roles.del)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-size="pagesize"
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[1, 2, 3, 5, 10]"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addFormData"
        :rules="addFormRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addFormData.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="分配权限"
      :visible.sync="setRightsDialog"
      destroy-on-close
      @close="setRightsClose"
    >
      <el-tree
        default-expand-all
        show-checkbox
        node-key="id"
        :data="permissions"
        ref="perTree"
        :default-checked-keys="defaultCheckKeys"
        :props="{ label: 'name' }"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixinsPermission from '@/mixins/permissions'
// import permissionPoint from '@/constant/permissions'
import { getRolesApi, addRolesApi, getRolesInfo, assignPerm } from '@/api/role'
import { getCompanyInfo } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { change } from '@/utils'
export default {
  mixins:[mixinsPermission],
  data() {
    return {
      addDialogVisible: false,
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 10,
      page: 1,
      addFormData: {
        name: '',
        description: '',
      },
      addFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
        ],
      },
      companyInfo: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: '',
      },
      setRightsDialog: false,
      permissions: [],
      defaultCheckKeys: [],
      roleId:'',
      // point:permissionPoint
    }
  },

  created() {
    this.getRoles(), this.getCompanyInfo()
    this.getPermissions()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize,
      })
      console.log(rows)
      this.tableData = rows
      this.total = total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    onClose() {
      this.addDialogVisible = false
    },
    async onSave() {
      await this.$refs.form.validate()
      console.log('验证成功')
      await addRolesApi(this.addFormData)
      this.addDialogVisible = false
      this.getRoles()
    },
    dialogClose() {
      this.$refs.form.resetFields()
    },
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId,
      )
    },
    async showRightDialog(id) {
      this.roleId=id
      this.setRightsDialog = true
      const res = await getRolesInfo(id)
      // console.log(res)
      this.defaultCheckKeys = res.permIds
    },
    async getPermissions() {
      const res = await getPermissionList()
      const treePermission = change(res, '0')
      this.permissions = treePermission
      // console.log(treePermission)
    },
    setRightsClose() {
      this.defaultCheckKeys = []
    },
    async onSaveRights(){
      console.log(this.roleId);
      console.log(this.$refs.perTree.getCheckedKeys());
      await assignPerm({
        id:this.roleId,
        permIds:this.$refs.perTree.getCheckedKeys()
      })
      this.$message.success('分配成功')
      this.setRightsDialog=false
    },
    // isHas(point){
    //   return this.$store.state.permissions.points.includes(point)
    // }
  },
}
</script>

<style scoped lang="less"></style>
