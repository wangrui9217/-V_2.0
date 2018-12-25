<template>
  <div class="pb50">
    <p class="common-title">结算账期汇总</p>
    <common-box :data="title"></common-box>
    <p class="common-title">财务分析</p>
    <div class='common-group p20'>
      <el-form label-position='top' status-icon :model='customerInfo' :inline='true' ref='ruleForm2'>
        <el-form-item label='资产负债比' :rules='$rules.requiredInputValue' prop='assetliabRatio'>
          <el-input v-model='customerInfo.assetliabRatio' :disabled="isDisabled" type="number"></el-input>
        </el-form-item>
        <el-form-item label='房产净值(万元)'  prop='netWorth'>
          <el-input v-model='customerInfo.netWorth' :disabled="isDisabled" type="number"></el-input>
        </el-form-item>
        <el-form-item label='流动比率'  prop='currentRatio'>
          <el-input v-model='customerInfo.currentRatio' :disabled="isDisabled" type="number"></el-input>
        </el-form-item>
        <el-form-item label='应收账款周转天数' :rules='$rules.requiredInputValue' prop='receivableDays'>
          <el-input v-model='customerInfo.receivableDays' :disabled="isDisabled" type="number"></el-input>
        </el-form-item>
        <el-form-item label='存货周转天数'  prop='stockDays'>
          <el-input v-model='customerInfo.stockDays' :disabled="isDisabled" type="number"></el-input>
        </el-form-item>
        <el-form-item label='速动比率'  prop='quickRatio'>
          <el-input v-model='customerInfo.quickRatio'  :disabled="isDisabled" type="number"></el-input>
        </el-form-item>
        <el-form-item label='信用卡使用情况'  prop='creditCardUsage' class="line">
          <el-input v-model='customerInfo.creditCardUsage' :disabled="isDisabled"></el-input>
        </el-form-item>

      </el-form>
    </div>

    <p class="common-title">关联公司信息</p>
    <el-form  status-icon :model='customerInfo' :inline='true' ref='ruleForm3'>
      <el-table :data="customerInfo.list" border class="g-table" ref="table2">
        <el-table-column type="index" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="carNum" label="公司名称">
          <template slot-scope="scope">
            <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.companyName'">
              <el-input v-model="scope.row.companyName" :disabled="isDisabled"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="certificateNum" label="法定代表人姓名">
          <template slot-scope="scope">
            <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.legalName'">
              <el-input v-model="scope.row.legalName" :disabled="isDisabled"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="ownerName" label="主营业务">
          <template slot-scope="scope">
            <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.mainBusiness'">
              <el-input v-model="scope.row.mainBusiness" :disabled="isDisabled"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="carCategory" label="其他情况说明">
          <template slot-scope="scope">
            <el-form-item :rules='$rules.requiredInputValue' :prop="'list.' + scope.$index + '.otherCases'">
              <el-input v-model="scope.row.otherCases" :disabled="isDisabled"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="操作" v-if="!isDisabled" :width="80">
          <template slot-scope="scope">
            <div class="actions">
              <el-button type="text" @click="removeRow(scope.$index)" :disabled="isDisabled">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button type="text" @click="addRow" :disabled="isDisabled">增加一行</el-button>
    <p class="common-title">风险提示</p>
    <div class="bottom">
      <div>风险提示</div>
      <el-input type="textarea"
                :disabled="isDisabled"
                :rows="4"
                placeholder="请输入内容"
                v-model="customerInfo.riskWarning"></el-input>
    </div>
    <div class="bottom">
      <div>资产评级</div>
      <el-select v-model='customerInfo.assetRating' placeholder='请选择' :disabled="isDisabled">
        <el-option
          v-for="item in $dict.findDictData('AssetRating')"
          :key='item.id'
          :label='item.value'
          :value='item.id'>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import {orderController} from './../../controller/common/order_controller'
  export default {
    data () {
      return {
        title: [{label: '资产总额', value: '动态计算', important: true}, {label: '负债总额', value: '动态计算', important: true}],
        loading: false,
        orderId: this.$route.query.orderId,
        customerInfo: {
          assetRating: '',
          assetliabRatio: '',
          createBy: '',
          creditCardUsage: '',
          currentRatio: '',
          id: '',
          list: [],
          netWorth: '',
          orderId: this.$route.query.orderId,
          quickRatio: '',
          receivableDays: '',
          remark: '',
          riskWarning: '',
          stockDays: '',
          totalAssets: '',
          totalLiabilities: '',
          updateBy: ''
        },
        option: [{value: '默认方案', id: 1}, {value: '技术服务费方案', id: 2}]
      }
    },
    methods: {
      judgeValidate () {
        return new Promise((resolve, reject) => {
          const prom = [this.submitForm('ruleForm2'), this.submitForm('ruleForm3')]
          Promise.all(prom).then(() => {
            this.customerInfo.orderId = this.$route.query.orderId
            resolve(this.customerInfo)
          }).catch(err => {
            reject('error')
          })
        })
      },
      submitForm (formName) {
        return new Promise((resolve, reject) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject()
              return false
            }
          })
        })
      },
      initState () {
        const orderId = this.$route.query.orderId
        orderController.queryLoanInfo({orderId}).then(res => {
          // console.log(res.data)
          this.customerInfo = {...this.customerInfo, ...res.data}
          if (!this.customerInfo.list || !(this.customerInfo.list instanceof Array)) {
            this.customerInfo.list = []
          }
        })
      },
      removeRow (row) {
        this.customerInfo.list.splice(row, 1)
      },
      addRow () {
        const temp = {
          companyName: '',
          createBy: '',
          id: '',
          legalName: '',
          mainBusiness: '',
          orderId: this.$route.query.orderId,
          otherCases: '',
          remark: '',
          updateBy: ''
        }
        this.customerInfo.list.push(temp)
      }
    },
    props: {
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.initState()
    },
    components: {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
.p20{
  padding: 0 20px;
}
  .bottom{
    margin-top: 20px;
    display: flex;
    &>div:nth-child(1){
      width: 100px;
    }
    .el-textarea{
      flex: 1;
    }
  }
  .pb50{
    padding-bottom: 50px;
  }
</style>
