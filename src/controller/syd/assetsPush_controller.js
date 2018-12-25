import {
    sydService
    } from '@/api'
    
    const assetsPushController = {
      baseUrl: "/sys/materials",
      todoList(data) {   // 资产推送-查询待推送案件列表
        return sydService({
          method: 'post',
          url: this.baseUrl + '/todoList',
          data: data
        })
      },
      AlreadyList(data) {   // 资产推送-查询已推送案件列表
        return sydService({
          method: 'post',
          url: this.baseUrl + '/AlreadyList',
          data: data
        })
      },
      getPushData(params) {   // 回显进件推送数据
        return sydService({
          method: 'get',
          url: this.baseUrl + '/' + params,
        })
      },
      projectPush(data) {   // 回显进件推送数据
        return sydService({
          method: 'post',
          url: this.baseUrl + '/projectPush',
          data: data
        })
      },
    }
    
    export {
        assetsPushController
    }
    