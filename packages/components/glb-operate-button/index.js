import GlbOperateButton from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
GlbOperateButton.install = function(Vue) {
  Vue.component(GlbOperateButton.name, GlbOperateButton)
}

export default GlbOperateButton