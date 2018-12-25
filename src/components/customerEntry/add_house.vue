<template>
  <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
    <el-form-item label="产权编号" prop="propertyNo"    :rules='$rules.requiredInputValue'>
      <el-input  v-model="ruleForm2.propertyNo" ></el-input>
    </el-form-item>
    <el-form-item label="产权名称" prop="name"    :rules='$rules.requiredInputValue'>
      <el-input  v-model="ruleForm2.name" ></el-input>
    </el-form-item>
    <el-form-item label="产权状态" prop="state"   :rules='$rules.requiredSelectValue'>
      <el-select v-model='ruleForm2.state' placeholder='请选择'>
        <el-option
          v-for="item in $dict.findDictData('PropertyStatus')"
          :key='item.id'
          :label='item.value'
          :value='item.id'>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="面积(㎡)" prop="area"    :rules='$rules.requiredInputNumber'>
      <el-input  v-model="ruleForm2.area" type="number"></el-input>
    </el-form-item>
    <el-form-item label="与申请人关系" prop="relationships"   :rules='$rules.requiredSelectValue'>
      <el-select v-model='ruleForm2.relationships' placeholder='请选择'>
        <el-option
          v-for="item in $dict.findDictData('ApplicantRelationship')"
          :key='item.id'
          :label='item.value'
          :value='item.id'>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="产权地址" prop="addressList"   :rules='$rules.requiredInputDate'>
      <el-cascader
        :props="{value: 'id',label: 'name'}"
        :options="$dict.getDictData('Area')"
        v-model='ruleForm2.addressList'
      ></el-cascader>
    </el-form-item>
    <el-form-item label="评估价值(万元)" prop="evaluationAmount"   :rules='$rules.requiredInputNumber'>
      <el-input  v-model="ruleForm2.evaluationAmount" type="number"></el-input>
    </el-form-item>
    <el-form-item label="贷款余额(万元)" prop="loanBalanceAmount"     :rules='$rules.requiredInputNumber'>
      <el-input  v-model="ruleForm2.loanBalanceAmount" type="number"></el-input>
    </el-form-item>
    <el-form-item label="产权详细地址" prop="address"  :rules='$rules.requiredInputValue'>
      <el-input  v-model="ruleForm2.address" ></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark"    >
      <el-input  v-model="ruleForm2.remark" type="textarea"
                 :autosize="{ minRows: 2, maxRows: 4}"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
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
            customerId: this.$store.state.customerId,
            orderId: this.orderId,
            exist: 1,
            propertyNo: '',
            name: '',
            state: '',
            area: '',
            relationships: '',
            addressList: [],
            addressProvince: '',
            addressCity: '',
            addressCounty: '',
            evaluationAmount: null,
            loanBalanceAmount: null,
            address: '',
            remark: ''
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
          this.ruleForm2.addressList = [obj.addressProvince, obj.addressCity, obj.addressCounty]
          this.ruleForm2 = {...this.ruleForm2, ...obj}
          this.$refs['ruleForm2'].resetFields()
        },
        addInit () {
          this.ruleForm2 = {
            customerId: this.$store.state.customerId,
            orderId: this.orderId,
            propertyNo: '',
            name: '',
            state: '',
            area: '',
            relationships: '',
            addressList: [],
            addressProvince: '',
            addressCity: '',
            addressCounty: '',
            evaluationAmount: null,
            loanBalanceAmount: null,
            address: '',
            remark: ''
          }
          this.$refs['ruleForm2'].resetFields()
        },
        submitForm (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.addHouse()
            } else {
              return false
            }
          })
        },
        addHouse () {
          [this.ruleForm2.addressProvince, this.ruleForm2.addressCity, this.ruleForm2.addressCounty] = this.ruleForm2.addressList
          this.ruleForm2.category = 'house'
          this.ruleForm2.customerId = this.$store.state.customerId
          this.ruleForm2.type = this.$store.state.type
          this.customerInfoController.saveCustomerAssets(this.ruleForm2).then(res => {
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
