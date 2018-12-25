import { sydService } from '@/api'

const companyController = {
  baseUrl: "/sys/company",
  company(params) {  // 获取录入接口
    return sydService({
      method: 'get',
      url: this.baseUrl+'/company/'+ params.companyId,

    })
  },
  commit(params) {  // 获取录入接口
    return sydService({
      method: 'post',
      url: this.baseUrl+'/commit',
      data:params
    })
  },
  updateCompany(data) {  // 获取企业基本完善信息保存接口
    return sydService({
      method: 'post',
      url: this.baseUrl+'/updateCompany',
      data
  })
  },
  saveOrUpdateCompanyBankFlow(params) {  // 获取完善银行流水信息
    return sydService({
      method: 'post',
      url: this.baseUrl+'/saveOrUpdateCompanyBankFlow',
      data:params
    })
  },
  companyBankFlow(params) {  // 获取完善银行流水信息
    return sydService({
      method: 'get',
      url: this.baseUrl+'/companyBankFlow/'+params.companyId,
    })
  }

}

export { companyController }
