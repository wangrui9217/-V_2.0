import {
  sydService
} from '@/api'

const customerController = {
  baseUrl: "/sys/customer",
  queryCustomerList(data) { // 客户管理-客户登记-客户列表
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryCustomerList',
      data: data
    })
  },
  queryCustomerInfo(data) { // 企业信息接口-查询接口
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryCustomerInfo',
      params: data
    })
  },
  saveCustomer(data) { // 客户管理-客户登记-新增客户信息
    return sydService({
      method: 'post',
      url: this.baseUrl + '/saveCustomer',
      data: data
    })
  },
  deleteCustomer(data) { // 客户管理-客户登记-删除客户
    return sydService({
      method: 'post',
      url: this.baseUrl + '/deleteCustomer',
      data: data
    })
  },

}

export {
  customerController
}
