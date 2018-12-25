import {
  sydService
  } from '@/api'

  const projectController = {
    baseUrl: "/sys/order",
    projectList(data) { // 客户管理-订单管理-;项目管理列表查询
      return sydService({
        method: 'post',
        url: this.baseUrl + '/',
        data: data
      })
    },

  }

  export {
    projectController
  }
