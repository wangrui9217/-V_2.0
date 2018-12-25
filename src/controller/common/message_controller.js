import {
  sydService
} from '@/api'

const messageController = {
  baseUrl: '/sys/baseMessage',
  getMessageList (data) { // 获取站内信列表
    return sydService({
      method: 'post',
      url: this.baseUrl + '/',
      data: data
    })
  },
  readMessage (params) { // 阅读站内信
    return sydService({
      method: 'get',
      url: this.baseUrl + '/' + params
    })
  },
  countUnread () { // 获取未阅读站内信
    return sydService({
      method: 'get',
      url: this.baseUrl + '/countUnread'
    })
  },
  delete (params) { // 删除站内信
    return sydService({
      method: 'delete',
      url: this.baseUrl + '/delete',
      params: params
    })
  },
  save (params) { // 新增站内信
    return sydService({
      method: 'post',
      url: this.baseUrl + '/save',
      params: params
    })
  },
}

export {
  messageController
}
