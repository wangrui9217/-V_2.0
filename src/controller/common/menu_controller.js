import {
  commonService
} from '@/api'

const menuController = {
  baseUrl: "/sys/system/menu",
  userMenuList(params) { // 用户主页菜单列表
    return commonService({
      method: 'get',
      url: this.baseUrl + '/userMenuList',
      params: params
    })
  },
  list(params) { // 分页获取菜单列表
    return commonService({
      method: 'get',
      url: this.baseUrl + '/list',
      params: params
    })
  },
  info(params) { //根据菜单id获取菜单
    return commonService({
      method: 'get',
      url: this.baseUrl + '/info/' + params
    })
  },
  select(params) { // 获取所有菜单列表（添加、修改菜单）
    return commonService({
      method: 'get',
      url: this.baseUrl + '/select',
      params: params
    })
  },
  save(data) { // 新增菜单
    return commonService({
      method: 'post',
      url: this.baseUrl + '/save',
      data: data
    })
  },
  delete(data) { // 删除菜单
    return commonService({
      method: 'delete',
      url: this.baseUrl + '/delete',
      data: data
    })
  },
  updateStatus(data) { // 启用停用菜单
    return commonService({
      method: 'put',
      url: this.baseUrl + '/updateStatus',
      data: data
    })
  },
  update(data) { //更新菜单信息
    return commonService({
      method: 'put',
      url: this.baseUrl + '/update',
      data: data
    })
  }
}

export {
  menuController
}
