import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  depts: {}, // 当前页面枚举类型
  countUnread: null, // 未读信息个数
  dictionary: [],
  resource: [],
  customerId: '',
  companyInfo: '',
  type: ''
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
