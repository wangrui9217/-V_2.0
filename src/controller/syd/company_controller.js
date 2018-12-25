import { sydService } from '@/api'

const companyController = {
  baseUrl: "/sys/company",
  updateCompany(params) {  // 获取企业基本完善信息接口
    return sydService({
      method: 'post',
      url: this.baseUrl+'/updateCompany',
      data: params
    })
  },
  saveOrUpdateCompanyOperation(data) {  // 企业经营信息完善
    return sydService({
      method: 'post',
      url: this.baseUrl+'/saveOrUpdateCompanyOperation',
      data: data
    })
  },
  companyOperation(params) {  // 获取企业经营信息
    return sydService({
      method: 'get',
      url: this.baseUrl+'/companyOperation/' + params,
    })
  },
  commit(params) {  // 获取企业经营信息/银行流水信息，企业完善信息的提交接口
    return sydService({
      method: 'get',
      url: this.baseUrl+'/commit/' ,
      params:params
    })
  },
}

export { companyController }
