import { sydService } from '@/api'
import { wfServiceUrl } from '@/api'

const workController = {
  baseUrl: "/sys/workPanel",
  wfServiceUrl : wfServiceUrl,
  work(params) {  // 获取工作台代办列表
    return sydService({
      method: 'post',
      url: this.baseUrl+'/todoList',
      data: params
    })
  },
  hangTask (params) {  // 获取工作台代办列表
    return sydService({
      method: 'post',
      url: this.baseUrl + '/hangTask',
      params
    })
  },
alreadyList(params) {  // 获取工作台代办列表
    return sydService({
      method: 'post',
      url: this.baseUrl+'/alreadyList',
      data: params
    })
  },
  blindClaim(params) {  // 获取工作台代办列表
    return sydService({
      method: 'get',
      url: this.baseUrl+'/blindClaim',
      data: params
    })
  },
  claimCount(params) {  // 获取工作台代办列表
    return sydService({
      method: 'get',
      url: this.baseUrl+'/claimCount',
      data: params
    })
  },

}

export { workController }
