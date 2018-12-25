<template>
  <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
    <el-form-item label="借款人姓名" prop="borrowerName"  :rules='$rules.requiredInputValue'>
      <el-input  v-model="ruleForm2.borrowerName"></el-input>
    </el-form-item>
    <el-form-item label="与借款人关系" prop="relationships"  :rules='$rules.requiredSelectValue'>
      <el-select v-model='ruleForm2.relationships' placeholder='请选择'>
        <el-option
          v-for="item in $dict.findDictData('ApplicantRelationship')"
          :key='item.id'
          :label='item.value'
          :value='item.id'>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="借款机构" prop="loanMechanism"  :rules='$rules.requiredSelectValue'>
      <el-select v-model='ruleForm2.loanMechanism' placeholder='请选择'>
        <el-option
          v-for="item in $dict.findDictData('LoanMechanism')"
          :key='item.id'
          :label='item.value'
          :value='item.id'>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="借款机构名称" prop="loanMechanismName"  :rules='$rules.requiredInputValue'>
      <el-input  v-model="ruleForm2.loanMechanismName" ></el-input>
    </el-form-item>
    <el-form-item label="贷款金额(万元)" prop="loanAmount"   :rules='$rules.requiredInputNumber'>
      <el-input  v-model="ruleForm2.loanAmount" type="number"></el-input>
    </el-form-item>
    <el-form-item label="贷款期间" prop="loanTime" :rules='$rules.requiredSelectValue' >
      <el-date-picker
        v-model="ruleForm2.loanTime"
        type="daterange"
        value-format="timestamp"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="贷款余额(万元)" prop="loanBalance"   :rules='$rules.requiredInputNumber'>
      <el-input  v-model="ruleForm2.loanBalance" type="number"></el-input>
    </el-form-item>
    <el-form-item label="还款方式" prop="repayment"  :rules='$rules.requiredSelectValue'>
      <el-select v-model='ruleForm2.repayment' placeholder='请选择'>
        <el-option
          v-for="item in $dict.findDictData('Repayment')"
          :key='item.id'
          :label='item.value'
          :value='item.id'>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="担保方式" prop="guarantor" :rules='$rules.requiredSelectValue'>
      <el-select v-model='ruleForm2.guarantor' placeholder='请选择'>
        <el-option
          v-for="item in $dict.findDictData('GuaranteeType')"
          :key='item.id'
          :label='item.value'
          :value='item.id'>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark" >
      <el-input  v-model="ruleForm2.remark" type="textarea"
                 :autosize="{ minRows: 2, maxRows: 4}"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
      <el-button @click="resetForm('ruleForm2')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import {customerInfoController} from './../../controller/common/customerInfo_controller'
    import {guaranteeInfoController} from './../../controller/common/guaranteeInfo_controller'
    export default {
      data () {
        return {
          customerInfoController: this.isCustomer ? customerInfoController : guaranteeInfoController,
          ruleForm2: {
            orderId: this.orderId,
            customerId: this.$store.state.customerId,
            borrowerName: '',
            guarantor: '',
            loanAmount: '',
            loanBalance: '',
            loanEndTime: '',
            loanMechanism: '',
            loanMechanismName: '',
            loanStartTime: '',
            loanTime: [],
            relationships: '',
            remark: '',
            repayment: ''
          }
        }
      },
      props: {
        isCustomer: {
          type: Boolean,
          default: true
        },
        orderId: {}
      },
      methods: {
        editInit (obj) {
          console.log(obj)
          this.ruleForm2.loanTime = [obj.loanStartTime, obj.loanEndTime]
          this.ruleForm2 = {...this.ruleForm2, ...obj}
          this.$refs['ruleForm2'].resetFields()
        },
        addInit () {
          this.ruleForm2 = {
            orderId: this.orderId,
            borrowerName: '',
            customerId: this.$store.state.customerId,
            guarantor: '',
            loanAmount: '',
            loanBalance: '',
            loanEndTime: '',
            loanMechanism: '',
            loanMechanismName: '',
            loanStartTime: '',
            loanTime: [],
            relationships: '',
            remark: '',
            repayment: ''
          }
          this.$refs['ruleForm2'].resetFields()
        },
        submitForm (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addCar()
            } else {
              return false
            }
          })
        },
        dataFormat () {
          [this.ruleForm2.loanStartTime, this.ruleForm2.loanEndTime] = this.ruleForm2.loanTime
          this.ruleForm2.type = this.$store.state.type
        },
        addCar () {
          this.dataFormat()
          this.customerInfoController.saveLiabilitiesLoan(this.ruleForm2).then(res => {
            if (res.status === 200) {
              if (res.data) {
                this.$store.commit('SET_CUSTOMER_ID', res.data)
              }
              this.$message.success('新增/编辑成功')
              this.$nextTick(() => { this.$emit('close') })
            }
          })
        },
        resetForm (formName) {
          this.$refs[formName].resetFields()
          this.$emit('cancel')
        }
      }
    }
</script>

<style scoped>

</style>
