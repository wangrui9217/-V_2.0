import {
  commonService
} from '@/api'

const roleController = {
  baseUrl: "/sys/system/role",
  list(params) { // 分页获取角色列表
    return commonService({
      method: 'get',
      url: this.baseUrl + '/list',
      params: params
    })
  },
  select() { // 获取所有角色列表
    return commonService({
      method: 'get',
      url: this.baseUrl + '/select',
    })
  },
  save(data) { // 新增角色
    return commonService({
      method: 'post',
      url: this.baseUrl + '/save',
      data: data
    })
  },
  update(data) { // 更新角色信息
    return commonService({
      method: 'put',
      url: this.baseUrl + '/update',
      data: data
    })
  },
  delete(data) { // 删除角色
    return commonService({
      method: 'delete',
      url: this.baseUrl + '/delete',
      data: data
    })
  },
  updateStatus(data) { // 更新角色状态
    return commonService({
      method: 'put',
      url: this.baseUrl + '/updateStatus',
      data: data
    })
  },
  info(params) { // 获取角色详情
    return commonService({
      method: 'get',
      url: this.baseUrl + '/info/' + params
    })
  },
}

export {
  roleController
}
