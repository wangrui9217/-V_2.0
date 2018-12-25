<template>
  <div>
    <p class="common-title">房产信息</p>

    <p class="radio">
      是否有房：
      <template>
        <el-radio v-model="radio" label="1" :disabled="isDisabled">有房</el-radio>
        <el-radio v-model="radio" label="0" :disabled="houseList.length !== 0 || isDisabled">无房</el-radio>
      </template>
    </p>
    <template v-if="radio === '1'">
      <el-table :data="houseList" border class="g-table" ref="table" >
        <el-table-column prop="propertyNo" label="产权编号">
        </el-table-column>
        <el-table-column prop="name" label="产权名称">
        </el-table-column>
        <el-table-column prop="state" label="产权状态" :formatter="(row) => $dict.findDictionaryName(row.state)">
        </el-table-column>
        <el-table-column prop="area" label="面积(㎡)">
        </el-table-column>
        <el-table-column prop="relationships" label="与申请人关系" :formatter="(row) => $dict.findDictionaryName(row.relationships)">
        </el-table-column>
        <el-table-column prop="address" label="产权地址" :formatter="(row) => $dict.findAreaName(row.addressProvince) + '/' + $dict.findAreaName(row.addressCity) + $dict.findAreaName(row.addressCounty)">
        </el-table-column>
        <el-table-column prop="evaluationAmount" label="评估价值(万元)">
        </el-table-column>
        <el-table-column prop="loanBalanceAmount" label="贷款余额(万元)">
        </el-table-column>
        <el-table-column prop="roleName" label="操作" v-if="!isDisabled">
          <template slot-scope="scope">
            <div class="actions">
              <el-button type="text" @click="editHouse(scope.row)">编辑</el-button>
              <el-button type="text" @click="removeHouse(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="common-button" @click="addHouse" v-if="!isDisabled"><i class="el-icon-plus"></i>新增房产信息</el-button>
    </template>

    <p class="radio">
      是否有车：
      <template>
        <el-radio v-model="radio2" label="1" :disabled="isDisabled">有车</el-radio>
        <el-radio v-model="radio2" label="0" :disabled="carList.length !== 0|| isDisabled">无车</el-radio>
      </template>
    </p>
    <template v-if="radio2 === '1'">
      <el-table :data="carList" border class="g-table" ref="table2">
        <el-table-column prop="carNo" label="车牌号">
        </el-table-column>
        <el-table-column prop="carNum" label="车辆登记编号">
        </el-table-column>
        <el-table-column prop="certificateNum" label="行驶证编号">
        </el-table-column>
        <el-table-column prop="state" label="车辆状态" :formatter="(row) => $dict.findDictionaryName(row.state)">
        </el-table-column>
        <el-table-column prop="ownerName" label="车辆所有人">
        </el-table-column>
        <el-table-column prop="relationships" label="与申请人关系" :formatter="(row) => $dict.findDictionaryName(row.relationships)">
        </el-table-column>
        <el-table-column prop="carCategory" label="车辆品牌">
        </el-table-column>
        <el-table-column prop="evaluationAmount" label="评估价值(万元)">
        </el-table-column>
        <el-table-column prop="loanBalanceAmount" label="贷款余额(万元)">
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
      <el-button class="common-button" @click="addCar" v-if="!isDisabled"><i class="el-icon-plus"></i>新增车辆信息</el-button>
    </template>

    <p class="common-title">其他信息</p>
    <div class="common-group">
      <el-form label-position="top" :model="customerInfo" :inline="true">
        <el-form-item label="其他资产总额">
          <el-input v-model="customerInfo.otherAssetsAmount" type="number" :disabled="isDisabled">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item label="其他资产描述">
          <el-input v-model="customerInfo.otherAssetsDescription" type="textarea" :rows="4" :disabled="isDisabled"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-row v-if="!isDisabled && !isCheck">
      <el-button type="primary" @click="saveOtherAssets" :disabled="hasSubmit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>

    <el-dialog title="新增/编辑房产信息" @close="dialog.addHouse = false" :visible.sync="dialog.addHouse" :close-on-click-modal="false" width="633px">
      <add-house @close="houseClose" ref="addHouse" @cancel="dialog.addHouse = false"  :isCustomer="isCustomer" :orderId="orderId"></add-house>
    </el-dialog>
    <el-dialog title="新增/编辑车产信息" @close="dialog.addCar = false" :visible.sync="dialog.addCar" :close-on-click-modal="false" width="633px">
      <add-car @close="carClose" @cancel="dialog.addCar = false" ref="addCar"  :isCustomer="isCustomer" :orderId="orderId"></add-car>
    </el-dialog>
  </div>
</template>

<script>
  import addHouse from './add_house'
  import addCar from './add_car'
  import {customerInfoController} from './../../controller/common/customerInfo_controller'
  import {guaranteeInfoController} from './../../controller/common/guaranteeInfo_controller'
export default {
    components: {addHouse, addCar},
    data () {
      return {
        customerInfoController: this.isCustomer ? customerInfoController : guaranteeInfoController,
        dialog: {
          addHouse: false,
          addCar: false
        },
        radio: '1',
        radio2: '1',
        houseList: [],
        carList: [],
        customerInfo: {
          orderId: this.orderId,
          otherAssetsAmount: '',
          otherAssetsDescription: ''
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
      this.getOtherAssets()
    },
    methods: {
      // 返回
      cancel () {
        this.$router.go(-1)
      },
      // 查询借款人资产信息
      getCustomerAssets () {
        const customerId = this.$store.state.customerId
        const type = this.$store.state.type
        customerInfoController.queryCustomerAssets({customerId, type}).then(res => {
          if (res.status === 200) {
            this.houseList = res.data.houseList
            this.carList = res.data.carlist
            this.houseList.length === 0 ? this.radio = '0' : this.radio = '1'
            this.carList.length === 0 ? this.radio2 = '0' : this.radio2 = '1'
          }
          // console.log(res, '资产信息')
        })
      },
      // 其他资产
      getOtherAssets () {
        const customerId = this.$store.state.customerId
        const type = this.$store.state.type
        customerInfoController.queryCustomerInfo({customerId, type}).then(res => {
          if (res.status === 200) {
            this.customerInfo = {...this.customerInfo, ...res.data}
          }
        })
      },
      saveOtherAssets () {
        this.customerInfo.type = this.$store.state.type
        this.customerInfo.customerId = this.$store.state.customerId
        this.customerInfoController.saveCustomerInfo(this.customerInfo).then(res => {
          if (res.status === 200) {
            if (res.data) {
              this.$store.commit('SET_CUSTOMER_ID', res.data)
            }
            this.$message.success('保存成功')
            this.$nextTick(() => { this.getOtherAssets() })
          }
        })
      },
      // 房子
      addHouse () {
        this.dialog.addHouse = true
        this.$nextTick(() => {
          this.$refs.addHouse.addInit()
        })
      },
      editHouse (row) {
        this.dialog.addHouse = true
        this.$nextTick(() => {
          this.$refs.addHouse.editInit(row)
        })
      },
      houseClose () {
        this.dialog.addHouse = false
        this.getCustomerAssets()
      },
      removeHouse (row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = row.id
          customerInfoController.deleteCustomerAssets({id}).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.getCustomerAssets()
            }
          })
        }).catch(() => {})
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
          customerInfoController.deleteCustomerAssets({id}).then(res => {
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

<style lang="scss" scoped>
  .radio{
    padding: 20px 0;
  }

</style>
