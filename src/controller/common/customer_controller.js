import {
  sydService
} from '@/api'

const customerController = {
  baseUrl: '/sys/customer',
  queryCustomerInfo (data) {
    return sydService({
      method: 'post',
      url: this.baseUrl + '/queryCustomerInfo',
      params: data
    })
  }
}

export {
  customerController
}
