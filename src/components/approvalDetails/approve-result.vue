<template>
  <div>
    <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
      <el-form-item label="审核结果" prop="state" class="in-line" :rules='$rules.requiredInputValue'>
        <el-radio-group v-model="ruleForm2.state">
          <el-radio label="PASS">通过</el-radio>
          <el-radio label="REFUSE">拒绝</el-radio>
          <el-radio label="BACK">回退</el-radio>
          <!--<el-radio label="HANG_UP">挂起</el-radio>-->
        </el-radio-group>
      </el-form-item>
      <template v-if="ruleForm2.state === 'PASS'">
        <el-form-item label="拟批金额(万元)" prop="projectAmount" :rules='$rules.requiredInputNumber'>
          <el-input  v-model="ruleForm2.projectAmount" type="number"></el-input>
        </el-form-item>
        <el-form-item label="借款期限">
          <div class="box">
            <el-form-item  prop="projectTerm" :rules='$rules.requiredInputNumber'>
              <el-input  v-model="ruleForm2.projectTerm" type="number"></el-input>
            </el-form-item>
            <el-form-item  prop="projectTermUnit" :rules='$rules.requiredSelectValue'>
              <el-select v-model='ruleForm2.projectTermUnit' placeholder='请选择'>
                <el-option
                  v-for="item in $dict.findDictData('DateUnit')"
                  :key='item.id'
                  :label='item.value'
                  :value='item.id'>
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="费用方案" prop="feeplanId" :rules='$rules.requiredSelectValue'>
          <el-select v-model='ruleForm2.feeplanId' placeholder='请选择'>
            <el-option
              v-for="item in option"
              :key='item.id'
              :label='item.value'
              :value='item.id'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款方式" prop="paymentplanId" :rules='$rules.requiredSelectValue'>
          <el-select v-model='ruleForm2.paymentplanId' placeholder='请选择'>
            <el-option
              v-for="item in $dict.findDictData('Repayment')"
              :key='item.id'
              :label='item.value'
              :value='item.id'>
            </el-option>
          </el-select>
        </el-form-item>
        <template v-if="ruleForm2.feeplanId == 1">
          <el-form-item label="费率(%)">
            <div class="box">
              <el-form-item prop="projectRate" :rules='$rules.requiredInputNumber'>
                <el-input  v-model="ruleForm2.projectRate" type="number"></el-input>
              </el-form-item>
              <el-form-item prop="projectrateUnit" :rules='$rules.requiredSelectValue'>
                <el-select v-model='ruleForm2.projectrateUnit' placeholder='请选择'>
                  <el-option
                    v-for="item in $dict.findDictData('DateUnit')"
                    :key='item.id'
                    :label='item.value'
                    :value='item.id'>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item></el-form-item>
        </template>
        <template v-else>
          <el-form-item label="月费率(%)" prop="projectRate" :rules='$rules.requiredInputNumber'>
            <el-input  v-model="ruleForm2.projectRate" type="number"></el-input>
          </el-form-item>
          <el-form-item label="平台利率" prop="carCategory">
            <div class="box">
              <el-form-item prop="managementRate" :rules='$rules.requiredInputNumber'>
                <el-input  v-model="ruleForm2.managementRate" type="number"></el-input>
              </el-form-item>
              <el-form-item prop="projectrateUnit" :rules='$rules.requiredSelectValue'>
                <el-select v-model='ruleForm2.projectrateUnit' placeholder='请选择'>
                  <el-option
                    v-for="item in $dict.findDictData('DateUnit')"
                    :key='item.id'
                    :label='item.value'
                    :value='item.id'>
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
        </template>
        <el-form-item label="付息方式" prop="interestPayment">
          <div class="box">
            <el-form-item prop="interestPayment" :rules='$rules.requiredSelectValue'>
              <el-select v-model='ruleForm2.interestPayment' placeholder='请选择'>
                <el-option
                  v-for="item in $dict.findDictData('InterestPayment')"
                  :key='item.id'
                  :label='item.value'
                  :value='item.id'>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="interPayContent" :rules='$rules.requiredInputNumber' v-if="$dict.findDictionaryName(ruleForm2.interestPayment) === '预付'">
              <el-input  v-model="ruleForm2.interPayContent" type="number"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="逾期费率(‰/天)" prop="overdueRate" :rules='$rules.requiredInputNumber'>
          <el-input  v-model="ruleForm2.overdueRate" type="number"></el-input>
        </el-form-item>
        <div class="box2" v-show="ruleForm2.feeplanId == 2">
          <add-repayment ref="addRepayment"  @refresh="initState(true)"></add-repayment>
        </div>
        <el-form-item label="额外放款条件" class="in-line">
          <el-input  v-model="ruleForm2.loanCondition"></el-input>
        </el-form-item>
        <el-form-item label="审核意见"  class="in-line">
          <el-input  v-model="ruleForm2.auditOpinion" type="textarea"
                     :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <template v-if="ruleForm2.state === 'REFUSE'">
      <el-form  label-width="140px" class="demo-ruleForm">
        <el-form-item label="拒绝原因"  class="in-line">
          <el-input  v-model="refuse.loanCondition" ></el-input>
        </el-form-item>
        <el-form-item label="审核意见"  class="in-line">
          <el-input  v-model="refuse.auditOpinion" type="textarea"
                     :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>

    </template>
    <template v-if="ruleForm2.state === 'BACK'">
      <el-form  label-width="140px" class="demo-ruleForm">
        <el-form-item label="回退原因"  class="in-line">
          <el-input  v-model="back.loanCondition" ></el-input>
        </el-form-item>
        <el-form-item label="回退描述" class="in-line">
          <el-input  v-model="back.auditOpinion" type="textarea"
                     :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <!--<template v-if="ruleForm2.state === 'HANG_UP'">-->
      <!--<el-form  label-width="140px" class="demo-ruleForm">-->
        <!--<el-form-item label="挂起原因"  class="in-line">-->
          <!--<el-input  v-model="hangup.auditOpinion" type="textarea"-->
                     <!--:rows="6"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</template>-->
    <div class="pl">
      <el-button type="primary" @click="submitForm()" :loading="loading">提交</el-button>
      <el-button @click="$emit('cancel');loading=false">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {orderController} from './../../controller/common/order_controller'
  import addRepayment from '@/components/work/addRepayment'
  export default {
    components: {addRepayment},
    data () {
      return {
        options: [{label: 'PASS', value: '1'}, {label: 'REFUSE', value: '2'}, {label: 'BACK', value: '3'}, {label: 'HANG_UP', value: '4'}],
        customerCreditinfoRequest: '',
        customerInfoRequest: '',
        companyObj: '',
        loanInfoRequest: '',
        loading: false,
        orderId: this.$route.query.orderId,
        refuse: {
          loanCondition: '',
          auditOpinion: ''
        },
        back: {
          loanCondition: '',
          auditOpinion: ''
        },
        hangup: {
          auditOpinion: ''
        },
        ruleForm2: {
          auditOpinion: '',
          definitionKey: this.$route.query.definitionKey,
          feeplan: '',
          feeplanId: 1,
          id: '',
          interestPayment: '',
          loanCondition: '',
          managementRate: '',
          node: this.$route.query.node,
          orderId: this.$route.query.orderId,
          overdueRate: '',
          payment: '',
          paymentplanId: '',
          projectAmount: null,
          interPayContent: '',
          projectRate: '',
          projectTerm: '',
          projectTermUnit: '',
          projectrateUnit: '',
          remark: '',
          state: 'PASS'
        },
        option: [{value: '默认方案', id: 1}, {value: '技术服务费方案', id: 2}]
      }
    },
    methods: {
      submitForm () {
        this.ruleForm2.definitionKey = this.$route.query.definitionKey
        this.ruleForm2.node = this.$route.query.node
        this.ruleForm2.orderId = this.$route.query.orderId
        if (this.ruleForm2.state === 'REFUSE') {
          this.ruleForm2 = {...this.ruleForm2, ...this.refuse}
        } else if (this.ruleForm2.state === 'BACK') {
          this.ruleForm2 = {...this.ruleForm2, ...this.back}
        } else if (this.ruleForm2.state === 'HANG_UP') {
          this.ruleForm2 = {...this.ruleForm2, ...this.hangup}
        }
        this.ruleForm2.feeplan = this.ruleForm2.feeplanId == 1 ? 0 : 1
        const params = {
          flag: !this.isDisabled,
          approvalHistoryRequest: this.ruleForm2,
          customerCreditinfoRequest: this.customerCreditinfoRequest,
          customerInfoRequest: this.customerInfoRequest,
          ...this.companyObj,
          loanInfoRequest: this.loanInfoRequest
        }
        this.$refs['ruleForm2'].validate((valid) => {
          if (valid) {
            this.loading = true
            orderController.submitResult(params).then(res => {
              this.loading = false
              if (res.status === 200) {
                this.$emit('cancel')
                this.$message.success('提交成功')
                this.$router.go(-1)
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      getState (id) {
        let tempObj = this.options.find(value => value.value === id)
        return tempObj ? tempObj.label : 'PASS'
      },
      initState (flag) {
        const orderId = this.orderId
        orderController.queryApplyDetail({orderId}).then(res => {
          if (res.status === 200) {
            const data = res.data
            if (!flag) {
              let temp
              if (data.approvalHistoryResponseList.length === 0) {
                temp = data.orderResponse
              } else {
                const reverse = data.approvalHistoryResponseList.reverse()
                const tempObj = reverse.find(val => val.state === '1')
                if (tempObj) {
                  temp = tempObj
                } else {
                  temp = data.orderResponse
                }
              }
              this.ruleForm2 = {...this.ruleForm2, ...temp}
              this.ruleForm2.state = this.getState(this.ruleForm2.state)
              this.ruleForm2.loanCondition = ''
              this.ruleForm2.auditOpinion = ''
            }
            this.clearValidate()
            this.$nextTick(() => {
              this.$refs.addRepayment.initState(data.list || [])
            })
          }
        })
      },
      clearValidate () {
        this.$nextTick(() => {
          this.$refs['ruleForm2'].clearValidate()
        })
      },
      getNewState (customerCreditinfoRequest, customerInfoRequest, companyObj, loanInfoRequest) {
        this.customerCreditinfoRequest = customerCreditinfoRequest
        this.customerInfoRequest = customerInfoRequest
        this.companyObj = companyObj
        this.loanInfoRequest = loanInfoRequest
      }
    },
    props: {
      isDisabled: {
        type: Boolean
      }
    },
    mounted () {
      this.initState()
    },
    filters: {},
    computed: {
      ruleFormState () {
        return this.ruleForm2.state
      }
    },
    watch: {
      ruleFormState (curVal, oldVal) {
        this.clearValidate()
        console.log(curVal, oldVal)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box{
    display: flex;
    .el-input + .el-select{
      margin-left: 10px;
    }
    .el-select + .el-input{
      margin-left: 10px;
    }
  }
  .demo-ruleForm{
    display: flex;
    flex-wrap: wrap;
    .in-line{
      width: 100%;
    }
    &>div{
      width: 50%;
    }
    .box2{
      width: 100%;
    }
  }
  .pl{
    padding-left: 140px;
  }
</style>
