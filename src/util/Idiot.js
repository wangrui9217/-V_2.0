import { deptController } from '@/controller/common/dept_controller'
import { roleController } from '@/controller/common/role_controller'
import { messageController } from '@/controller/common/message_controller'
import { dictionaryController } from '@/controller/common/dictionary_controller'
import { resourceController } from '@/controller/syd/resource_controller'
import { areaController } from '@/controller/common/area_controller'
const setLocalstorage = (obj) => {
  const temp1 = JSON.parse(localStorage.getItem('depts'))
  const temp2 = JSON.stringify({...temp1, ...obj})
  localStorage.setItem('depts', temp2)
}
const getObj = (key) => {
  return JSON.parse(localStorage.getItem(key) || '')
}
export default {
  getAll () {
    // 部门枚举数据
    deptController.select().then(res => {
      if (res.status === 200) {
        setLocalstorage({'Depts': res.data})
      }
    })
    // 角色枚举数据
    roleController.select().then(res => {
      if (res.status === 200) {
        setLocalstorage({'Roles': res.data})
      }
    })
    // 获取字典
    dictionaryController.queryAll().then(res => {
      if (res.status === 200) {
        localStorage.setItem('dictionary', JSON.stringify(res.data))
      }
    })
    // 获取资源数据
    resourceController.queryAll().then(res => {
      if (res.status === 200) {
        localStorage.setItem('resource', JSON.stringify(res.data))
      }
    })
    // 获取所有地区
    areaController.queryAll().then(res => {
      setLocalstorage({'Areas': res.data})
      let city = res.data.filter(val => val.parentid === '-1')
      city.map(province => {
        province.children = res.data.filter(val => val.parentid === province.id.toString())
      })
      city.map(province => {
        province.children.map(city => {
          city.children = res.data.filter(val => val.parentid === city.id.toString())
        })
      })
      setLocalstorage({'Area': city})
    })
  },
  findDictData (key) {
    return getObj('depts')[key] || []
  },
  findDictionary (key) {
    return getObj('dictionary').filter(val => val.code === key)
  },
  findResource (key) {
    return getObj('resource').filter(val => val.parentId === key)
  },
  findAreaName (id) {
    const area = getObj('depts').Areas || []
    const temp = area.find(val => val.id === id)
    return temp ? temp.name : ''
  },
  findDictionaryName (id) {
    let temp = getObj('dictionary').find(val => val.id == id)
    return temp ? temp.value : ''
  },
  findResourceName (id) {
    let temp = getObj('resource').find(val => val.id == id)
    return temp ? temp.value : ''
  }
}
