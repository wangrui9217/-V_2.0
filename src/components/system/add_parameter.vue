<template>
  <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
    <el-form-item label="参数key" prop="code"  :rules='$rules.requiredInputValue'>
      <el-input  v-model="ruleForm2.code" ></el-input>
    </el-form-item>
    <el-form-item label="参数名称" prop="name"  :rules='$rules.requiredInputValue'>
      <el-input  v-model="ruleForm2.name" ></el-input>
    </el-form-item>
    <el-form-item label="参数值" prop="value"  :rules='$rules.requiredInputValue'>
      <el-input  v-model="ruleForm2.value" ></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark"  >
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
    import { parametersController } from "./../../controller/common/parameters_controller";
    export default {
      data () {
        return {
          ruleForm2: {
            code: '',
            id: '',
            name: '',
            remark: '',
            status: '',
            value: ''
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
        addInit () {
          this.ruleForm2 = {
            code: '',
            id: '',
            name: '',
            remark: '',
            status: '',
            value: ''
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
        },
        addCar () {
          this.dataFormat()
          parametersController.saveParameters(this.ruleForm2).then(res => {
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

<style scoped>

</style>
