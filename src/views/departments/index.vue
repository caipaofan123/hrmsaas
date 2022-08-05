<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <treetools :treeNode="company" :isRoot="true"></treetools>
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
            <template v-slot='{data}'>
              <treetools :treeNode="data"> </treetools>
            </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treetools from './components/tree-tools.vue'
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
    }
  },
  components: {
    treetools,
  },
  created() {},

  methods: {},
}
</script>

<style scoped lang="scss">

</style>
