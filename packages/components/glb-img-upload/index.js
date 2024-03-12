import GlbImgUpload from './src/main'

// 为组件添加 install 方法，用于按需引入
GlbImgUpload.install = function(Vue) {
  Vue.component(GlbImgUpload.name, GlbImgUpload)
}

export default GlbImgUpload