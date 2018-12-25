import {
  commonService
} from '@/api'

const resourceController = {
  baseUrl: "/sys/resource",
  saveResource(data) { //  资源管理-保存文件信息
    return commonService({
      method: 'post',
      url: this.baseUrl + '/saveResource',
      data: data
    })
  },
  deleteResource(params) { // 资源管理-删除文件
    return commonService({
      method: 'post',
      url: this.baseUrl + "/deleteResource",
      params: params
    })
  },
  queryResource(data) { //  资源管理-查询文件信息
    return commonService({
      method: 'post',
      url: this.baseUrl + '/queryResource',
      data: data
    })
  }
}

export {
  resourceController
}
