<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="text">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            v-isHas='point.employees.import'
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="Export2Excel"
          v-if="isHas(point.employees.export)"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="add"
          v-isHas='point.employees.add'
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatterFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="hotpink"
                inactive-color="hotpink"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/details/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showAssignRoleDialog(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)"
              v-if="isHas(point.employees.del)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="total,sizes,prev, pager, next,jumper"
            @size-change="handleSizeChange"
            :page-size="pages.size"
            :page-sizes="[5, 8, 10, 15]"
            :current-page="pages.page"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <addEmployees :visible.sync="visible" @add-success="getEmployeesList" />
    <el-dialog title="二维码" :visible.sync="ercodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <AssignRole :visible.sync="showDialog" :employeesId='employeesId'/>
  </div>
</template>

<script>
import mixinsPermission from '@/mixins/permissions'
// import permissionPoint from '@/constant/permissions'
import QrCode from 'qrcode'
import addEmployees from './components/add-employees.vue'
import employees from '@/constant/employees'
import AssignRole from '@/views/employees/components/assign-role.vue'
import { getEmployeesListApi, delEmployee } from '@/api/employees'
const { exportExcelMapPath, hireType } = employees
export default {
  mixins:[mixinsPermission],
  data() {
    return {
      employees: [],
      pages: {
        page: 1,
        size: 5,
      },
      total: 0,
      visible: false,
      ercodeDialog: false,
      showDialog: false,
      employeesId:'',
      // point:permissionPoint
    }
  },
  components: {
    addEmployees,
    AssignRole
  },
  created() {
    this.getEmployeesList()
  },

  methods: {
    async getEmployeesList() {
      const res = await getEmployeesListApi(this.pages)
      console.log(res)
      this.employees = res.rows
      this.total = res.total
    },
    changePage(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    handleSizeChange(val) {
      this.pages.size = val
      this.getEmployeesList()
    },
    formatterFormOfEmployment(row, column, cellValue) {
      // if (cellValue===1) {
      //   return '正式'
      // }
      //  if (cellValue===1) {
      //   return '非正式'
      // }
      // return '未知'
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async delEmployee(id) {
      this.$confirm('你确认删除该员工？')
      const res = await delEmployee(id)
      console.log(res)
      this.$$message.success('删除成功')
      this.getEmployeesList()
    },
    add() {
      this.visible = true
    },
    async Export2Excel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesListApi({
        page: 1,
        size: this.total,
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header,
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) {
        return this.$message.error('用户没有上传头像')
      }
      this.ercodeDialog = true
      // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后
        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.myCanvas, staffPhoto) // 将地址转化成二维码
          
        })
    },
    showAssignRoleDialog(id){
      this.showDialog = true
      this.employeesId=id
    },
    // isHas(point){
    //   return this.$store.state.permissions.points.includes(point)
    // }
  },
}
</script>

<style scoped lang="less"></style>
