<template>
  <div class="box">
    <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
      <el-form-item label="借款金额" prop="projectAmount"  :rules='$rules.requiredInputNumber'>
        <el-input  v-model="ruleForm2.projectAmount" type="number"></el-input>
      </el-form-item>
      <el-form-item label="期限" prop="projectTime"  :rules='$rules.requiredInputDate'>
        <el-date-picker
          v-model="ruleForm2.projectTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          value-format="timestamp"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="还款方式" prop="paymentplanId"  :rules='$rules.requiredSelectValue'>
        <el-select v-model='ruleForm2.paymentplanId' placeholder='请选择'>
          <el-option
            v-for="item in $dict.findDictData('PropertyStatus')"
            :key='item.id'
            :label='item.value'
            :value='item.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算类型" prop="settleId"  :rules='$rules.requiredSelectValue'>
        <el-select v-model='ruleForm2.settleId' placeholder='请选择'>
          <el-option
            v-for="item in $dict.findDictData('BillingType')"
            :key='item.id'
            :label='item.value'
            :value='item.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="condition" >
        <el-input  v-model="ruleForm2.condition	" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {customerInfoController} from './../../controller/common/customerInfo_controller'
    import {guaranteeInfoController} from './../../controller/common/guaranteeInfo_controller'
    export default {
      data () {
        return {
          customerInfoController: this.isCustomer ? customerInfoController : guaranteeInfoController,
          ruleForm2: {
            projectTime: [],
            condition: '',
            id: '',
            objectId: this.$store.state.customerId,
            orderId: this.orderId,
            paymentplanId: '',
            projectAmount: '',
            projectEndTime: '',
            projectStartTime: '',
            remark: '',
            settleId: '',
            type: ''
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
          this.ruleForm2.projectTime = [obj.projectStartTime, obj.projectEndTime]
          this.ruleForm2 = {...this.ruleForm2, ...obj}
          this.$refs['ruleForm2'].resetFields()
        },
        addInit () {
          this.ruleForm2 = {
            projectTime: [],
            condition: '',
            id: '',
            objectId: this.$store.state.customerId,
            orderId: this.orderId,
            paymentplanId: '',
            projectAmount: '',
            projectEndTime: '',
            projectStartTime: '',
            remark: '',
            settleId: '',
            type: ''
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
          [this.ruleForm2.projectStartTime, this.ruleForm2.projectEndTime] = this.ruleForm2.projectTime
          this.ruleForm2.type = this.$store.state.type
        },
        addCar () {
          this.dataFormat()
          this.customerInfoController.saveBorrowingHistory(this.ruleForm2).then(res => {
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
