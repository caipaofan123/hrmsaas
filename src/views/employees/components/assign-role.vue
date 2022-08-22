<template>
  <el-dialog title="分配角色" :visible="visible" @close="onClose" @open="onOpen">
    <span slot="footer" class="dialog-footer">
      <el-checkbox-group v-model="checkList">
        <el-checkbox :label="item.id" :key="item.id" v-for="item in roles">
            {{item.name}}
        </el-checkbox>
      </el-checkbox-group>
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserBaseInfo } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  data() {
    return {
        checkList: [],
        roles:[]
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    employeesId:{
      type: String,
      required: true,
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    async getRoleList() {
      const { rows } = await getRolesApi()
      console.log(rows);
      this.roles = rows
    },
    onOpen(){
        this.getRoleList()
        this.getEmployeesRoles()
    },
    async getEmployeesRoles(){
      const {roleIds} =await getUserBaseInfo(this.employeesId)
      console.log(roleIds);
      this.checkList=roleIds
    },
    async assignRoles(){
      if (!this.checkList.length) {
        return this.$message('请选择角色')
      }
      await assignRoles({
        id:this.employeesId,
        roleIds:this.checkList
      })
      this.$message.success('分配成功')
      this.onClose()
    }
  },
}
</script>
