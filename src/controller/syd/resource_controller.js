import {
    sydService
    } from '@/api'
    
    const resourceController = {
      baseUrl: "/sys/resource",
      queryAll(params) {   // 归档申请-查询资料
        return sydService({
          method: 'post',
          url: this.baseUrl + '/queryAll',
          params: params,
          showLoading: false
        })
      }
    }
    
    export {
        resourceController
    }
    