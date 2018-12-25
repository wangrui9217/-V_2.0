import {
  sydService
} from '@/api'

const planController = {
  baseUrl: '/sys/resource',
  queryPlanOrderList (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryPlanOrderList',
      data
    })
  },
  queryPlanOrderDetail (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryPlanOrderDetail',
      params: data
    })
  },
  queryPlanApplyDetail (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryPlanApplyDetail',
      params: data
    })
  },
  queryPlanReviewList (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryPlanReviewList',
      data
    })
  },
  confirmPlanOrder (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/confirmPlanOrder',
      data
    })
  }
}

export {
  planController
}
