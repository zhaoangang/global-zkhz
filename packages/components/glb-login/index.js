import GlbLogin from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbLogin.install = function (Vue) {
  Vue.component(GlbLogin.name, GlbLogin)
}

export default GlbLogin
