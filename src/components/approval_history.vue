<template>
  <div>
    <p class="common-title">项目审批历史</p>
    <el-table :data="tableData" border class="g-table"
              ref="table">
      <el-table-column prop="roleName" label="审批节点">
      </el-table-column>
      <el-table-column prop="status" label="审批结果">
      </el-table-column>
      <el-table-column prop="roleName" label="审批金额">
      </el-table-column>
      <el-table-column prop="status" label="期限">
      </el-table-column>
      <el-table-column prop="roleName" label="还款方式">
      </el-table-column>
      <el-table-column prop="status" label="费用方案">
      </el-table-column>
      <el-table-column prop="roleName" label="月利率">
      </el-table-column>
      <el-table-column prop="status" label="平台利率">
      </el-table-column>
      <el-table-column prop="roleName" label="付息方式">
      </el-table-column>
      <el-table-column prop="status" label="逾期费用">
      </el-table-column>
      <el-table-column prop="roleName" label="拒绝原因">
      </el-table-column>
      <el-table-column prop="status" label="审批意见">
      </el-table-column>
      <el-table-column prop="roleName" label="审批时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
