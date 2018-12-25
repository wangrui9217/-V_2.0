<template>
  <div v-loading.fullscreen="loading" :class="{'g-listpage__style' : !isDisabled}" style="width:100%">
    <div class="submit-btn" v-if="!isDisabled && !isCheck">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="isCustomer ? '借款人信息' : '自然人担保信息'" name="first">
        <borrower-information  :isCustomer="isCustomer"  ref="borrowInfo" :hasSubmit="hasSubmit" :orderId="orderId" :isDisabled="isDisabled" :isCheck="isCheck"></borrower-information>
      </el-tab-pane>
      <el-tab-pane label="资产信息" name="second">
        <enterprise-information  :isCustomer="isCustomer" ref="enterpriseInfo" :hasSubmit="hasSubmit" :orderId="orderId" :isDisabled="isDisabled" :isCheck="isCheck"></enterprise-information>
      </el-tab-pane>
      <el-tab-pane label="负债信息" name="third">
        <guarantee-information  :isCustomer="isCustomer" ref="guaranteeInfo" :hasSubmit="hasSubmit" :orderId="orderId" :isDisabled="isDisabled" :isCheck="isCheck"></guarantee-information>
      </el-tab-pane>
      <el-tab-pane label="历史借款" name="forth">
        <history-information :isCustomer="isCustomer"  ref="historyInfo" :hasSubmit="hasSubmit" :orderId="orderId" :isDisabled="isDisabled" :isCheck="isCheck"></history-information>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import borrowerInformation from './borrower_information'
  import enterpriseInformation from './enterprise_information'
  import guaranteeInformation from './guarantee_information'
  import historyInformation from './history_information'
  import {customerInfoController} from './../../controller/common/customerInfo_controller'
  import {guaranteeInfoController} from './../../controller/common/guaranteeInfo_controller'
  import {customerController} from './../../controller/common/customer_controller'
export default {
    components: {
      borrowerInformation,
      enterpriseInformation,
      guaranteeInformation,
      historyInformation
    },
    data () {
      return {
        // customerId: this.$route.query.orderId === 'add' ? 0 : this.$route.query.orderId,
        orderId: this.$route.query.orderId ? this.$route.query.orderId : '',
        loading: false,
        hasSubmit: false,
        activeName: 'first'
      }
    },
    beforeMount () {
      if(this.id) {
        this.$store.commit('SET_CUSTOMER_ID', this.id)
      } else {
        if (this.$route.query.id) {
          this.$store.commit('SET_CUSTOMER_ID', this.$route.query.id === 'add' ? 0 : this.$route.query.id)
        } else {
          this.$store.commit('SET_CUSTOMER_ID', this.$route.query.orderId)
        }
      }
      // 设置type
      if (this.isCustomer) {
        this.$store.commit('SET_TYPE', 1)
      } else if (this.isHome) {
        this.$store.commit('SET_TYPE', 3)
      } else {
        this.$store.commit('SET_TYPE', 2)
      }
    },
    props: {
      // 是否是借款人or自然人担保
      isCustomer: {
        type: Boolean,
        default: true
      },
      // 是否是家庭成员担保
      isHome: {
        type: Boolean,
        default: false
      },
      // 审核是否可编辑
      isDisabled: {
        type: Boolean,
        default: false
      },
      isCheck: {
        type: Boolean,
        default: false
      },
      id: {
        type: Number,
        required: false
      }
    },
    mounted () {
      this.checkHasSubmit()
    },
    computed: {
    },
    methods: {
      judgeValidate () {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            const borrowInfo = this.$refs.borrowInfo
            const enterpriseInfo = this.$refs.enterpriseInfo
            const guaranteeInfo = this.$refs.guaranteeInfo
            borrowInfo.judgeValidate().then(() => {
              guaranteeInfo.judgeValidate().then(() => {
                borrowInfo.dataFormat()
                guaranteeInfo.dataFormat()
                const tempObj = {
                  otherAssetsAmount: enterpriseInfo.customerInfo.otherAssetsAmount,
                  otherAssetsDescription: enterpriseInfo.customerInfo.otherAssetsDescription
                }
                const params = {
                  customerInfoRequest: {...borrowInfo.customerInfo, ...tempObj},
                  customerCreditinfoRequest: guaranteeInfo.creditInfo,
                  orderId: this.isCustomer ? borrowInfo.customerInfo.customerId : this.orderId
                }
                resolve(params)
              }).catch(() => {
                this.activeName = 'third'
                reject('third')
              })
            }).catch(() => {
              this.activeName = 'first'
              reject('first')
            })
          })
        })
      },
      submit () {
        this.judgeValidate().then(res => {
          if (this.isCustomer) {
            customerInfoController.confirmCustomer(res).then(res => {
              if (res.status === 200) {
                this.$message.success('提交成功')
                this.$router.go(-1)
              }
            })
          } else {
            guaranteeInfoController.confirmCustomer(res).then(res => {
              if (res.status === 200) {
                this.$message.success('提交成功')
                this.$router.go(-1)
              }
            })
          }
        }).catch(() => {
        })
        // this.$nextTick(() => {
        //   const borrowInfo = this.$refs.borrowInfo
        //   const enterpriseInfo = this.$refs.enterpriseInfo
        //   const guaranteeInfo = this.$refs.guaranteeInfo
        //   borrowInfo.judgeValidate().then(() => {
        //     guaranteeInfo.judgeValidate().then(() => {
        //       borrowInfo.dataFormat()
        //       guaranteeInfo.dataFormat()
        //       const tempObj = {
        //         otherAssetsAmount: enterpriseInfo.customerInfo.otherAssetsAmount,
        //         otherAssetsDescription: enterpriseInfo.customerInfo.otherAssetsDescription
        //       }
        //       const params = {
        //         customerInfoRequest: {...borrowInfo.customerInfo, ...tempObj},
        //         customerCreditinfoRequest: guaranteeInfo.creditInfo,
        //         orderId: this.isCustomer ? borrowInfo.customerInfo.customerId : this.orderId
        //       }
        //       if (this.isCustomer) {
        //         customerInfoController.confirmCustomer(params).then(res => {
        //           if (res.status === 200) {
        //             this.$message.success('提交成功')
        //             this.$router.go(-1)
        //           }
        //         })
        //       } else {
        //         guaranteeInfoController.confirmCustomer(params).then(res => {
        //           if (res.status === 200) {
        //             this.$message.success('提交成功')
        //             this.$router.go(-1)
        //           }
        //         })
        //       }
        //     }).catch(() => {
        //       this.activeName = 'third'
        //     })
        //   }).catch(() => {
        //     this.activeName = 'first'
        //   })
        // })
      },
      checkHasSubmit () {
        if (this.$route.query.id !== 'add') {
          if (this.isCustomer) {
            const orderId = this.$store.state.customerId
            customerController.queryCustomerInfo({orderId}).then(res => {
              console.log(res.data.customer.borrowerEntryState, '是否已提交')
              if (res.data.customer.borrowerEntryState === '1') {
                this.hasSubmit = true
              }
            })
          } else {
            const id = this.$store.state.customerId
            guaranteeInfoController.queryCompanyGuarantee({id}).then(res => {
              console.log(res.data.state, '是否已提交')
              if (res.data.state === '1') {
                this.hasSubmit = true
              }
            })
          }
        }
      },
      handleClick (tab, event) {
      }
    }
}
</script>

<style lang="scss" scoped>
  .submit-btn{
    display: flex;
    justify-content: flex-end;
  }
</style>
