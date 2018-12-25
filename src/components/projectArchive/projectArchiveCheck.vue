<template>
  <div>
    <div class="common-container">
      <div>
        <p class="common-title">放款信息</p>
        <common-box :data="data" labelWidth="180px" :isLoading="isLoading"></common-box>
        <p class="common-title">还款计划表</p>
        <el-radio-group v-model="radio" class="p20">
          <el-radio-button label="还款计划表"></el-radio-button>
          <el-radio-button label="服务费还款计划表"></el-radio-button>
        </el-radio-group>
        <template v-if="radio === '还款计划表'">
          <el-table
            :data="loanList"
            border
            class="g-table"
            style="width: 100%">
            <el-table-column
              prop="terms"
              label="期数"
            >
            </el-table-column>
            <el-table-column
              prop="returnTime"
              label="还款日期"
              :formatter="(row) => $formatDate(row.returnTime, 'yyyy-MM-dd')"
            >
            </el-table-column>
            <el-table-column
              prop="createName"
              :formatter="(row) => row.pricipal + row.interset"
              label="应收本息和(元)"
            >
            </el-table-column>
            <el-table-column
              prop="pricipal"
              label="应收本金(元)"
            >
            </el-table-column>
            <el-table-column
              prop="interset"
              label="应收利息(元)"
            >
            </el-table-column>
            <el-table-column
              prop="planState"
              label="还款状态"
            >
            </el-table-column>
          </el-table>
        </template>
        <template v-if="radio === '服务费还款计划表'">
          <el-table
            :data="serviceList"
            border
            class="g-table"
            style="width: 100%">
            <el-table-column
              prop="terms"
              label="期数"
            >
            </el-table-column>
            <el-table-column
              prop="returnTime"
              label="应还日期"
              :formatter="(row) => $formatDate(row.returnTime, 'yyyy-MM-dd')"
            >
            </el-table-column>
            <el-table-column
              prop="pricipal"
              label="应还服务费(元)"
            >
            </el-table-column>
            <el-table-column
              prop="planState"
              label="还款状态"
            >
            </el-table-column>
          </el-table>
        </template>
        <p class="common-title">回款申请</p>
        <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
          <el-form-item label="还款金额:" prop="repaymentAmount"  :rules='$rules.requiredInputValue'>
            <el-input  v-model="ruleForm2.repaymentAmount" ></el-input>
          </el-form-item>
          <el-form-item label="还款方式:" prop="repaymentType"  :rules='$rules.requiredSelectValue'>
            <el-select v-model='ruleForm2.repaymentType' placeholder='请选择'>
              <el-option
                v-for="item in option"
                :key='item.value'
                :label='item.name'
                :value='item.value'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请备注:" prop="applyContent"  :rules='$rules.requiredInputValue'>
            <el-input  v-model="ruleForm2.applyContent" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div class="common-bottom-btn" v-if="!showApprove">
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="回款审核结果" @close="dialog.showApprove = false" :visible.sync="dialog.showApprove" :close-on-click-modal="false" width="800px">
      <approve-result  ref="addApprove" @cancel="dialog.showApprove = false"></approve-result>
    </el-dialog>
  </div>
</template>

<script>
  import { planController } from "./../../controller/common/plan_controller";
  import approveResult from './moneyBackResult'
  export default {
    data () {
      return {
        option: [{name: '客户自主还款', value: '1'}, {name: '公司垫付', value: '2'}],
        ruleForm2: {
          repaymentAmount: '',
          repaymentType: '',
          applyContent: '',
          orderId: this.$route.query.orderId
        },
        isLoading: true,
        radio: '还款计划表',
        dialog: {
          showApprove: false
        },
        showApprove: this.$route.query.type,
        loanList: [],
        order: {},
        serviceList: []
      }
    },
    methods: {
      init () {
        const orderId = this.$route.query.orderId
        planController.queryPlanOrderDetail({orderId}).then(res => {
          this.isLoading = false
          if (res.status === 200) {
            this.loanList = res.data.loanList
            this.order = res.data.order
            this.serviceList = res.data.serviceList
          }
          // console.log(res)
        }).catch(() => {
          this.isLoading = false
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.approveCheck()
          } else {
            return false
          }
        })
      },
      approveCheck () {
        planController.confirmPlanOrder(this.ruleForm2).then(res => {
          if (res.status === 200) {
            this.$message.success('提交成功')
            this.$router.go(-1)
          }
          console.log(res)
        })
      }
    },
    props: {},
    mounted () {
      this.init()
    },
    components: {approveResult},
    filters: {},
    computed: {
      data () {
        let data = this.order
        return [{label: '项目编号', value: data.orderNo}, {label: '项目标号', value: data.targetNo}, {label: '借款主体名称', value: data.enterpriseName}, {
          label: '放款金额', value: data.loanAmount}, {label: '会员号', value: data.memberNo}, {label: '统一信用代码/身份证', value: data.codeCard}, {
            label: '业务经理', value: data.salesmanName}, {label: '所属部门', value: data.salesmanOwnCompany}, {label: '放款申请时间', value: this.$formatDate(data.loanTime, 'yyyy-MM-dd')}]
      },
      data2 () {
        let data = this.order
        return [{label: '贷款金额', value: data.projectAmount}, {label: '期限', value: data.projectTerm}, {label: '最短收息期', value: data.minday}, {
          label: '还款方式', value: data.payment}, {label: '费用方案', value: data.feeplan}, {label: '费率', value: data.managementRate}, {
            label: '担保方式', value: this.$dict.findDictionaryId('OrderStatus', data.guaranteeType)}, {label: '额外放款条件', value: data.loanCondition}, {label: '贷款用途', value: data.usage}]
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .demo-ruleForm{
    margin-top: 25px;
  }
  .center{
    margin-top: 22px;
    display: flex;
    justify-content: center;
  }
  .mt20{
    margin-top: 20px;
  }
  .back{
    padding: 0px 10px 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .p20{
    padding: 20px 0;
  }
  .demo-ruleForm{
    display: flex;
    flex-wrap: wrap;
    &>div{width: 34%}
    &>div:nth-last-child(1){width: 70%}
  }
</style>
