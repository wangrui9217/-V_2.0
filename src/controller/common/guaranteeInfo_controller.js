import {
  sydService
} from '@/api'

const guaranteeInfoController = {
  baseUrl: '/sys/guarantee',
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
      data: data
    })
  },
  queryCompanyGuarantee (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryCompanyGuarantee',
      params: data
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
  }
}

export {
  guaranteeInfoController
}
