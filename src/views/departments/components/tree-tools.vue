<template>
  <el-row type="flex">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="5">
      <el-row type="flex">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <template v-if="!isRoot">
                <el-dropdown-item>删除子部门</el-dropdown-item>
                <el-dropdown-item>修改子部门</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'treetools',
  data() {
    return {}
  },
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  created() {},

  methods: {},
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 980px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-row {
  width: 100%;
}
</style>
