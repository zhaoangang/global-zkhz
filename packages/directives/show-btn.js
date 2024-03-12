import Vue from 'vue'
import StorageUtil from "../utils/StorageUtil"
Vue.directive('show-btn', {
  bind(el, binding, vnode, oldVnode) {
    let btnList = []
    if (StorageUtil.getSessionStorage('userInfo') && StorageUtil.getSessionStorage('userInfo').buttonCodes) {
      btnList = StorageUtil.getSessionStorage('userInfo').buttonCodes
    }
    let isShowBtn = btnList.includes(binding.value)
    el.style.display = isShowBtn ? 'block' : 'none'
  }
})
