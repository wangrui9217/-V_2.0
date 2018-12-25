import {
  sydService
} from '@/api'

const customerInfoController = {
  baseUrl: '/sys/customerInfo',
  deleteBorrowingHistory (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/deleteBorrowingHistory',
      params: data
    })
  },
  queryBorrowingHistory (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryBorrowingHistory',
      params: data
    })
  },
  saveBorrowingHistory (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveBorrowingHistory',
      data
    })
  },
  confirmCustomer (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/confirmCustomer',
      data
    })
  },
  deleteCustomerAssets (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/deleteCustomerAssets',
      params: data
    })
  },
  deleteLiabilitiesCreditcard (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/deleteLiabilitiesCreditcard',
      params: data
    })
  },
  deleteLiabilitiesLoan (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/deleteLiabilitiesLoan',
      params: data
    })
  },
  queryCustomerAssets (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryCustomerAssets',
      params: data
    })
  },
  queryCustomerCreditinfo (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryCustomerCreditinfo',
      params: data
    })
  },
  queryCustomerInfo (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryCustomerInfo',
      params: data
    })
  },
  queryLiabilitiesCreditcard (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryLiabilitiesCreditcard',
      params: data
    })
  },
  queryLiabilitiesLoan (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryLiabilitiesLoan',
      params: data
    })
  },
  saveCustomerAssets (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveCustomerAssets',
      data: data
    })
  },
  saveCustomerCreditinfo (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveCustomerCreditinfo',
      data: data
    })
  },
  saveCustomerInfo (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveCustomerInfo',
      data: data
    })
  },
  saveLiabilitiesCreditcard (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveLiabilitiesCreditcard',
      data: data
    })
  },
  saveLiabilitiesLoan (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveLiabilitiesLoan',
      data: data
    })
  },
  submitLoanApply (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/submitLoanApply',
      data: data
    })
  },
  confirmResource(params) {   // 客户管理-客户录入-确认资料已上传
    return sydService({
      method: 'post',
      url: this.baseUrl + '/confirmResource',
      params: params
    })
  }
}

export {
  customerInfoController
}
