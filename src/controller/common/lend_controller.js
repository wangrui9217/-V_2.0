import {
  sydService
} from '@/api'

const lendController = {
  baseUrl: '/sys/lend',
  alreadyDoneList (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/alreadyDoneList',
      data
    })
  },
  alreadyApplyList (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/alreadyApplyList',
      data
    })
  },
  alreadyCheckList (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/alreadyCheckList',
      data
    })
},
  getOrderList (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/getOrderList',
      data
    })
  },
  lendApply (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/lendApply',
      data
    })
  },
  lendCheck (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/lendCheck',
      data
    })
  },
  queryApproveDetail (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryApproveDetail',
      params: data
    })
  },
  todoList (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/todoList',
      data
    })
  }
}

export {
  lendController
}
