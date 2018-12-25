<template>
  <div>
    <p class="common-title">借款信息</p>
    <el-table :data="borrowInfo" border class="g-table" ref="table">
      <el-table-column prop="borrowerName" label="借款人姓名">
      </el-table-column>
      <el-table-column prop="relationships" label="与借款人关系" :formatter="(row) => $dict.findDictionaryName(row.relationships)">
      </el-table-column>
      <el-table-column prop="loanMechanism" label="借款机构" :formatter="(row) => $dict.findDictionaryName(row.loanMechanism)">
      </el-table-column>
      <el-table-column prop="loanMechanismName" label="借款机构名称">
      </el-table-column>
      <el-table-column prop="loanAmount" label="贷款金额(万元)">
      </el-table-column>
      <el-table-column prop="loanStartTime+loanEndTime" label="贷款期间" :formatter="(row) => $formatDate(row.loanStartTime, 'yyyy-MM-dd') + '至' + $formatDate(row.loanEndTime, 'yyyy-MM-dd')" width="200">
      </el-table-column>
      <el-table-column prop="loanBalance" label="贷款余额(万元)">
      </el-table-column>
      <el-table-column prop="repayment" label="还款方式" :formatter="(row) => $dict.findDictionaryName(row.repayment)">
      </el-table-column>
      <el-table-column prop="guarantor" label="担保方式" :formatter="(row) => $dict.findDictionaryName(row.guarantor)">
      </el-table-column>
      <el-table-column prop="roleName" label="操作" v-if="!isDisabled">
        <template slot-scope="scope">
          <div class="actions">
            <el-button type="text" @click="editBorrowInfo(scope.row)">编辑</el-button>
            <el-button type="text" @click="removeBorrowInfo(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="common-button" @click="addBorrowInfo" v-if="!isDisabled"><i class="el-icon-plus"></i>新增借款信息</el-button>
    <p class="common-title">信用卡信息</p>
    <el-table :data="cardInfo" border class="g-table" ref="table2">
      <el-table-column prop="ownerName" label="持卡人姓名">
      </el-table-column>
      <el-table-column prop="relationships" label="与借款人关系" :formatter="(row) => $dict.findDictionaryName(row.relationships)">
      </el-table-column>
      <el-table-column prop="creditcardAmount" label="信用卡总数">
      </el-table-column>
      <el-table-column prop="creditLine" label="授信总额度(万元)">
      </el-table-column>
      <el-table-column prop="usedQuota" label="已使用总额度(万元)">
      </el-table-column>
      <el-table-column prop="monthlyAverage" label="月平均使用额度(近6个月)" :width="200">
      </el-table-column>
      <el-table-column prop="roleName" label="操作" v-if="!isDisabled">
        <template slot-scope="scope">
          <div class="actions">
            <el-button type="text" @click="editCardInfo(scope.row)">编辑</el-button>
            <el-button type="text" @click="removeCardInfo(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="common-button" @click="addCardInfo" v-if="!isDisabled"><i class="el-icon-plus"></i>新增信用卡信息</el-button>
    <p class="common-title">征信资信息</p>
    <div class='common-group'>
      <el-form label-position='top' :model="creditInfo" :inline="true" ref="ruleForm">
        <el-form-item label='是否有征信'  prop='credit'>
          <el-radio-group v-model="creditInfo.credit" :disabled="isDisabled">
            <el-radio label="1">有征信</el-radio>
            <el-radio label="0">无征信</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='征信查询日期'  prop='queryTime' >
          <el-date-picker
            :disabled="isDisabled"
            value-format="timestamp"
            v-model="creditInfo.queryTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item></el-form-item>
        <div v-if="creditInfo.credit === '1'">
          <el-form-item label='近两年逾期情况'  prop='overdueTwoYears'>
            <el-radio-group v-model="creditInfo.overdueTwoYears" :disabled="isDisabled">
              <el-radio label="1">有逾期</el-radio>
              <el-radio label="0">无逾期</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
          <div v-if="creditInfo.overdueTwoYears === '1'">
            <el-form-item label='逾期次数'  prop='overdueNumber'>
              <el-input v-model='creditInfo.overdueNumber' type="number" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label='最近逾期日期'  prop='overdueTime'>
              <el-date-picker
                :disabled="isDisabled"
                value-format="timestamp"
                v-model="creditInfo.overdueTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label='最近逾期金额(万元)'  prop='overdueAmount'>
              <el-input v-model='creditInfo.overdueAmount' type="number" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label='最大逾期金额(万元)'  prop='overdueAmountMax'>
              <el-input v-model='creditInfo.overdueAmountMax' type="number" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label='最大金额逾期日期'  prop='overdueTimeMax'>
              <el-date-picker
                :disabled="isDisabled"
                value-format="timestamp"
                v-model="creditInfo.overdueTimeMax"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <p class="common-title">近1年征信查询情况：</p>
          <el-form-item label='近一年查询次数:'  prop='queryNumber'>
            <el-input v-model='creditInfo.queryNumber' type="number" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='近一年贷款审批查询次数:'  prop='loanApplyNumber'>
            <el-input v-model='creditInfo.loanApplyNumber' type="number" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='是否有非银行机构查询'  prop='nonBankQuery'>
            <el-radio-group v-model="creditInfo.nonBankQuery" :disabled="isDisabled">
              <el-radio label="1">有</el-radio>
              <el-radio label="0">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="creditInfo.nonBankQuery === '1'">
            <p class="common-title">非银机构查询信息：</p>
            <div v-for="(item, index) in creditInfo.list" :key="index" >
              <el-form-item label='查询机构名称:' :rules='$rules.requiredInputValue'  :prop="'list.' + index + '.name'">
                <el-input v-model='item.name' :disabled="isDisabled"></el-input>
              </el-form-item>
              <el-form-item label='查询次数:' :rules='$rules.requiredInputValue'  :prop="'list.' + index + '.nonBankQuery'">
                <el-input v-model='item.nonBankQuery' :disabled="isDisabled"></el-input>
              </el-form-item>
              <el-form-item>
                <div style="width: 100%;height: 50px"></div>
                <el-button type="text" @click="removeList(index)" v-if="!isDisabled">删除</el-button>
              </el-form-item>
            </div>
            <el-button type="text" @click="addList" v-if="!isDisabled">增加</el-button>
          </div>
        </div>

      </el-form>
    </div>


    <p class="common-title">其他信息</p>
    <div class="common-group">
      <el-form label-position="top" :model="creditInfo" :inline="true">
        <el-form-item label="其他负债说明:">
          <el-input v-model="creditInfo.otherLiabilities" type="textarea" :rows="4" :disabled="isDisabled"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-row v-if="!isDisabled && !isCheck">
      <el-button type="primary" @click="saveInfo" :disabled="hasSubmit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>

    <el-dialog title="新增/编辑借款信息" @close="dialog.addBorrowInfo = false" :visible.sync="dialog.addBorrowInfo" :close-on-click-modal="false" width="633px">
      <add-borrow-info @close="borrowInfoClose" ref="addBorrowInfo" @cancel="dialog.addBorrowInfo = false"  :isCustomer="isCustomer" :orderId="orderId"></add-borrow-info>
    </el-dialog>
    <el-dialog title="新增/编辑信用卡信息" @close="dialog.addCardInfo = false" :visible.sync="dialog.addCardInfo" :close-on-click-modal="false" width="633px">
      <add-card-info @close="cardInfoClose" ref="addCardInfo" @cancel="dialog.addCardInfo = false"  :isCustomer="isCustomer" :orderId="orderId"></add-card-info>
    </el-dialog>

  </div>
</template>

<script>
  import addBorrowInfo from './add_borrowInfo'
  import addCardInfo from './add_cardInfo'
  import {customerInfoController} from './../../controller/common/customerInfo_controller'
  import {guaranteeInfoController} from './../../controller/common/guaranteeInfo_controller'
  export default {
    components: {
      addBorrowInfo,
      addCardInfo
    },
    data () {
      return {
        customerInfoController: this.isCustomer ? customerInfoController : guaranteeInfoController,
        dialog: {
          addBorrowInfo: false,
          addCardInfo: false,
          addCreditInfo: false
        },
        borrowInfo: [],
        cardInfo: [],
        creditInfo: {
          orderId: this.orderId,
          id: '',
          changeLiabilities: '',
          credit: '1',
          customerId: this.$store.state.customerId,
          list: [{
            customerId: this.$store.state.customerId,
            name: '',
            nonBankQuery: ''
          }],
          loanApplyNumber: '',
          otherLiabilities: '',
          overdueAmountMax: '',
          overdueNumber: '',
          overdueAmount: '',
          overdueTime: '',
          overdueTimeMax: '',
          overdueTwoYears: '0',
          nonBankQuery: '0',
          queryNumber: '',
          queryTime: '',
          type: this.$store.state.type
        }
      }
    },
    props: {
      isCustomer: {
        type: Boolean,
        default: true
      },
      hasSubmit: {
        type: Boolean,
        default: false
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      isCheck: {
        type: Boolean,
        default: false
      },
      orderId: {}
    },
    mounted () {
      this.getCustomerAssets()
    },
    methods: {
      //  取消
      cancel () {
        this.$router.go(-1)
      },
      // 新增
      addList () {
        this.creditInfo.list.push({
          customerId: this.$store.state.customerId,
          name: '',
          nonBankQuery: ''
        })
      },
      // 删除
      removeList (index) {
        if (this.creditInfo.list.length === 1) {
          this.$message('好歹留一个哉')
          return
        }
        this.creditInfo.list.splice(index, 1)
      },
      dataFormat () {
        this.creditInfo.customerId = this.$store.state.customerId
        if (this.creditInfo.nonBankQuery === '0') {
          this.creditInfo.list = []
        }
      },
      // 保存
      saveInfo () {
        this.judgeValidate().then(() => {
          this.dataFormat()
          this.customerInfoController.saveCustomerCreditinfo(this.creditInfo).then(res => {
            if (res.status === 200) {
              if (res.data) {
                this.$store.commit('SET_CUSTOMER_ID', res.data)
              }
              this.$message.success('保存成功')
              this.$nextTick(() => { this.getCustomerAssets('creditInfo') })
            }
          })
        })
      },
      judgeValidate () {
        return new Promise((resolve, reject) => {
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject()
              return false
            }
          })
        })
      },
      // 获取所有负债信息
      getCustomerAssets (flag) {
        const customerId = this.$store.state.customerId
        const type = this.$store.state.type
        if (!flag || flag === 'borrowInfo') {
          customerInfoController.queryLiabilitiesLoan({customerId, type}).then(res => {
            if (res.status === 200) {
              this.borrowInfo = res.data.list
              console.log(res, '负债借款信息')
            }
          })
        }
        if (!flag || flag === 'cardInfo') {
          customerInfoController.queryLiabilitiesCreditcard({customerId, type}).then(res => {
            if (res.status === 200) {
              this.cardInfo = res.data.list
              console.log(res, '负债信用卡信息')
            }
          })
        }
        if (!flag || flag === 'creditInfo') {
          customerInfoController.queryCustomerCreditinfo({customerId, type}).then(res => {
            if (res.status === 200) {
              this.creditInfo = {...this.creditInfo, ...res.data}
              console.log(this.creditInfo, '负债人征信资信息')
            }
          })
        }
      },
      // 新增借款信息
      addBorrowInfo () {
        this.dialog.addBorrowInfo = true
        this.$nextTick(() => {
          this.$refs.addBorrowInfo.addInit()
        })
      },
      editBorrowInfo (row) {
        this.dialog.addBorrowInfo = true
        this.$nextTick(() => {
          this.$refs.addBorrowInfo.editInit(row)
        })
      },
      borrowInfoClose () {
        this.dialog.addBorrowInfo = false
        this.getCustomerAssets('borrowInfo')
      },
      removeBorrowInfo (row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          customerInfoController.deleteLiabilitiesLoan({id}).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.getCustomerAssets('borrowInfo')
            }
          })
        }).catch(() => {})
      },
      // 新增信用卡
      addCardInfo () {
        this.dialog.addCardInfo = true
        this.$nextTick(() => {
          this.$refs.addCardInfo.addInit()
        })
      },
      editCardInfo (row) {
        this.dialog.addCardInfo = true
        this.$nextTick(() => {
          this.$refs.addCardInfo.editInit(row)
        })
      },
      cardInfoClose () {
        this.dialog.addCardInfo = false
        this.getCustomerAssets('cardInfo')
      },
      removeCardInfo (row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          customerInfoController.deleteLiabilitiesCreditcard({id}).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.getCustomerAssets('cardInfo')
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .radio{
    padding: 20px 0;
  }

</style>
