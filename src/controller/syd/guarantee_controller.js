import {
  sydService
  } from '@/api'
  
  const guaranteeController = {
    baseUrl: "/sys/guarantee",
    queryGuaranteeList(data) { // 客户管理-担保管理-查询担保列表
      return sydService({
        method: 'post',
        url: this.baseUrl + '/queryGuaranteeList',
        data: data
      })
    },
    deleteCompanyGuarantee(params) { //  客户管理-担保管理-删除担保人/公司
      return sydService({
        method: 'post',
        url: this.baseUrl + '/deleteCompanyGuarantee',
        params: params 
      })
    },
    saveCompanyGuarantee(data) { // 客户管理-担保管理-保存担保公司信息
      return sydService({
        method: 'post',
        url: this.baseUrl + '/saveCompanyGuarantee',
        data: data
      })
    },
    queryCompanyGuarantee(params) { //  客户管理-担保管理-查询担保公司信息
      return sydService({
        method: 'post',
        url: this.baseUrl + '/queryCompanyGuarantee',
        params: params 
      })
    },
  }
  
  export {
    guaranteeController
  }
  