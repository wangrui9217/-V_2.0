<template>
  <div>
    <div class="container input-group">
      <el-select clearable v-model="searchForm.roleId" placeholder="请选择角色"
                 style="margin-right: 20px">
        <el-option
          v-for="item in $dict.getDictData('Depts')"
          :key="item.deptId"
          :label="item.name"
          :value="item.deptId">
        </el-option>
      </el-select>
      <el-input class="right search-btn" v-model.trim="searchForm.inputs"  placeholder="请输入关键词">
        <i class="iconfont-search el-input__icon" style="vertical-align: middle" slot="suffix" @click="searchFn"></i>
      </el-input>
    </div>
    <el-table :data="tableData" border class="g-table"
              ref="table">
      <el-table-column prop="roleName" label="编号">
      </el-table-column>
      <el-table-column prop="status" label="担保方式">
      </el-table-column>
      <el-table-column prop="roleName" label="担保人\担保公司名称" width="200">
      </el-table-column>
      <el-table-column prop="status" label="营业执照编号">
      </el-table-column>
      <el-table-column prop="roleName" label="身份证">
      </el-table-column>
      <el-table-column prop="status" label="手机号码">
      </el-table-column>
      <el-table-column prop="roleName" label="创建时间">
      </el-table-column>
      <el-table-column prop="status" label="更新时间">
      </el-table-column>
      <el-table-column prop="roleName" label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      searchForm: {}
    }
  },
  methods: {
    searchFn () {}
  }
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    justify-content: flex-end;
  }
</style>
