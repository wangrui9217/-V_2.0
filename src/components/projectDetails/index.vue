<template>
  <div class="common-box">
    <div class="common-container pb30">
      <div >
        <p class="common-title">企业基本信息</p>
        <el-form ref="companyform" :model="companyform">
          <el-row>
            <el-col :span="8">
              <el-form-item label="公司名称：">
                <span>{{ companyInfo.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社会统一代码：">
                <span>{{ companyInfo.credit }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" >
              <el-form-item label="法人姓名：">
                <span>{{companyInfo.legalName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人身份证：">
                <span>{{ companyInfo.legalCardNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人手机号：">
                <span>{{ companyInfo.legalPhone }}</span>
              </el-form-item>
              <div class="grid-content bg-purple">
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="实际控制人信息">
              <el-checkbox :disabled="isDisabled" v-model="isSame" @change="setSame">同法人</el-checkbox>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8" >
              <el-form-item
                :rules="$rules.realnameRule"
                :show-message="!isSame"
                label="实际控制人姓名 : "
                prop="companyUpdateRequest.actualControllerName">
                <span>{{companyInfo.actualControllerName}}</span>
                <!--<el-input-->
                  <!--class="input"-->
                  <!--v-model="companyInfo.actualControllerName"-->
                  <!--:disabled="isSame || isDisabled"/>-->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :rules="$rules.idCardRule"
                label="身份证 : "
                :show-message="!isSame"
                prop="companyUpdateRequest.actualControllerCardNum">
                <span>{{companyInfo.actualControllerCardNum}}</span>
                <!--<el-input-->
                  <!--class="input"-->
                  <!--v-model="companyInfo.actualControllerCardNum"-->
                  <!--:disabled="isSame || isDisabled"/>-->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话/手机号码 : " >
                <span>{{companyInfo.actualControllerPhone}}</span>
                <!--<el-input-->
                  <!--class="input"-->
                  <!--v-model="companyInfo.actualControllerPhone"-->
                  <!--type="number"-->
                  <!--:disabled="isSame || isDisabled"/>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <p class='common-title management-title'>最新贷款方案</p>
        <div class="content" style="margin-bottom: 20px">
          <el-form label-position='left' :model='orderResponse' label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="贷款金额：">
                  <span v-text="orderResponse.projectAmount + '（万元）'"></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="期限：">
                  <span v-text="orderResponse.projectTerm"> </span>
                  <span v-text="$dict.findDictionaryName(orderResponse.projectTermUnit)"></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最短收息期：">
                  <span v-text="orderResponse.minday"> </span>
                  <span v-text="$dict.findDictionaryName(orderResponse.mindayUnit)"> </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="费用方案：">
                  <span v-text="orderResponse.feeplanId === 1 ? '默认方案' : '技术服务费方案'"></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="费率：">
                  <span v-text="orderResponse.projectRate"></span>
                  <span v-if="orderResponse.projectRate">% </span>
                  <span v-text="orderResponse.feeplanId === 1 ? $dict.findDictionaryName(orderResponse.projectrateUnit) : '月'"></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="还款方式：">
                  <span v-text="$dict.findDictionaryName(orderResponse.paymentplanId)"></span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>

              <el-col :span="8">
                <el-form-item label="担保方式：">
                  <span v-text="orderResponse.guaranteeCode == 3 ? '有担保' : '无担保'"></span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="贷款用途：">
                  <span v-text="$dict.findDictionaryName(orderResponse.usage)"></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
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
    <!--<div class="btn" v-if="!already">-->
      <!--<el-button  @click="$router.go(-1)">取消</el-button>-->
      <!--<el-button type="primary" @click="submit">提交审批</el-button>-->
    <!--</div>-->
    <!--<el-dialog title="项目审核结果" @close="dialog.showApprove = false" :visible.sync="dialog.showApprove" :close-on-click-modal="false" width="800px">-->
      <!--<approve-result  ref="addApprove" @cancel="dialog.showApprove = false" :isDisabled="isDisabled"></approve-result>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import {orderController} from './../../controller/common/order_controller'
  import approveRecord from './project-approve-record'
  import borrowerInfo from './../customerEntry/borrower_info'
  import companyInfo from './project_work_company'
  import guaranteeList from './../guarantee/guarantee_list'
  import upload from './../upload/upload_list'
  import approveResult from './../approvalDetails/approve-result'
  import util from './../../util/util'
  import approveCheck from './../approvalDetails/approve-check'
  export default {
    components: {approveRecord, borrowerInfo, companyInfo, guaranteeList, upload, approveResult, approveCheck},
    data () {
      return {
        companyform: {
          companyShareholderInfoList: [],
          companyUpdateRequest: {
            name: "",
            legalName: "",
            credit: "",
            controllerCardNum: "",
            controllerPhone: ""
          },
          companyList: {
            actualControllerName: "",
            actualControllerPhone: "",
            actualControllerCardNum: "",
            registerMoney: "",
            registerTime: "",
            capital: "",
            id: "",
            registerAddressDetail: "",
            actualOperatingAddressDetail: "",
            businessScope: "",
            otherInformation: ""
          },
          percent: true,
          isSame: false,
          activeName_first: false,
          activeName_second: false,
          activeName_third: false,
          companyId: "",
        },
        isSame: false,
        orderId: this.$route.query.orderId,
        orderResponse: {},
        approvalHistoryResponseList : [],
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
      // 获取企业基本信息
      company(companyId) {
        debugger
        companyController
          .company({
            companyId: companyId
          })
          .then(res => {
            // console.log('==========>',res)
            this.companyUpdateRequest = {
              ...this.companyUpdateRequest,
              ...res.data.companyEntity
            };
            if (
              this.companyUpdateRequest.legalCardNum ===
              this.companyUpdateRequest.actualControllerCardNum
            ) {
              this.isSame = true;
            }
            const list = res.data.companyEntity;
            this.companyform = {
              companyShareholderInfoList: res.data.companyShareholderInfoList,
              companyUpdateRequest: {
                ...list,
                registerTime:
                  list.registerTime > 0
                    ? formatDate(list.registerTime, "yyyy-MM-dd")
                    : null,
                actualControllerName: list.actualControllerName,
                actualControllerName: list.actualControllerName,
                actualControllerName: list.actualControllerName,
                addressList: [
                  list.registeredAddressProvince - 0,
                  list.registeredAddressCity - 0,
                  list.registeredAddressDistrict - 0
                ],

                censusAddressList: [
                  list.actualOperatingAddressProvince - 0,
                  list.actualOperatingAddressCity - 0,
                  list.actualOperatingAddressDistrict - 0
                ]
              }
            };
            this.hank.bankFlowMatchesOperations = list.bankFlowMatchesOperations;
            this.hank.noMatchInstructions = list.noMatchInstructions;
            setTimeout(() => {
              this.$refs.companyform.clearValidate();
            }, 10);
          });
      },
      setSame() {
        if (this.isSame) {
          this.companyform.companyUpdateRequest.actualControllerName = this.companyUpdateRequest.legalName;
          this.companyform.companyUpdateRequest.actualControllerCardNum = this.companyUpdateRequest.legalCardNum;
          this.companyform.companyUpdateRequest.actualControllerPhone = this.companyUpdateRequest.legalPhone;
        } else {
          this.companyform.companyUpdateRequest.actualControllerName = "";
          this.companyform.companyUpdateRequest.actualControllerCardNum = "";
          this.companyform.companyUpdateRequest.actualControllerPhone = "";
        }
      },
      getApproveRecord () {
        const orderId = this.orderId
        orderController.queryApplyDetail({orderId}).then(res => {
          if (res.status === 200) {
            this.orderResponse = res.data.orderResponse
            let createTime = new Date(this.orderResponse.createTime);
            this.orderResponse.createTime = this.orderResponse.createTime ? this.$formatDate(createTime, "yyyy-MM-dd hh:mm:ss") : "";
            this.approvalHistoryResponseList = res.data.approvalHistoryResponseList
          }
          console.log(this.orderResponse,23232323)
          this.orderResponse.projectAmount = this.orderResponse.projectAmount ? this.orderResponse.projectAmount :"";
        })
      },
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
            this.$nextTick(() => {
              this.$refs.companyInfo.companyBankFlow(res.data.orderResponse.companyId)
              this.$refs.companyInfo.company(res.data.orderResponse.companyId)
            })
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
      this.init();
      this.getApproveRecord()
    },
    mounted () {
    },
    filters: {},
    computed: {
      companyInfo () {
        return this.$store.state.companyInfo
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .pb30{
    padding-bottom: 80px;
  }
  .input{
    width: 300px !important;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
.btn{
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 56px;
  align-items: center;
  padding-right: 50px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
}
/deep/.el-tabs--left{
  .el-tabs__content{
    padding: 0 20px;
  }
}
</style>
