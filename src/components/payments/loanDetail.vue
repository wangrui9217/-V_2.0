<template>
  <div>
    <div class="common-container">
      <div>
        <p class="common-title">贷款方案</p>
        <common-box :data="data" labelWidth="180px" :isLoading="isLoading"></common-box>
        <p class="common-title">放款信息</p>
        <common-box :data="data2" :isLoading="isLoading"></common-box>
        <p class="common-title">项目合同信息</p>
        <template>
          <div class="empty" v-if="contractInfos == null || contractInfos.length === 0">暂无数据</div>
          <div class="box" v-else >
            <a :href="item.url" v-for="(item,index) in contractInfos" :key="index" target="_blank">
              {{item.name}}
            </a>
          </div>
        </template>
        <p class="common-title">放款申请审核记录</p>
        <el-table
          :data="lendCheckHistoryResponseList"
          border
          class="g-table"
          style="width: 100%">
          <el-table-column
            prop="node"
            label="审核节点"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="审核状态"
            :formatter="(row) => $dict.getApproveState(row.state)"
          >
          </el-table-column>
          <el-table-column
            prop="createName"
            label="处理人"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="审核/回退意见"
            :width="500"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            :formatter="(row) => $formatDate(row.createTime, 'yyyy-MM-dd')"
            label="提交时间">
          </el-table-column>
        </el-table>
        <div class="common-bottom-btn" v-if="!showApprove">
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" @click="approveCheck">提交</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="放款申请审核结果" @close="dialog.showApprove = false" :visible.sync="dialog.showApprove" :close-on-click-modal="false" width="800px">
      <approve-result  ref="addApprove" @cancel="dialog.showApprove = false"></approve-result>
    </el-dialog>
  </div>
</template>

<script>
  import { lendController } from "./../../controller/common/lend_controller";
  import approveResult from './loanApproveResult'
  export default {
    data () {
      return {
        isLoading: true,
        dialog: {
          showApprove: false
        },
        showApprove: this.$route.query.type,
        lendCheckHistoryResponseList: [],
        contractInfos: [],
        orderLendResponse: []
      }
    },
    methods: {
      init () {
        const orderId = this.$route.query.orderId
        lendController.queryApproveDetail({orderId}).then(res => {
          this.isLoading = false
          if (res.status === 200) {
            this.lendCheckHistoryResponseList = res.data.lendCheckHistoryResponseList
            this.orderLendResponse = res.data.orderLendResponse
            this.contractInfos = res.data.contractInfos
          }
        }).catch(() => {
          this.isLoading = false
        })
      },
      approveCheck () {
        this.dialog.showApprove = true
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
        let data = this.orderLendResponse
        return [{label: '项目编号', value: data.orderNo}, {label: '项目标号', value: data.targetNo}, {label: '借款主体名称', value: data.enterpriseName}, {
          label: '放款金额', value: data.loanAmount}, {label: '会员号', value: data.memberNo}, {label: '统一信用代码/身份证', value: data.codeCard}, {
            label: '收款账户名', value: data.receiveAccountName}, {label: '收款账号', value: data.receiveAccount}, {label: '开户行', value: data.receiveBank}, {
              label: '业务经理', value: data.salesmanName}, {label: '所属部门', value: data.salesmanOwnCompany}, {label: '放款申请时间', value: this.$formatDate(data.loanTime, 'yyyy-MM-dd')}]
      },
      data2 () {
        let data = this.orderLendResponse
        return [{label: '贷款金额', value: data.projectAmount}, {label: '期限', value: data.projectTerm + this.$dict.findDictionaryName(data.projectTermUnit)}, {label: '最短收息期', value: data.minday + this.$dict.findDictionaryName(data.mindayUnit)}, {
          label: '还款方式', value: this.$dict.findDictionaryName(data.paymentplanId)}, {label: '费用方案', value: data.feeplanId === 1 ? '默认方案' : '技术服务费方案'}, {
            label: '费率', value: data.feeplanId === 1 ? data.projectRate + '%/' + this.$dict.findDictionaryName(data.projectrateUnit) : '利率(月)' + data.projectRate + '%' + '; 平台利率：' + data.managementRate + '%/' + this.$dict.findDictionaryName(data.projectrateUnit)}, {
              label: '担保方式', value: data.guaranteeCode === '0' ? '无担保' : '有担保'}, {label: '额外放款条件', value: data.loanCondition}, {label: '贷款用途', value: this.$dict.findDictionaryName(data.usage)}]
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
  .empty{
    color: #909399;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  .box{
    display: flex;
    a{
      width: 30%;
      text-align: center;
      line-height: 80px;
      color: #0366d6;
    }
    a:hover{
      text-decoration: underline;
    }
  }
</style>
