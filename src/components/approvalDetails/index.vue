<template>
  <div class="common-box">
    <div class="common-container pb30">
      <div>
        <el-tabs   v-model="activeName" tab-position="left">
          <el-tab-pane label="审批流程记录" name="first">
            <approve-record></approve-record>
          </el-tab-pane>
          <el-tab-pane label="借款人信息" name="second">
            <borrower-info :isDisabled="isDisabled || already" :isCheck="isCheck" ref="borrowInfo"></borrower-info>
          </el-tab-pane>
          <el-tab-pane label="企业信息" name="third">
            <company-info :isDisabled="isDisabled || already" :isCheck="isCheck" ref="companyInfo"></company-info>
          </el-tab-pane>
          <el-tab-pane label="担保信息" name="forth">
            <guarantee-list :isDisabled="isDisabled || already" :isCheck="isCheck"></guarantee-list>
          </el-tab-pane>
          <el-tab-pane label="资料上传" name="fifth">
            <upload :isDisabled="isDisabled || already" :isCheck="isCheck"></upload>
          </el-tab-pane>
          <el-tab-pane label="贷款信息核查" name="sixth" v-if="!isDisabled || already">
            <approve-check :isDisabled="isDisabled || already" ref="approveCheck"></approve-check>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="common-bottom-btn" v-if="!already">
      <el-button  @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="submit">提交审批</el-button>
    </div>
    <el-dialog title="项目审核结果" @close="dialog.showApprove = false" :visible.sync="dialog.showApprove" :close-on-click-modal="false" width="800px">
      <approve-result  ref="addApprove" @cancel="dialog.showApprove = false" :isDisabled="isDisabled"></approve-result>
    </el-dialog>
  </div>
</template>

<script>
  import {orderController} from './../../controller/common/order_controller'
  import approveRecord from './approve-record'
  import borrowerInfo from './../customerEntry/borrower_info'
  import companyInfo from './../work/work_company'
  import guaranteeList from './../guarantee/guarantee_list'
  import upload from './../upload/upload_list'
  import approveResult from './approve-result'
  import util from './../../util/util'
  import approveCheck from './approve-check'
  export default {
    components: {approveRecord, borrowerInfo, companyInfo, guaranteeList, upload, approveResult, approveCheck},
    data () {
      return {
        borrowerInfoErrorStep: '',
        // 是否是审核
        isCheck: true,
        activeName: 'first',
        dialog: {
          showApprove: false
        },
        isDisabled: util.isShow(this.$route.query.definitionKey),
        orderId: this.$route.query.orderId
      }
    },
    methods: {
      submitNotCheck () {},
      submit () {
        this.$nextTick(() => {
          const borrowInfo = this.$refs.borrowInfo
          const approveCheck = this.$refs.approveCheck
          const companyInfo = this.$refs.companyInfo
          borrowInfo.judgeValidate().then(res => {
            const customerCreditinfoRequest = res.customerCreditinfoRequest
            const customerInfoRequest = res.customerInfoRequest
            companyInfo.checkBeforeSubmit().then(params => {
              const companyObj = params
              // 禁用状态下不校验贷款信息核查
              if (this.isDisabled) {
                this.dialog.showApprove = true
                this.$nextTick(() => {
                  const addApprove = this.$refs.addApprove
                  addApprove.clearValidate()
                  addApprove.getNewState(customerCreditinfoRequest, customerInfoRequest, companyObj, {})
                })
              } else {
                approveCheck.judgeValidate().then(data => {
                  const loanInfoRequest = data
                  this.dialog.showApprove = true
                  this.$nextTick(() => {
                    const addApprove = this.$refs.addApprove
                    addApprove.clearValidate()
                    addApprove.getNewState(customerCreditinfoRequest, customerInfoRequest, companyObj, loanInfoRequest)
                  })
                }).catch((err) => {
                  if (typeof (err) === 'string') {
                    console.log(err)
                    this.$message.info('请完善相关信息')
                    this.activeName = 'sixth'
                  }
                })
              }
            }).catch((err) => {
              console.log('err', err)
              if (typeof (err) === 'string') {
                console.log(err)
                this.$message.info('请完善相关信息')
                companyInfo.activeName = err
                this.activeName = 'third'
              }
            })
          }).catch((err) => {
            if (typeof (err) === 'string') {
              console.log(err)
              this.$message.info('请完善相关信息')
              borrowInfo.activeName = err
              this.activeName = 'second'
            }
          })
        })
      },
      init () {
        const orderId = this.orderId
        orderController.queryApplyDetail({orderId}).then(res => {
          if (res.status === 200) {
            this.$refs.companyInfo.companyBankFlow(res.data.orderResponse.companyId)
            this.$refs.companyInfo.company(res.data.orderResponse.companyId)
          }
        })
      }
    },
    props: {
      already: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.init()
    },
    mounted () {

    },
    filters: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .pb30{
    padding-bottom: 80px;
  }
/deep/.el-tabs--left{
  .el-tabs__content{
    padding: 0 20px;
  }
}
</style>
