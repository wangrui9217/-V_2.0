<template>
  <div>
    <p class='common-title'>贷后检查基本信息</p>
    <el-form label-position='left' :model='qualityBaseinfoRequest' ref="Baseinfo"  style="margin-top:20px;" label-width="180px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label='贷款用途(实际使用)：' prop='loanPurpose' :rules='rules.requiredSelectValue'>
            <el-select v-model='qualityBaseinfoRequest.loanPurpose' placeholder='请选择'>
              <el-option
                v-for="item in $dict.findDictData('LoanUseType')"
                :key='item.id'
                :label='item.value'
                :value='item.id'>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label='是否与申请时一致：' prop='agreement' :rules='rules.requiredSelectValue'>
            <el-select placeholder="请选择" v-model="qualityBaseinfoRequest.agreement">
              <el-option
                v-for="item in agreement"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-form-item label='' prop='agreementDateil' :rules="rules.requiredInputValue" label-width="0px">
              <el-input v-model="qualityBaseinfoRequest.agreementDateil"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label='客户联系方式是否有效：' prop='effective' :rules='rules.requiredSelectValue'>
            <el-select placeholder="请选择" v-model="qualityBaseinfoRequest.effective">
              <el-option
                v-for="item in effective"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label='' prop='effectiveDateil' :rules='rules.requiredInputValue' label-width="0px">
            <el-input v-model="qualityBaseinfoRequest.effectiveDateil"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label='网查有无负面信息：' prop='webLookup' :rules='rules.requiredSelectValue'>
            <el-select placeholder="请选择"  v-model="qualityBaseinfoRequest.webLookup">
              <el-option
                v-for="item in webLookup"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label='有无涉诉和风险信息：' prop='risk' :rules='rules.requiredSelectValue'>
            <el-select placeholder="请选择" v-model="qualityBaseinfoRequest.risk">
              <el-option
                v-for="item in risk"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label='' prop='riskDateil' :rules='rules.requiredInputValue' label-width="0px">
            <el-input v-model="qualityBaseinfoRequest.riskDateil"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label='公司结构是否发生变更：' prop='companyChange' :rules='rules.requiredSelectValue'>
            <el-select placeholder="请选择" v-model="qualityBaseinfoRequest.companyChange">
              <el-option
                v-for="item in companyChange"
                :key="item.id"
                :label="item.value"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label='' prop='companychangeDateil' :rules='rules.requiredInputValue' label-width="0px">
            <el-input v-model="qualityBaseinfoRequest.companychangeDateil"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-form-item label='客户房产车辆情况描述：' prop='assetsDetail' :rules="rules.requiredInputValue" label-width="186px">
            <el-input  type="textarea" v-model="qualityBaseinfoRequest.assetsDetail" :row="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-form-item label='经营情况描述：' prop='operationDateil' :rules="rules.requiredInputValue" label-width="186px">
            <el-input  type="textarea" v-model="qualityBaseinfoRequest.operationDateil" :row="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-form-item label='存货数量变化描述：' prop='stockDateil' :rules="rules.requiredInputValue" label-width="186px">
            <el-input  type="textarea" v-model="qualityBaseinfoRequest.stockDateil" :row="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-form-item label='已收账款回笼描述：' prop='accountsDateil' :rules="rules.requiredInputValue" label-width="186px">
            <el-input  type="textarea" v-model="qualityBaseinfoRequest.accountsDateil" :row="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-form-item label='现场作业描述：' prop='homeworkDateil' :rules="rules.requiredInputValue" label-width="186px">
            <el-input  type="textarea" v-model="qualityBaseinfoRequest.homeworkDateil" :row="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-form-item label='同行/客户反馈信息：' prop='feedbackDateil' :rules="rules.requiredInputValue" label-width="186px">
            <el-input  type="textarea" v-model="qualityBaseinfoRequest.feedbackDateil" :row="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-form-item label='其他：(影响项目安全因素)' prop='otherDateil' :rules="rules.requiredInputValue" label-width="186px">
            <el-input  type="textarea" v-model="qualityBaseinfoRequest.otherDateil" :row="4"></el-input>
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
        isHaveSelected: false,
        agreement:[{value:'是',id:'1'},{value:'否',id:'2'}],
        effective:[{value:'是',id:'3'},{value:'否',id:'4'}],
        webLookup:[{value:'是',id:'5'},{value:'否',id:'6'}],
        risk:[{value:'是',id:'7'},{value:'否',id:'8'}],
        companyChange:[{value:'是',id:'7'},{value:'否',id:'8'}],
        BaseinfoForm: {},
        qualityBaseinfoRequest:{
          otherDateil:'',
          feedbackDateil:'',
          homeworkDateil:'',
          accountsDateil:'',
          stockDateil:'',
          operationDateil:'',
          assetsDetail:'',
          companychangeDateil:'',
          effectiveDateil:'',
          riskDateil:'',
          agreementDateil:'',
          loanPurpose:'',

        }
      };
    },
    methods: {
      judgeValidate () {
        return new Promise((resolve, reject) => {
          this.$refs['Baseinfo'].validate((valid) => {
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
  .g-listpage__style {
    padding-top: 16px;
  }
  .el-form-item__label{
    width: 150px !important;
  }
</style>
