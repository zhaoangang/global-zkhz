import Vue from 'vue'

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialog-drag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    /*看是否有传参设置的默认高度*/
    if (binding.value && binding.value.height) {
      dragDom.style.height = binding.value.height
    }
    if (binding.value && binding.value.isFullscreen) {
      dragDom.style.left = 0;
      dragDom.style.top = 0;
      dragDom.style.height = "95%";
      dragDom.style.width = "97.5%";
      dragDom.style.maxHeight = "100%";
      dragDom.style.maxWidth = "100%";
      dragDom.style.margin = 0;
      dragDom.style.marginTop = '2.5vh';
      dragDom.style.marginBottom = '2.5vh';
      dragDom.style.marginRight = '2.5vh';
      dragDom.style.marginLeft = '2.5vh';
    } else {
      dragDom.style.marginTop = '5vh'
    }
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    const header = dragDom.querySelector('.el-dialog__header')
    header.style.position = 'relative'
    let fa = document.createElement('div')
    fa.style.border = '3px solid #fff'
    fa.style.width = '10px'
    fa.style.height = '10px'
    fa.setAttribute('class', 'fullscreenIcon')
    header.appendChild(fa)
    const fullscreen = dragDom.querySelector('.fullscreenIcon')
    let isFullScreen = false
    let nowHight = 0
    let nowWidth = 0
    let nowMarginTop = 0
    if (!(binding.value && binding.value.isFullscreen)) {
      fullscreen.onclick = () => {
        if (isFullScreen == false) {
          nowHight = dragDom.clientHeight;
          nowWidth = dragDom.clientWidth;
          nowMarginTop = dragDom.style.marginTop;
          dragDom.style.left = 0;
          dragDom.style.top = 0;
          dragDom.style.height = "100%";
          dragDom.style.width = "100%";
          dragDom.style.maxHeight = "100%";
          dragDom.style.maxWidth = "100%";
          dragDom.style.margin = 0;
          isFullScreen = true;
          header.style.cursor = 'initial';
        } else {
          dragDom.style.height = "auto";
          dragDom.style.width = nowWidth + 'px';
          dragDom.style.maxHeight = 'calc(100% - 70px)';
          dragDom.style.maxWidth = 'calc(100% - 30px)';
          dragDom.style.margin = '5vh auto';
          isFullScreen = false;
          header.style.cursor = 'move';
        }
      }
      //双击头部效果
      dialogHeaderEl.ondblclick = (e) => {
        if (isFullScreen == false) {
          nowHight = dragDom.clientHeight;
          nowWidth = dragDom.clientWidth;
          nowMarginTop = dragDom.style.marginTop;
          dragDom.style.left = 0;
          dragDom.style.top = 0;
          dragDom.style.height = "100%";
          dragDom.style.width = "100%";
          dragDom.style.maxHeight = "100%";
          dragDom.style.maxWidth = "100%";
          dragDom.style.margin = 0;
          isFullScreen = true;
          dialogHeaderEl.style.cursor = 'initial';
        } else {
          dragDom.style.height = "auto";
          dragDom.style.width = nowWidth + 'px';
          dragDom.style.maxHeight = 'calc(100% - 70px)';
          dragDom.style.maxWidth = 'calc(100% - 30px)';
          dragDom.style.margin = '5vh auto';
          isFullScreen = false;
          dialogHeaderEl.style.cursor = 'move';
        }
      }
    }
  }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
  bind(el, binding, vnode, oldVnode) {
    const dragDom = binding.value.$el.querySelector('.el-dialog')

    el.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - el.offsetLeft

      document.onmousemove = function (e) {
        e.preventDefault() // 移动时禁用默认事件

        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        dragDom.style.width = `${l}px`
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
