import {
    sydService
    } from '@/api'
    
    const archivesController = {
      baseUrl: "/sys/archive",
      todoList(data) {   // 归档查询待办任务
        return sydService({
          method: 'post',
          url: this.baseUrl + '/todoList',
          data: data
        })
      },
      already(data) {   // 归档查询已办任务
        return sydService({
          method: 'post',
          url: this.baseUrl + '/already',
          data: data
        })
      },
      queryArchiveInfoList(data) {   // 项目档案管理列表
        return sydService({
          method: 'post',
          url: this.baseUrl + '/queryArchiveInfoList',
          data: data
        })
      },
      queryProjectInfo(params) {   // 归档管理-查询归档详情
        return sydService({
          method: 'post',
          url: this.baseUrl + '/queryProjectInfo',
          params: params
        })
      },
      confirmProjectInfo(data) {   // 归档管理-提交/确认
        return sydService({
          method: 'post',
          url: this.baseUrl + '/confirmProjectInfo',
          data: data
        })
      },
      getHistory(params) {   // 归档管理-查询归档确认和意见
        return sydService({
          method: 'post',
          url: this.baseUrl + '/getHistory',
          params: params
        })
      }
    }
    
    export {
        archivesController
    }
    