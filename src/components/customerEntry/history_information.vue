<template>
  <div>
    <p class="radio">{{isCustomer ? '是否未续贷客户：' : '在本公司是否有借款'}}
      <template>
        <el-radio v-model="radio2" label="1" :disabled="isDisabled">是</el-radio>
        <el-radio v-model="radio2" label="0" :disabled="carList.length !== 0 || isDisabled">否</el-radio>
      </template>
    </p>
    <div v-if="radio2 === '1'">
      <p class='common-title'>历史借款信息</p>
      <template>
        <el-table :data="carList" border class="g-table" ref="table2">
          <el-table-column prop="projectAmount" label="借款金额">
          </el-table-column>
          <el-table-column prop="projectTime" label="期限" :formatter="(row) => $formatDate(row.projectStartTime, 'yyyy-MM-dd') + '至' + $formatDate(row.projectEndTime, 'yyyy-MM-dd')" :width="200">
          </el-table-column>
          <el-table-column prop="paymentplanId" label="还款方式" :formatter="(row) => $dict.findDictionaryName(row.paymentplanId)">
          </el-table-column>
          <el-table-column prop="settleId" label="结算类型" :formatter="(row) => $dict.findDictionaryName(row.settleId)">
          </el-table-column>
          <el-table-column prop="condition" label="逾期说明/展期期限/提前结清说明" :width="350">
          </el-table-column>
          <el-table-column prop="roleName" label="操作" v-if="!isDisabled">
            <template slot-scope="scope">
              <div class="actions">
                <el-button type="text" @click="editCar(scope.row)">编辑</el-button>
                <el-button type="text" @click="removeCar(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="common-button" @click="addCar"  v-if="!isDisabled"><i class="el-icon-plus"></i>新增 历史借款信息</el-button>
      </template>
    </div>
    <el-dialog title="新增/编辑历史借款信息" @close="dialog.addCar = false" :visible.sync="dialog.addCar" :close-on-click-modal="false" width="633px">
      <add-history @close="carClose" @cancel="dialog.addCar = false" ref="addCar"  :isCustomer="isCustomer" :orderId="orderId"></add-history>
    </el-dialog>
  </div>
</template>

<script>
  import {customerInfoController} from './../../controller/common/customerInfo_controller'
  import {guaranteeInfoController} from './../../controller/common/guaranteeInfo_controller'
  import addHistory from './add_history'
  export default {
    components: {addHistory},
    data () {
      return {
        dialog: {
          addCar: false
        },
        customerInfoController: this.isCustomer ? customerInfoController : guaranteeInfoController,
        radio2: '1',
        carList: []
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
      orderId: {},
      isCheck: {
        type: Boolean,
        default: false
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.getCustomerAssets()
    },
    methods: {
      // 查询借款人历史借款
      getCustomerAssets () {
        const objectId = this.$store.state.customerId
        const type = this.$store.state.type
        customerInfoController.queryBorrowingHistory({objectId, type}).then(res => {
          if (res.status === 200) {
            console.log(res)
            this.carList = res.data.list
            this.carList.length === 0 ? this.radio2 = '0' : this.radio2 = '1'
          }
          // console.log(res, '资产信息')
        })
      },
      // 汽车
      addCar () {
        this.dialog.addCar = true
        this.$nextTick(() => {
          this.$refs.addCar.addInit()
        })
      },
      editCar (row) {
        this.dialog.addCar = true
        this.$nextTick(() => {
          this.$refs.addCar.editInit(row)
        })
      },
      carClose () {
        this.dialog.addCar = false
        this.getCustomerAssets()
      },
      removeCar (row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          customerInfoController.deleteBorrowingHistory({id}).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.getCustomerAssets()
            }
          })
        }).catch(() => {})
      }
      //
    }
  }
</script>

<style lang='scss' scoped>
  .radio{
    padding: 20px 0;
  }

</style>
