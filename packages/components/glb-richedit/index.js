import GlbRichedit from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbRichedit.install = function(Vue) {
  Vue.component(GlbRichedit.name, GlbRichedit)
}

export default GlbRichedit