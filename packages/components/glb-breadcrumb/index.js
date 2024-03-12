import GlbBreadcrumb from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbBreadcrumb.install = function(Vue) {
  Vue.component(GlbBreadcrumb.name, GlbBreadcrumb)
}

export default GlbBreadcrumb