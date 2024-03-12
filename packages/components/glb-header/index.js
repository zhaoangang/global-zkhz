import GlbHeader from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbHeader.install = function (Vue) {
  Vue.component(GlbHeader.name, GlbHeader)
}

export default GlbHeader
