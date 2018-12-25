import {
  commonService
} from '@/api'

const deptController = {
  baseUrl: "/sys/system/dept",
  list(params) { // 分页获取部门列表
    return commonService({
      method: 'get',
      url: this.baseUrl + '/list',
      params: params
    })
  },
  currentInfo(params) { // 根据主键获取部门信息
    return commonService({
      method: 'get',
      url: this.baseUrl + '/info/' + params
    })
  },
  save(data) { // 新增部门
    return commonService({
      method: 'post',
      url: this.baseUrl + '/save',
      data: data
    })
  },
  update(data) { // 修改部门信息
    return commonService({
      method: 'put',
      url: this.baseUrl + '/update',
      data: data
    })
  },
  updateStatus(data) { // 批量启用停用菜单
    return commonService({
      method: 'put',
      url: this.baseUrl + '/updateStatus',
      data: data
    })
  },
  delete(data) { // 删除部门
    return commonService({
      method: 'delete',
      url: this.baseUrl + '/delete',
      data: data
    })
  },
  select(params) { // 获取所有部门(添加、修改菜单)
    return commonService({
      method: 'get',
      url: this.baseUrl + '/select',
      params: params
    })
  },
}

export {
  deptController
}
