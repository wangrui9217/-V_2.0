import {sydService} from '@/api'

const orderController = {
  baseUrl: '/sys/order',
  queryApplyDetail (data) {   // 审批管理-查询审核详情
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryApplyDetail',
      params: data
    })
  },
  submitResult (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/submitResult',
      data
    })
  },
  queryLoanInfo (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryLoanInfo',
      params: data
    })
  },
  getOrderList (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/getOrderList',
      data
    })
  },
  saveServiceFee (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveServiceFee',
      data
    })
  },
  deleteServiceFee (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/deleteServiceFee',
      params: data
    })
  }
}

export {
  orderController
}
