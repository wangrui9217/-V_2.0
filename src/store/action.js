import { deptController } from '@/controller/common/dept_controller'
import { roleController } from '@/controller/common/role_controller'
import { messageController } from '@/controller/common/message_controller'
import { dictionaryController } from '@/controller/common/dictionary_controller'
import { resourceController } from '@/controller/syd/resource_controller'
import { areaController } from '@/controller/common/area_controller'
import {COUNT_UNREAD, SET_DICTDATA, SET_DICTIONARY_DATA,SET_RESOURCE_DATA} from './mutation-type'
export default {
  getAll ({ commit }) {
    // 部门枚举数据
    deptController.select().then(res => {
      if (res.status === 200) {
        commit(SET_DICTDATA, {'Depts': res.data})
      }
    })
    // 角色枚举数据
    roleController.select().then(res => {
      if (res.status === 200) {
        commit(SET_DICTDATA, {'Roles': res.data})
      }
    })
    // 获取字典
    dictionaryController.queryAll().then(res => {
      if (res.status === 200) {
        commit(SET_DICTIONARY_DATA, res.data)
      }
    })
    //获取资料数据
    resourceController.queryAll({parentId: 0}).then(res => {
      if (res.status === 200) {
        commit(SET_RESOURCE_DATA, res.data)
      }
    })
    // 获取所有地区
    areaController.queryAll().then(res => {
      commit(SET_DICTDATA, {'Areas': res.data})
      let city = res.data.filter(val => val.parentid === '-1')
      city.map(province => {
        province.children = res.data.filter(val => val.parentid === province.id.toString())
      })
      city.map(province => {
        province.children.map(city => {
          city.children = res.data.filter(val => val.parentid === city.id.toString())
        })
      })
      commit(SET_DICTDATA, {'Area': city})
    })
  },
  // 获取未读站内信数目
  getCountUnread ({ commit }) {
    messageController.countUnread().then(res => {
      if (res.status === 200) {
        commit(COUNT_UNREAD, res.data)
      }
    })
  }
}
