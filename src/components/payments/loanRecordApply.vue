<template>
  <div class="common-container">
    <div>
      <p class="common-title">项目基本信息</p>
      <common-box :data="data"></common-box>
      <p class="common-title">项目资料清单</p>
      <el-form  status-icon :model='customerInfo' :inline='true' ref='ruleForm3'>
        <el-table :data="customerInfo.list" border class="g-table" ref="table2">
          <el-table-column prop="carNum" label="资料类型">
            <template slot-scope="scope">
              <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.companyName'">
                <el-input v-model="scope.row.companyName"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="certificateNum" label="资料名称">
            <template slot-scope="scope">
              <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.legalName'">
                <el-input v-model="scope.row.legalName"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="ownerName" label="资料形式">
            <template slot-scope="scope">
              <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.mainBusiness'">
                <el-input v-model="scope.row.mainBusiness"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="carCategory" label="数量(份数)">
            <template slot-scope="scope">
              <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.otherCases'">
                <el-input v-model="scope.row.otherCases"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="carCategory" label="存货备注">
            <template slot-scope="scope">
              <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.otherCases'">
                <el-input v-model="scope.row.otherCases"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="操作" :width="80">
            <template slot-scope="scope">
              <div class="actions">
                <el-button type="text" @click="removeRow(scope.$index)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-button type="text" @click="addRow">增加一行</el-button>
      <div class="center">
        <el-button type="primary">提交</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        customerInfo: {
          list: []
        },
        hangup: '',
        data: [{label: '项目编号', value: '内容'}, {label: '客户姓名', value: '内容'}, {
          label: '企业名称', value: '内容'}, {label: '放款金额', value: '内容'}, {
            label: '收款帐户名', value: '内容'}, {label: '收款账户', value: '内容'}, {
              label: '开户行', value: '内容'}, {label: '业务经理', value: '内容'}, {
                label: '所属部门', value: '内容'}, {label: '放款申请时间', value: '内容'}]
      }
    },
    methods: {
      removeRow (row) {
        this.customerInfo.list.splice(row, 1)
      },
      addRow () {
        const temp = {
          companyName: '',
          createBy: '',
          id: '',
          legalName: '',
          mainBusiness: '',
          orderId: this.$route.query.orderId,
          otherCases: '',
          remark: '',
          updateBy: ''
        }
        this.customerInfo.list.push(temp)
      }
    },
    props: {},
    mounted () {},
    components: {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .demo-ruleForm{
    margin-top: 25px;
  }
  .center{
    display: flex;
    justify-content: center;
  }
</style>
