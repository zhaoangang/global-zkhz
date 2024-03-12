import GlbDictSelect from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbDictSelect.install = function(Vue) {
  Vue.component(GlbDictSelect.name, GlbDictSelect)
}

export default GlbDictSelect