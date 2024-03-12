import GlbPagination from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbPagination.install = function(Vue) {
  Vue.component(GlbPagination.name, GlbPagination)
}

export default GlbPagination