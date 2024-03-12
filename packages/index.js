import './directives/index' //引入自定义指令

import GlbBreadcrumb from './components/glb-breadcrumb/src/main'
import GlbDictSelect from './components/glb-dict-select/src/main'
import GlbHeader from './components/glb-header/src/main'
import GlbLeftMenu from './components/glb-left-menu/src/main'
import GlbLogin from './components/glb-login/src/main'
import GlbImgUpload from "./components/glb-img-upload/src/main";
// import GlbFileUpload from "./components/glb-file-upload/src/main";
import GlbOperateButton from "./components/glb-operate-button/src/main";
import GlbRichedit from "./components/glb-richedit/src/main";
import GlbPagination from "./components/glb-pagination/src/main";
import GlbSpliter from "./components/glb-spliter/src/main";


//数组结构保存组件，用于遍历注册
const components = [
  GlbBreadcrumb,
  GlbDictSelect,
  GlbHeader,
  GlbLeftMenu,
  GlbLogin,
  GlbImgUpload,
  GlbOperateButton,
  GlbRichedit,
  GlbPagination,
  GlbSpliter,
]

const install = function(Vue, opts = {}) {
  //判断是否安装过
  if (install.installed) return
  install.installed = true

  // 遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })

}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}