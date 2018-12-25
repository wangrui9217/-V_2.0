import axios from 'axios'
import { Message } from 'element-ui'
import { baseURL } from '@/config'
import router from './router'
import { dev } from '../config/index'
import { Loading } from 'element-ui'

var myAxios = axios.create({
  baseURL: baseURL
})

// 超时时间
myAxios.defaults.timeout = 30000
// http请求拦截器
myAxios.interceptors.request.use(config => {
  if (config.showLoading) {
    // loadFuc.showFullScreenLoading()
   }
  config.headers['X-UserToken'] = localStorage.getItem('userAccessToken')
  return config
}, error => {
  Message.error({
    message: '加载超时'
  })

  return Promise.reject(error)
})
// http响应拦截器
myAxios.interceptors.response.use(res => {
  if (res.config.showLoading) {
    // loadFuc.tryHideFullScreenLoading()
   }
  if (res.status === 200) {
    return res
  }
}, error => {
  // loadFuc.tryHideFullScreenLoading()
  try {
    if (error.response.status === 400) {
      Message.error({
        message: error.response.data.errors[0] ? error.response.data.message : error.response.data.errors[0].defaultMessage
      })
    } else if (error.response.status === 403) {
      // router.replace({
      //   path: '/login'
      // })
    } else if (error.response.status === 500) {
      Message.error({
        message: '服务端异常'
      })
    }
    return error.response;
  } catch (e) {
    console.log('token过期', e)
    // router.replace({
    //   path: '/login'
    // })
  }
  loadFuc.tryHideFullScreenLoading()
  return Promise.reject(error)
})

let loadFuc = {
  loading: "",
  startLoading: function(){
    this.loading = Loading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
     })
  },
  endLoading: function(){
    this.loading.close()
  },
  needLoadingRequestCount: 0,
  showFullScreenLoading: function(){
    if (this.needLoadingRequestCount === 0) {
      this.startLoading()
     }
     this.needLoadingRequestCount++
  },
  tryHideFullScreenLoading: function(){

    if (this.needLoadingRequestCount <= 0) {
      return
    }
    this.needLoadingRequestCount--
    if (this.needLoadingRequestCount === 0) {
      this.endLoading()
    }
  }
}

const commonService = function (obj) {
  return myAxios({
    method: obj.method,
    url: 'common-service' + obj.url,
    params: obj.params,
    data: obj.data,
    showLoading: obj.showLoading ===false ? false : true
  })
}

const sydService = function (obj) {
  return myAxios({
    method: obj.method,
    url: 'syd-service' + obj.url,
    params: obj.params,
    data: obj.data,
    showLoading: obj.showLoading ===false ? false : true
  })
}
const wfServiceUrl =  baseURL + '/wf-service/wf';
const commonServiceUrl = baseURL + '/common-service';

export { commonService, commonServiceUrl, sydService,wfServiceUrl}
