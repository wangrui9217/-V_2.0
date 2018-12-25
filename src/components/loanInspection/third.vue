<template>
  <div>
      <p class='common-title management-title'>客户面谈信息</p>
      <el-form label-position='left' :model='qualityFinalinfoRequest' ref="Finalinfo" label-width="120px" style="margin-top:20px;">
        <el-row :gutter=30>
          <el-col :span="7">
            <el-form-item label='面谈人姓名：' prop='talkName' :rules='$rules.realnameRule'>
              <el-input v-model="qualityFinalinfoRequest.talkName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label='联系电话：' prop='talkPhone' :rules='$rules.phoneRule'>
              <el-input v-model="qualityFinalinfoRequest.talkPhone" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label='职务：' prop='position' :rules='$rules.requiredFilterValue'>
              <el-input v-model="qualityFinalinfoRequest.position"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label='面谈总结：' prop='talkFinal' :rules='$rules.requiredInputValue'>
              <el-input v-model="qualityFinalinfoRequest.talkFinal" type="textarea" :row="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <p class='common-title management-title'>检查综合意见</p>
        <el-row>
          <el-col :span="8">
            <el-form-item label='借款人资金运用情况：' prop='fundStatus' :rules='rules.requiredSelectValue' label-width="180px">
              <el-radio-group v-model="qualityFinalinfoRequest.fundStatus">
                <el-radio  :label="0">良好</el-radio>
                <el-radio  :label="1" >异常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item prop='fundDemo' :rules='qualityFinalinfoRequest.fundStatus == 1 ? rules.requiredInputValue : {}' :show-message="qualityFinalinfoRequest.fundStatus == 1" label-width="0px">
              <el-input v-model="qualityFinalinfoRequest.fundDemo" type="textarea" :row="4" 　placeholder="请输入异常说明"  v-if="qualityFinalinfoRequest.fundStatus == 1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label='经营及财务情况：' prop='financialStatus' :rules='rules.requiredSelectValue' label-width="180px">
              <el-radio-group v-model="qualityFinalinfoRequest.financialStatus">
                <el-radio  :label="0">良好</el-radio>
                <el-radio  :label="1" >异常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item prop='financialDemo' :rules='qualityFinalinfoRequest.financialStatus == 1 ? rules.requiredInputValue : {}' :show-message="qualityFinalinfoRequest.financialStatus == 1" label-width="0px">
              <el-input v-model="qualityFinalinfoRequest.financialDemo" type="textarea" :row="4" placeholder="请输入异常说明" v-if="qualityFinalinfoRequest.financialStatus == 1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label='还款能力情况：' prop='paymentStatus' :rules='rules.requiredSelectValue' label-width="180px">
              <el-radio-group v-model="qualityFinalinfoRequest.paymentStatus">
                <el-radio  :label="0">良好</el-radio>
                <el-radio  :label="1" >异常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item prop='paymentDemo' :rules='qualityFinalinfoRequest.paymentStatus == 1 ? rules.requiredInputValue : {}' :show-message="qualityFinalinfoRequest.paymentStatus == 1" label-width="0px">
              <el-input v-model="qualityFinalinfoRequest.paymentDemo" type="textarea" :row="4" placeholder="请输入异常说明" v-if="qualityFinalinfoRequest.paymentStatus == 1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label='逾期情况：' prop='overdueStatus' :rules='rules.requiredSelectValue' label-width="180px">
              <el-radio-group v-model="qualityFinalinfoRequest.overdueStatus">
                <el-radio  :label="0">无</el-radio>
                <el-radio  :label="1" >异常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item prop='overdueDemo' :rules='qualityFinalinfoRequest.overdueStatus == 1 ? rules.requiredInputValue : {}' :show-message="qualityFinalinfoRequest.overdueStatus == 1" label-width="0px">
              <el-input v-model="qualityFinalinfoRequest.overdueDemo" type="textarea" :row="4" placeholder="请输入异常说明" v-if="qualityFinalinfoRequest.overdueStatus == 1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label='涉诉情况：' prop='appealStatus' :rules='rules.requiredSelectValue' label-width="180px">
              <el-radio-group v-model="qualityFinalinfoRequest.appealStatus">
                <el-radio  :label="0">无</el-radio>
                <el-radio  :label="1" >异常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item prop='appealDemo' :rules='qualityFinalinfoRequest.appealStatus == 1 ? rules.requiredInputValue : {}' :show-message="qualityFinalinfoRequest.appealStatus == 1" label-width="0px">
              <el-input v-model="qualityFinalinfoRequest.appealDemo	" type="textarea" :row="4" placeholder="请输入异常说明" v-if="qualityFinalinfoRequest.appealStatus == 1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label='行政处罚情况：' prop='penalizeStatus' :rules='rules.requiredSelectValue' label-width="180px">
              <el-radio-group v-model="qualityFinalinfoRequest.penalizeStatus">
                <el-radio  :label="0">无</el-radio>
                <el-radio  :label="1" >异常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item prop='penalizeDemo' :rules='qualityFinalinfoRequest.penalizeStatus == 1 ? rules.requiredInputValue : {}' :show-message="qualityFinalinfoRequest.penalizeStatus == 1" label-width="0px">
              <el-input v-model="qualityFinalinfoRequest.penalizeDemo" type="textarea" :row="4" placeholder="请输入异常说明" v-if="qualityFinalinfoRequest.penalizeStatus == 1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label='贷后检查总结：' prop='loanReport' :rules='rules.requiredInputValue' label-width="180px">
              <el-input v-model="qualityFinalinfoRequest.loanReport" type="textarea" :row="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>
import Rules from "@/util/rules";
  export default {
    components: {},
    data() {
      return {
        rules: Rules,
        penalizeStatus:0,
        qualityFinalinfoRequest:{
          loanReport:'',
          penalizeDemo:'',
          appealDemo:'',
          appealStatus:'',
          overdueDemo:'',
          overdueStatus:'',
          paymentDemo:'',
          paymentStatus:'',
          financialDemo:'',
          financialStatus:'',
          fundDemo:'',
          fundStatus:'',
          talkFinal:'',
          position:'',
          talkPhone:'',
          talkName:'',
        }
       };
    },
    methods: {
      judgeValidate () {
        return new Promise((resolve, reject) => {
          this.$refs['Finalinfo'].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject()
              return false
            }
          })
        })
      },
    },
    props: {},
    created() {},
    mounted() {},
    computed: {},
    watch: {}
  };
</script>

<style lang="scss" scoped>
.common-title.management-title {
  border: none;
}
</style>
