// import idiot from './Idiot'
// import store from './../store'
// const DictService = {
//   getAll () {
//     idiot.getAll()
//   },
//   /**
//    * 获取字典数据
//    * @param codes
//    */
//   getDictData (key) {
//     return idiot.findDictData(key)
//   },
//   findDictData (key) {
//     return idiot.findDictionary(key)
//   },
//   findAreaName (key) {
//     return idiot.findAreaName(key)
//   },
//   findDictionaryName (key) {
//     return idiot.findDictionaryName(key)
//   },
//   getProcessState () {
//     return [
//       {'code':'PASS','label':'通过'},
//       {'code':'REFUSE','label':'拒绝'},
//       {'code':'BACK','label':'回退'}
//       // {'code':'HANG_UP','label':'挂起'}
//     ]
//   }
// }
// export default DictService
import store from '../store/index'
const approveList = [{'code': 'PASS', 'label': '通过', value: '1'}, {'code': 'REFUSE', 'label': '拒绝', value: '2'}, {'code': 'BACK', 'label': '驳回', value: '3'}]
const status = [{name: '删除', value: 'DEL'}, {name: '停用', value: 'STP'}, {name: '正常', value: 'NOL'}]
const DictService = {
  getAll () {
    store.dispatch('getAll')
    store.dispatch('getCountUnread')
  },
  /**
   * 获取字典数据
   * @param codes
   */
  getDictData (key) {
    return store.getters.findDictData(key)
  },
  findDictData (key) {
    return store.getters.findDictionary(key)
  },
  findResData (key) {
    return store.getters.findResource(key)
  },
  findAreaName (key) {
    return store.getters.findAreaName(key)
  },
  findDictionaryName (key) {
    return store.getters.findDictionaryName(key)
  },
  findResourceName (key) {
    return store.getters.findResourceName(key)
  },
  findDictionaryId (code, name) {
    return store.getters.findDictionaryId(code, name)
  },
  // 提交审核状态
  getProcessState () {
    return approveList
  },
  getApproveState (value) {
    let temp = approveList.find(val => String(val.value) === String(value))
    return temp.label
  },
  getStatusName (id) {
    if (id) {
      let temp = status.find(val => val.value === id)
      return temp ? temp.name : ''
    }
  }
}
export default DictService
