
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VDistpicker from 'v-distpicker'
import store from './store/'
import './permission' // permission control
//import JSEncrypt from '@/util/jsencrypt'
//import VueQuillEditor from 'vue-quill-editor'

import VueClipboard from 'vue-clipboard2'
import Components from './util/install'
Vue.use(Components)
Vue.use(VueClipboard)

import {formatDate} from './util/date'
Vue.prototype.$formatDate = formatDate

import DictService from './util/dict'
Vue.prototype.$dict = DictService
// Vue.use(DictService.getAll)

import Rules from './util/rules'
Vue.prototype.$rules = Rules

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import 'animate.css'

import './scss/public.scss'
import './assets/newcss/common.css'
import eventBus from './util/event-bus.js'
Vue.component('v-distpicker', VDistpicker)
Vue.use(ElementUI)
//Vue.use(VueQuillEditor)
Vue.config.productionTip = false
//Vue.prototype.$JSEncrypt = new JSEncrypt()
//Vue.prototype.PublicKey ='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPfoCRJo068xVcIhYnigpb4sxMjSKlkXVZIgl0vTdkdda+Qu8n4VxiLv6P8mHPi9WLZENJQd4kSM6gvSMpm2PtkNRY7aLceTrroPd6tAjKxsa8hvClAFy97OEcpOzi+WqxL8ERSeZ62Rai3fVjIbMP4b1tXaPiUxoPGgdJ74/l/QIDAQAB'
Vue.prototype.$bus = eventBus

/* eslint-disable no-new */
var vm =new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
