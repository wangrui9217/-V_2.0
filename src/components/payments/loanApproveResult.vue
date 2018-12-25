<template>
  <div>
    <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="140px" class="demo-ruleForm">
      <el-form-item label="审核结果" prop="state" class="in-line" :rules='$rules.requiredInputValue'>
        <el-radio-group v-model="ruleForm2.state">
          <el-radio label="PASS">同意</el-radio>
          <el-radio label="BACK">驳回</el-radio>
          <el-radio label="REFUSE" v-if="stopShow">终止</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template v-if="ruleForm2.state === 'PASS'">
      <el-form  label-width="140px" class="demo-ruleForm">
        <el-form-item label="审核意见"  class="in-line">
          <el-input  v-model="pass.content" type="textarea"
                     :rows="8"></el-input>
        </el-form-item>
      </el-form>

    </template>
    <template v-if="ruleForm2.state === 'BACK'">
      <el-form  label-width="140px" class="demo-ruleForm">
        <el-form-item label="审核意见" class="in-line">
          <el-input  v-model="back.content" type="textarea"
                     :rows="8"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template v-if="ruleForm2.state === 'REFUSE'">
      <el-form  label-width="140px" class="demo-ruleForm">
        <el-form-item label="审核意见" class="in-line">
          <el-input  v-model="refuse.content" type="textarea"
                     :rows="8"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <div class="pl">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="$emit('cancel')">取消</el-button>
    </div>
  </div>
</template>

<script>
  import { lendController } from "./../../controller/common/lend_controller";
  export default {
    data () {
      return {
        pass: {
          content: ''
        },
        back: {
          content: ''
        },
        refuse: {
          content: ''
        },
        ruleForm2: {
          businessKey: this.$route.query.orderId,
          content: '',
          definitionKey: this.$route.query.definitionKey,
          node: this.$route.query.node,
          processInstanceId: this.$route.query.processInstanceId,
          state: 'PASS'
        }
      }
    },
    methods: {
      submitForm () {
        let params = {}
        if (this.ruleForm2.state === 'PASS') {
          params = {...this.ruleForm2, ...this.pass}
        }
        if (this.ruleForm2.state === 'BACK') {
          params = {...this.ruleForm2, ...this.back}
        }
        if (this.ruleForm2.state === 'REFUSE') {
          params = {...this.ruleForm2, ...this.refuse}
        }
        console.log(params)
        lendController.lendCheck(params).then(res => {
          if (res.status === 200) {
            this.$message.success('提交成功')
            this.$emit('cancel')
            this.$router.go(-1)
          }
        })
      },
      getState (id) {
      },
      initState () {
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
    components: {},
    filters: {},
    computed: {
      stopShow () {
        if (this.$route.query.definitionKey === 'check_second' || this.$route.query.definitionKey === 'check_third') {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
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
  }
  .pl{
    padding-left: 140px;
  }
</style>
