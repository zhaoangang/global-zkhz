<template>
  <el-dropdown @command="handleCommand">
    <div class="operate-icon">
      <i class="el-icon-more"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <template v-for="item in menuList">
        <el-dropdown-item
          v-show="!item.hidden"
          :command="{ method: item.method, arguments: item.arguments }"
        >
          {{ item.label }}
        </el-dropdown-item>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import _ from "lodash";
export default {
  name: "GlbOperateButton",
  props: {
    menuList: {
      /*
       * menuList为数组类型， 其每个元素为对象类型，每个对象有三个参数
       * 1，label: 下拉菜单按钮需要显示的名称;
       * 2, method: 点击下拉菜单每一项时调用的方法；
       * 3，arguments: 调用方法时传入的参数；
       * 4，hidden: 当前选项是否显示隐藏
       * */
      type: Array,
      required: true,
      default: [],
    },
  },
  methods: {
    handleCommand(val) {
      if (_.isFunction(val.method)) {
        val.method(val.arguments);
      } else {
        console.error(new Error(`method is not a function`));
      }
    },
  },
};
</script>

<style scoped>
.operate-icon {
  width: 32px;
  height: 32px;
  font-size: 16px;
  border-radius: 50%;
  transition: background-color 1s;
  line-height: 32px;
  cursor: pointer;
}
.operate-icon:hover {
  color: #ffffff;
  background-color: #909399;
}
</style>
