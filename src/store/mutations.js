import {
  SET_DICTDATA,
  COUNT_UNREAD,
  SET_DICTIONARY_DATA,
  SET_RESOURCE_DATA,
  SET_CUSTOMER_ID,
  SET_COMPANY_INFO,
  SET_TYPE
} from './mutation-type'
export default {
  [SET_DICTDATA] (state, obj) {
    state.depts = {...state.depts, ...obj}
  },
  [COUNT_UNREAD] (state, num) {
    state.countUnread = num
  },
  [SET_DICTIONARY_DATA] (state, array) {
    state.dictionary = array
    console.log(state, '字典表')
  },
  [SET_RESOURCE_DATA] (state, array) {
    state.resource = array
    // console.log(state, '资源表')
  },
  [SET_CUSTOMER_ID] (state, ID) {
    state.customerId = ID
    // console.log(state.customerId, 'customerId')
  },
  [SET_COMPANY_INFO] (state, obj) {
    state.companyInfo = obj
  },
  [SET_TYPE] (state, flag) {
    state.type = flag
  }
}
