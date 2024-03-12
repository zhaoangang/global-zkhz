import Vue from 'vue'
import rightMenu from './right-menu'
import _ from 'lodash'

let rightMenuConstructor = Vue.extend(rightMenu)
let instance = null

let rightMenuFunc = function (options = {}) {
  if (!instance) {
    instance = new rightMenuConstructor({
      el: document.createElement('div')
    })
  }
  //判断右键菜单所占区域是否超出窗口可视范围
  let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
  let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  let rightMenuTop = options.rightMenuTop > (clientHeight - 220) ? '' : options.rightMenuTop
  let rightMenuLeft = options.rightMenuLeft > (clientWidth - 170) ? '' : options.rightMenuLeft
  let rightMenuBottom = options.rightMenuTop > (clientHeight - 220) ? (clientHeight - options.rightMenuTop) : ''
  let rightMenuRight = options.rightMenuLeft > (clientWidth - 170) ? (clientWidth - options.rightMenuLeft) : ''
  instance.rightMenuTop = rightMenuTop ? (rightMenuTop + 'px') : ''
  instance.rightMenuLeft = rightMenuLeft ? (rightMenuLeft + 'px') : ''
  instance.rightMenuBottom = rightMenuBottom ? (rightMenuBottom + 'px') : ''
  instance.rightMenuRight = rightMenuRight ? (rightMenuRight + 'px') : ''
  instance.rightMenuList = options.rightMenuList
  instance.visible = true
  document.body.appendChild(instance.$el)
}

Vue.directive('cbdRightClick', {
  bind(el, binding, vnode, oldVnode) {
    el.oncontextmenu = function (e) {
      /*指令 传入数据说明
       * binding.value 应该传入一个数组，数组里的每个元素为对象
       * 对象有三个参数：
       * 1，label：菜单label的名称；
       * 2，method：传入点击右键菜单每个label的事件；
       * 3，arguments：每个method调用时使用的参数；
       * 4，hidden: 当前选项是否显示隐藏, 默认不隐藏
       * */
      if (binding.value && _.isArray(binding.value)) {
        console.error(new Error('v-cbd-right-click指令传入的参数类型应该为数组！'))
        return false
      }
      // 鼠标点的坐标
      const oX = e.clientX
      const oY = e.clientY
      rightMenuFunc({
        rightMenuTop: oY,
        rightMenuLeft: oX,
        rightMenuList: binding.value
      })
      return false
    }
  }
})
