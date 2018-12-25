import {
  commonService, commonServiceUrl
} from '@/api'

const fileController = {
  baseUrl: "/common/file",
  upload(data) { //  文件上传接口
    return commonService({
      method: 'post',
      url: this.baseUrl + '/upload',
      data: data
    })
  },
  list(params) { // 分页查询文件
    return commonService({
      method: 'get',
      url: this.baseUrl + '/list/' + params,
    })
  },
  view(params) { // 在线显示文件
    return commonServiceUrl + this.baseUrl + '/view/'
  },
  delete(params) { // 删除文件
    return commonService({
      method: 'delete',
      url: this.baseUrl + "/" + params,
    })
  }
}

const ftpFileController = {
  baseUrl: "/common/ftpFile",
  upload(data) { //  文件上传接口
    return commonService({
      method: 'post',
      url: this.baseUrl + '/upload',
      data: data
    })
  },
  view(params) { // 在线显示文件
    return commonServiceUrl + this.baseUrl + '/view?contractUrl='
  },
  delete(params) { // 删除文件
    return commonService({
      method: 'delete',
      url: this.baseUrl + '/delete?contractUrl='+ params
    })
  }
}

export {
  fileController,
  ftpFileController
}
