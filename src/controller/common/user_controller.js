import { commonService } from '@/api'

const userController = {
  baseUrl: "/sys/system/user",
  currentUserInfo() {   // 获取登录的用户信息
    return commonService({
      method: 'get',
      url: this.baseUrl + '/info'
    })
  },
  list(params) {  // 分页获取用户列表
    return commonService({
      method: 'get',
      url: this.baseUrl + '/list',
      params: params
    })
  },
  resetPassword(params) {  // 重置密码接口
    return commonService({
      method: 'post',
      url: this.baseUrl +'/resetPassword',
      params: params
    })
  },
  save(data) {  // 新增用户
    return commonService({
      method: 'post',
      url: this.baseUrl + '/save',
      data: data
    })
  },
  update(data) {  //更新用户信息
    return commonService({
      method: 'put',
      url: this.baseUrl + '/update',
      data: data
    })
  },

  delete(data) {  // 删除用户
    return commonService({
      method: 'delete',
      url: this.baseUrl + '/delete',
      data: data
    })
  },
  roleIdList(params) {  // 获取用户角色
    return commonService({
      method: 'get',
      url:this.baseUrl + '/roleIdList/'+params,
    })
  },
  updateStatus(data) {  // 更新用户状态
    return commonService({
      method: 'put',
      url: this.baseUrl + '/updateStatus',
      data: data
    })
  },
  info(params) {  // 获取用户详情
    return commonService({
      method: 'get',
      url: this.baseUrl + '/info/'+params,
    })
  },
  password(data) {  // 修改登录用户密码
    return commonService({
      method: 'put',
      url: this.baseUrl +'/password',
      data: data
    })
  },

}

export { userController }
