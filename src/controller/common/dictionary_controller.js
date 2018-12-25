import {
  commonService
} from '@/api'

const dictionaryController = {
  baseUrl: '/sys/dictionary',
  queryAll () { // 用户主页菜单列表
    return commonService({
      method: 'post',
      url: this.baseUrl + '/queryAll'
    })
  },
  queryDictionaryList (data) { // 用户主页菜单列表
    return commonService({
      method: 'post',
      url: this.baseUrl + '/queryDictionaryList',
      data
    })
  },
  saveDictionary (data) { // 用户主页菜单列表
    return commonService({
      method: 'post',
      url: this.baseUrl + '/saveDictionary',
      data
    })
  },
  deleteDictionary (params) { // 用户主页菜单列表
    return commonService({
      method: 'post',
      url: this.baseUrl + '/deleteDictionary',
      data: params
    })
  }
}

export {
  dictionaryController
}
