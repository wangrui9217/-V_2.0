<template>
  <div>
    <div>
      <p class='common-title' v-text="isCustomer ? '申请人信息' : '担保人信息'"></p>
      <div class='common-group'>
        <el-form label-position='top' :model='customerInfo' :inline='true' ref='ruleForm'>
          <el-form-item :label="isCustomer ? '借款人姓名' : '担保人姓名'" :rules='$rules.requiredInputValue' prop='borrowerName' >
            <el-input v-model='customerInfo.borrowerName' :disabled="isCustomer || isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='身份证号码' :rules='$rules.idCardRule' prop='borrowerCardNum' >
            <el-input v-model='customerInfo.borrowerCardNum' :disabled="isCustomer || isDisabled"></el-input>
          </el-form-item>
          <!--<el-form-item label='性别' :rules='$rules.requiredSelectValue' prop='sex'>-->
            <!--<el-select v-model='customerInfo.sex' placeholder='请选择' :disabled="isDisabled">-->
              <!--<el-option-->
                <!--v-for="item in $dict.findDictData('Sex')"-->
                <!--:key='item.id'-->
                <!--:label='item.value'-->
                <!--:value='item.id'>-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label='手机' :rules='$rules.phoneRule' prop='borrowerPhone' >
            <el-input v-model='customerInfo.borrowerPhone	' :disabled="isCustomer || isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='教育程度' :rules='$rules.requiredSelectValue' prop='educationLevel'>
            <el-select v-model='customerInfo.educationLevel' placeholder='请选择' :disabled="isDisabled">
              <el-option
                v-for="item in $dict.findDictData('Education')"
                :key='item.id'
                :label='item.value'
                :value='item.id'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="与借款人关系" prop="relationships"  :rules='$rules.requiredSelectValue' v-if="!isCustomer">
            <el-select v-model='customerInfo.relationships' placeholder='请选择' :disabled="isDisabled">
              <el-option
                v-for="item in $dict.findDictData('ApplicantRelationship')"
                :key='item.id'
                :label='item.value'
                :value='item.id'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='户籍地址' :rules='$rules.requiredInputDate' prop='censusList'>
            <el-cascader
              :disabled="isDisabled"
              :props="{value: 'id',label: 'name'}"
              :options="$dict.getDictData('Area')"
              v-model='customerInfo.censusList'
            ></el-cascader>
          </el-form-item>
          <el-form-item label='户籍详细地址' :rules='$rules.requiredInputValue' prop='censusAddress'>
            <el-input v-model='customerInfo.censusAddress' :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='本地居住年限(年)' :rules='$rules.requiredInputNumber' prop='residenceYear'>
            <el-input v-model='customerInfo.residenceYear' type="number" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='现居住地' :rules='$rules.requiredInputDate' prop='addressList'>
            <el-cascader
              :disabled="isDisabled"
              :props="{value: 'id',label: 'name'}"
              :options="$dict.getDictData('Area')"
              v-model='customerInfo.addressList'
            ></el-cascader>
          </el-form-item>
          <el-form-item label='现居住地详细地址' :rules='$rules.requiredInputValue' prop='address'>
            <el-input v-model='customerInfo.address' :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='家庭人数' :rules='$rules.requiredInputNumber' prop='familiesNumber' type="number">
            <el-input v-model='customerInfo.familiesNumber' :disabled="isDisabled" type="number"></el-input>
          </el-form-item>
          <el-form-item label='产权状况' :rules='$rules.requiredSelectValue' prop='property'>
            <el-select v-model='customerInfo.property' placeholder='请选择' :disabled="isDisabled">
              <el-option
                v-for="item in $dict.findDictData('PropertyStatus')"
                :key='item.id'
                :label='item.value'
                :value='item.id'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='住宅电话'  prop='mobile' :rules='$rules.requiredInputPhone'>
            <el-input v-model='customerInfo.mobile' :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='婚姻状况' :rules='$rules.requiredSelectValue' prop='marriage'>
            <el-select v-model='customerInfo.marriage' placeholder='请选择' :disabled="isDisabled">
              <el-option
                v-for="item in $dict.findDictData('MaritalStatus')"
                :key='item.id'
                :label='item.value'
                :value='item.id'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='有无犯罪记录'  prop='borrowerCrime'>
            <el-input v-model='customerInfo.borrowerCrime' placeholder="无" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label='主要家庭成员简介'  prop='familiesIntroduction'>
            <el-input v-model='customerInfo.familiesIntroduction' type='textarea' :rows='4' :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item v-if="!isCustomer" label='备注'  prop='remark'>
            <el-input v-model='customerInfo.remark' type='textarea' :rows='4' :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item></el-form-item>
        </el-form>
      </div>
      <template v-if="$dict.findDictionaryName(customerInfo.marriage) === '已婚'">
        <p class='common-title'>申请人配偶情况</p>
        <div class='common-group'>
          <el-form label-position='top' status-icon :model='customerInfo' :inline='true' ref='ruleForm2'>
            <el-form-item label='配偶姓名' :rules='$rules.requiredInputValue' prop='spouseName'>
              <el-input v-model='customerInfo.spouseName' :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label='身份证号码' :rules='$rules.idCardRule' prop='spouseCardNum'>
              <el-input v-model='customerInfo.spouseCardNum' :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label='户籍地址'  prop='spouseCensusList'>
              <el-cascader
                :disabled="isDisabled"
                :props="{value: 'id',label: 'name'}"
                :options="$dict.getDictData('Area')"
                v-model='customerInfo.spouseCensusList'
              ></el-cascader>
            </el-form-item>
            <el-form-item label='户籍详细地址'  prop='spouseCensus'>
              <el-input v-model='customerInfo.spouseCensus' :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label='教育程度'  prop='spouseEducationLevel'>
              <el-select v-model='customerInfo.spouseEducationLevel' placeholder='请选择' :disabled="isDisabled">
                <el-option
                  v-for="item in $dict.findDictData('Education')"
                  :key='item.id'
                  :label='item.value'
                  :value='item.id'>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='职业'  prop='spouseCareer'>
              <el-input v-model='customerInfo.spouseCareer' :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label='有无犯罪记录'  prop='borrowerCrime'>
              <el-input v-model='customerInfo.spouseBorrowerCrime' placeholder="无" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label='手机号码'  prop='spousePhone'>
              <el-input v-model='customerInfo.spousePhone' :disabled="isDisabled"></el-input>
            </el-form-item>

          </el-form>
        </div>
      </template>
      <el-row v-if="!isDisabled && !isCheck">
        <el-button type='primary' @click="saveInfo" :disabled="hasSubmit">保存</el-button>
        <el-button @click='cancel'>取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {customerInfoController} from './../../controller/common/customerInfo_controller'
  import {guaranteeInfoController} from './../../controller/common/guaranteeInfo_controller'
  export default {
    data () {
      return {
        customerInfoController: this.isCustomer ? customerInfoController : guaranteeInfoController,
        customerInfo: {
          relationships: '',
          orderId: this.orderId,
          censusList: [null, null, null],
          addressList: [null, null, null],
          spouseCensusList: [null, null, null],
          sex: '',
          address: '',
          addressCity: '',
          addressCounty: '',
          addressProvince: '',
          borrowerCardNum: '',
          borrowerCrime: '',
          borrowerName: '',
          borrowerPhone: '',
          censusAddress: '',
          censusAddressCity: '',
          censusAddressCounty: '',
          censusAddressProvince: '',
          customerId: this.$store.state.customerId,
          educationLevel: '',
          familYasset: '',
          familiesIntroduction: '',
          familiesNumber: '',
          id: null,
          marriage: '',
          mobile: '',
          otherAssetsAmount: '',
          otherAssetsDescription: '',
          otherLiabilities: '',
          property: null,
          residenceYear: '',
          spouseCardNum: '',
          spouseCareer: '',
          spouseCensus: '',
          spouseEducationLevel: '',
          spouseName: '',
          spousePhone: '',
          spouseAddressProvince: '',
          spouseBorrowerCrime: '',
          spouseAddressCity: '',
          spouseAddressCounty: '',
          remark: ''
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
      this.initState()
    },
    methods: {
      cancel () {
        this.$router.go(-1)
        // this.initState()
      },
      resetFormInfo () {
        this.$nextTick(() => {
          this.resetForm('ruleForm')
          if (this.$dict.findDictionaryName(this.customerInfo.marriage) === '已婚') {
            this.resetForm('ruleForm2')
          }
        })
      },
      initState () {
        const customerId = this.$store.state.customerId
        const type = this.$store.state.type
        customerInfoController.queryCustomerInfo({customerId, type}).then(res => {
          if (res.status === 200) {
            this.customerInfo = {...this.customerInfo, ...res.data}
            this.customerInfo.censusList = [this.customerInfo.censusAddressProvince, this.customerInfo.censusAddressCity, this.customerInfo.censusAddressCounty]
            this.customerInfo.addressList = [this.customerInfo.addressProvince, this.customerInfo.addressCity, this.customerInfo.addressCounty]
            this.customerInfo.spouseCensusList = [this.customerInfo.spouseAddressProvince, this.customerInfo.spouseAddressCity, this.customerInfo.spouseAddressCounty]
            console.log(res.data, this.customerInfo, 'this.customerInfo')
            this.resetFormInfo()
          }
        })
      },
      saveInfo () {
        this.saveCustomerInfo()
        // this.judgeValidate().then(() => {
        //   this.saveCustomerInfo()
        // })
      },
      judgeValidate () {
        return new Promise((resolve, reject) => {
          const prom = this.$dict.findDictionaryName(this.customerInfo.marriage) === '已婚' ? [this.submitForm('ruleForm'), this.submitForm('ruleForm2')] : [this.submitForm('ruleForm')]
          Promise.all(prom).then(() => {
            resolve()
          }).catch(err => {
            reject(err)
          })
        })
      },
      dataFormat () {
        [this.customerInfo.censusAddressProvince, this.customerInfo.censusAddressCity, this.customerInfo.censusAddressCounty] = this.customerInfo.censusList;
        [this.customerInfo.addressProvince, this.customerInfo.addressCity, this.customerInfo.addressCounty] = this.customerInfo.addressList;
        [this.customerInfo.spouseAddressProvince, this.customerInfo.spouseAddressCity, this.customerInfo.spouseAddressCounty] = this.customerInfo.spouseCensusList
        this.customerInfo.type = this.$store.state.type
        this.customerInfo.customerId = this.$store.state.customerId
      },
      saveCustomerInfo () {
        this.dataFormat()
        console.log(this.customerInfo, '保存信息')
        this.customerInfoController.saveCustomerInfo(this.customerInfo).then(res => {
          if (res.status === 200) {
            if (res.data) {
              this.$store.commit('SET_CUSTOMER_ID', res.data)
            }
            this.$message.success('保存成功')
            this.$nextTick(() => {
              this.initState()
            })
          }
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
      resetForm (formName) {
        // this.$refs[formName].resetFields()
        this.$refs[formName].clearValidate()
      }
    }
  }
</script>

<style lang='scss' scoped>
  .tab-container{
    display: flex;
    justify-content: center;
    &>div{
      margin: 0 10px;
      background-color: #dde4ea;
      cursor: pointer;
      display: flex;
      width: 200px;
      height: 40px;
      justify-content: center;
      align-items: center;
    }
    .active{
      background-color: #199ed8;
      color: #fff;
    }
  }
.common-group .el-input,
.common-group .el-cascader,
.common-group .el-select {
  width: 90%;
}
</style>
