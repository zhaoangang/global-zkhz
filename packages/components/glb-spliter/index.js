import GlbSpliter from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbSpliter.install = function (Vue) {
  Vue.component(GlbSpliter.name, GlbSpliter)
}

export default GlbSpliter
