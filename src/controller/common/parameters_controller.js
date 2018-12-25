import {
  commonService
} from '@/api'

const parametersController = {
  baseUrl: '/sys/parameters',
  queryParametersList (data) {   // 审批管理-查询审核详情
    return commonService({
      method: 'post',
      url: this.baseUrl + '/queryParametersList',
      data
    })
  },
  saveParameters (data) {   // 审批管理-查询审核详情
    return commonService({
      method: 'post',
      url: this.baseUrl + '/saveParameters',
      data
    })
  }
}

export {
  parametersController
}
