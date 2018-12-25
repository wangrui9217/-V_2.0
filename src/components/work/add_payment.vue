<template>
  <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
    <!--<el-form-item label="期数" prop="terms"  :rules='$rules.requiredInputNumber'>-->
      <!--<el-input  v-model="ruleForm2.terms" type="number"></el-input>-->
    <!--</el-form-item>-->
    <el-form-item label="还款金额(万元)" prop="amount"  :rules='$rules.requiredInputNumber'>
      <el-input  v-model="ruleForm2.amount" type="number"></el-input>
    </el-form-item>
    <template v-if="ruleForm2.terms !== 1">
      <div class="box">
        <el-form-item label="服务费时长" prop="duration"  :rules='$rules.requiredInputNumber'>
          <el-input  v-model="ruleForm2.duration" type="number"></el-input>
        </el-form-item>
        <el-form-item label="" prop="durationUnit"  :rules='$rules.requiredSelectValue'>
          <el-select v-model="ruleForm2.durationUnit" placeholder="请选择" style="width: 100px">
            <el-option
              v-for="item in $dict.findDictData('DateUnit')"
              :key='item.id'
              :label='item.value'
              :value='item.id'>
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <!--<el-form-item label="服务费时长" prop="duration"  :rules='$rules.requiredInputNumber'>-->
        <!--<el-input  v-model="ruleForm2.duration" type="number"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="服务费时长单位" prop="durationUnit"  :rules='$rules.requiredSelectValue'>-->
        <!--<el-select v-model="ruleForm2.durationUnit" placeholder="请选择" style="width: 100px">-->
          <!--<el-option-->
            <!--v-for="item in $dict.findDictData('DateUnit')"-->
            <!--:key='item.id'-->
            <!--:label='item.value'-->
            <!--:value='item.id'>-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    </template>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import {orderController} from '@/controller/common/order_controller';
    export default {
      data () {
        return {
          ruleForm2: {
            amount: '',
            duration: '',
            durationUnit: '',
            id: '',
            orderId: this.$route.query.orderId,
            terms: ''
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
          this.ruleForm2 = {...this.ruleForm2, ...obj}
          console.log(this.ruleForm2)
          this.clearValidate()
        },
        addInit (index) {
          this.ruleForm2 = {
            amount: '',
            duration: '',
            durationUnit: '',
            id: '',
            orderId: this.$route.query.orderId,
            terms: index + 1
          }
          this.clearValidate()
        },
        clearValidate () {
          this.$nextTick(() => {
            this.$refs['ruleForm2'].clearValidate()
          })
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
          if (this.ruleForm2.terms === 1) {
            this.ruleForm2.duration = 1
          }
        },
        addCar () {
          this.dataFormat()
          orderController.saveServiceFee(this.ruleForm2).then(res => {
            if (res.status === 200) {
              this.$message.success('新增/编辑成功')
              this.$emit('close')
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

<style  lang="scss" scoped>
  /deep/.box{
  display: flex;
  &>div{
    flex: 1;
  }
  &>div:nth-last-child(1){
    .el-form-item__content{
      margin-left: 5px !important;
    }
  }
}
</style>
