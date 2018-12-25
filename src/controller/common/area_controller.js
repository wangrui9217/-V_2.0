import {
  commonService
} from '@/api'

const areaController = {
  baseUrl: '/sys/area/queryAll',
  queryAll () { // 用户主页菜单列表
    return commonService({
      method: 'post',
      url: this.baseUrl
    })
  }
}

export {
  areaController
}
