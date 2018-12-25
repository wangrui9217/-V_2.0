<template>
  <div>
    <div class="common-container">
      <div>
        <p class="common-title">回款申请信息</p>
        <common-box :data="data" labelWidth="180px" :isLoading="isLoading"></common-box>
        <template v-if="showApprove && repayment.repaymentType != 1">
          <p class="common-title">回款审核信息</p>
          <common-box :data="data2" labelWidth="180px" :isLoading="isLoading"></common-box>
        </template>
        <p class="common-title">项目信息</p>
        <common-box :data="data3" labelWidth="180px" :isLoading="isLoading"></common-box>
        <p class="common-title">还款计划表</p>
        <el-radio-group v-model="radio" class="p20">
          <el-radio-button label="还款计划表"></el-radio-button>
          <el-radio-button label="服务费还款计划表" v-if="order.feeplanId !== 1"></el-radio-button>
        </el-radio-group>
        <el-table
          v-show="radio === '还款计划表'"
          :data="loanList"
          border
          :show-overflow-tooltip="true"
          class="g-table"
          ref="multipleTable"
          @selection-change="handleSelectionChange">
          style="width: 100%">
          <el-table-column
            type="selection"
            :selectable="() => false"
            width="55">
          </el-table-column>
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
            <template slot-scope="scope">
              <span v-if="scope.row.planState == 0">未结清</span>
              <span v-if="scope.row.planState == 1">已结清</span>
              <span v-if="scope.row.planState == 2">已确认</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="radio === '服务费还款计划表'"
          :data="serviceList"
          border
          ref="multipleTable2"
          class="g-table"
          style="width: 100%">
          <el-table-column
            type="selection"
            :selectable="() => false"
            width="55">
          </el-table-column>
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
            <template slot-scope="scope">
              <span v-if="scope.row.planState == 0">未结清</span>
              <span v-if="scope.row.planState == 1">已结清</span>
              <span v-if="scope.row.planState == 2">已确认</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="common-bottom-btn" >
          <el-button @click="$router.back(-1)">返回</el-button>
          <el-button type="primary" @click="approveCheck" v-if="!showApprove">提交</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="回款审核结果" @close="dialog.showApprove = false" :visible.sync="dialog.showApprove" :close-on-click-modal="false" width="800px">
      <approve-result  ref="addApprove" @cancel="dialog.showApprove = false" :id="repayment.id"></approve-result>
    </el-dialog>
  </div>
</template>

<script>
  import { planController } from "./../../controller/common/plan_controller";
  import approveResult from './moneyBackResult'
  export default {
    data () {
      return {
        selectVal: [],
        isLoading: true,
        radio: '还款计划表',
        dialog: {
          showApprove: false
        },
        showApprove: this.$route.query.type,
        loanList: [],
        order: {},
        repayment: {
          repaymentType: 1
        },
        serviceList: []
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.selectVal = val
      },
      init () {
        const repaymentNo = this.$route.query.orderId
        planController.queryPlanApplyDetail({repaymentNo}).then(res => {
          this.isLoading = false
          if (res.status === 200) {
            this.loanList = res.data.loanList || []
            this.order = res.data.order || {}
            this.serviceList = res.data.serviceList || []
            this.repayment = res.data.repayment || {}
            const list = res.data.list
            this.$nextTick(() => {
              this.loanList.map(value => {
                if (list.some(val => val.type == 1 && val.terms == value.terms)) {
                  this.$refs.multipleTable.toggleRowSelection(value)
                }
              })
              this.serviceList.map(value => {
                if (list.some(val => val.type == 0 && val.terms == value.terms)) {
                  this.$refs.multipleTable2.toggleRowSelection(value)
                }
              })
            })
          }
        }).catch(() => {
          this.isLoading = false
        })
      },
      approveCheck () {
        this.dialog.showApprove = true
      },
      getReviewState (id) {
        if (id === '0') {
          return '待审核'
        } else if (id === '1') {
          return '同意'
        } else if (id === '2') {
          return '驳回'
        }
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
        return [{label: '回款申请编号', value: data.orderNo}, {label: '回款金额', value: data.loanAmount}, {label: '回款方式', value: data.payment}, {
          label: '申请业务员', value: data.salesmanName}, {label: '所属机构', value: data.salesmanOwnCompany}, {
            label: '申请时间', value: this.$formatDate(data.loanApplyTime, 'yyyy-MM-dd')}]
          // , {label: '回款到账状态', value: data.codeCard}
      },
      data2 () {
        let data = this.repayment
        return [{label: '审核结果', value: this.getReviewState(data.state)}, {label: '审核时间', value: this.$formatDate(data.reviewTime, 'yyyy-MM-dd')}, {label: '审核人', value: data.reviewUserName}, {
          label: '审核意见', value: data.reviewOpinion}]
      },
      data3 () {
        let data = this.order
        return [{label: '项目编号', value: data.orderNo}, {label: '项目标号', value: data.targetNo}, {label: '借款主体名称', value: data.enterpriseName}, {
          label: '放款金额', value: data.loanAmount}, {label: '会员号', value: data.memberNo}, {label: '统一信用代码/身份证', value: data.codeCard}, {
            label: '放款时间', value: this.$formatDate(data.loanTime, 'yyyy-MM-dd')}, {label: '还款状态', value: data.orderStatus}, {
              label: '业务经理', value: data.salesmanName}, {label: '所属部门', value: data.salesmanOwnCompany}]
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
</style>
