import {
    commonService,commonServiceUrl
  } from '@/api'

  const loginController = {
    baseUrl: "/sys/system",
    imgAuthCode() { // 获取图片验证码
      return commonServiceUrl + this.baseUrl + '/imgAuthCode.jpg'
    },
    login(data) { // 用户登录
      return commonService({
        method: 'post',
        url: this.baseUrl + '/login',
        data: data
      })
    },
    logout(params) { // 用户登出
      return commonService({
        method: 'post',
        url: this.baseUrl + '/logout',
        params: params
      })
    },
  }

  export {
    loginController
  }
