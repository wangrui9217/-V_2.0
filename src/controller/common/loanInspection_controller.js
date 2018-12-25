import {
  sydService
} from '@/api'

const loanInspectionController = {
  baseUrl: '/sys/quality',
  qualityList (params) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/qualityList',
      data: params
    })
  },
  qualityInfo (params) {
    return sydService({
      method: 'get',
      url: this.baseUrl + '/qualityInfo/' +params,
    })
  },
  saveQualityInfo (params) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveQualityInfo',
      data: params
    })
  },
  qualityManageList (params) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/qualityManageList',
      data: params
    })
  },
}

export {
  loanInspectionController
}
