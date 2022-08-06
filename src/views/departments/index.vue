<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <treetools :treeNode="company" :isRoot="true" @add='dialogVisible=true'></treetools>
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <treetools :treeNode="data" @remove='getDepts' 
            @add='showAddDept'
            @edit='showEditDept'
            > </treetools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <add-depts @add='getDepts' :visible.sync='dialogVisible' :currentNode='currentNode' ref="addDepts"></add-depts>
  </div>
</template>

<script>
import addDepts from './components/add-depts.vue'
import { change } from '@/utils'
import { getDeptsApi } from '@/api/department'
import treetools from './components/tree-tools.vue'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      defaultProps: {
        label: 'name',
      },
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      dialogVisible:false,
      currentNode:{},
      loading:false
    }
  },
  components: {
    treetools,
    addDepts
  },
  created() {
    this.getDepts()
  },

  methods: {
    async getDepts() {
      this.loading=true
      const res = await getDeptsApi()
      console.log(res)
      this.departs = change(res.depts, '')
      this.loading=false
    },
    showAddDept(val){
      this.dialogVisible=true
      this.currentNode=val
    },
    showEditDept(val){
      this.dialogVisible=true
      this.$refs.addDepts.getDeptById(val.id)
  
    }
  },
}
</script>

<style scoped lang="scss"></style>
