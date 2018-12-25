import { sydService } from '@/api'

const managementsaveController = {
  baseUrl: "/sys/order",
  saveOrderInfo(params) {  // 获取信息页面的保存
    return sydService({
      method: 'post',
      url: this.baseUrl+'/saveOrderInfo',
      data: params
    })
  },

}

export { managementsaveController }
