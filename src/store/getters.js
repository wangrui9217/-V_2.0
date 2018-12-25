export default {
  findDictData: (state, getters) => (key) => {
    return state.depts[key] || []
  },
  findDictionary: (state, getters) => (key) => {
    return state.dictionary.filter(val => val.code === key)
  },
  findResource: (state, getters) => (key) => {
    return state.resource.filter(val => val.parentId === key)
  },
  findAreaName: (state, getters) => (id) => {
    const area = state.depts.Areas || []
    // console.log(area, 'area')
    const temp = area.find(val => String(val.id) === String(id))
    return temp ? temp.name : ''
  },
  findDictionaryName: (state, getters) => (id) => {
    let temp = state.dictionary.find(val => val.id == id)
    return temp ? temp.value : ''
  },
  findResourceName: (state, getters) => (id) => {
    let temp = state.resource.find(val => val.id == id)
    return temp ? temp.value : ''
  },
  // 根据code和name返回id
  // 根据code和name返回value
  findDictionaryId: (state, getters) => (code, name) => {
    if (code && String(name)) {
      let temp = state.dictionary.filter(val => String(val.code) === String(code))
      let ID = temp.find(value => String(value.name) === String(name))
      return ID ? ID.value : ''
    } else {
      return ''
    }
  }
}
