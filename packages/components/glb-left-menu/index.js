import GlbLeftMenu from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbLeftMenu.install = function (Vue) {
  Vue.component(GlbLeftMenu.name, GlbLeftMenu)
}

export default GlbLeftMenu
