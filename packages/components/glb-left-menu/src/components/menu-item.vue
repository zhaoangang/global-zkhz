<template>
  <div>
    <template v-for="item in menus">
      <el-menu-item
        :key="item.menuId"
        v-if="item.children.length === 0"
        :index="item.menuId"
        @click="open(item)"
      >
        <i
          class="iconfont icon-font-size"
          :class="item.menuNoActiveIcon"
          style="margin-right: 5px"
        >
        </i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
      <el-submenu
        :key="item.menuId"
        v-if="item.children.length !== 0"
        :index="item.menuId"
      >
        <template slot="title">
          <i
            class="iconfont icon-font-size"
            :class="item.menuNoActiveIcon"
            style="margin-right: 5px"
          >
          </i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
        <template v-for="child in item.children">
          <el-menu-item
            :key="child.menuId"
            :index="child.menuId"
            @click="open(child)"
            v-if="child.children.length === 0"
          >
            <span slot="title">{{ child.menuName }}</span>
          </el-menu-item>
          <menu-item :key="child.menuId" v-else :menus="[child]"></menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  data() {
    return {};
  },
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
    collapse: {
      type: Boolean,
    },
  },
  created() {},
  methods: {
    open(item) {
      this.$router.push({
        path: item.menuRouterUrl,
      });
    },
  },
};
</script>
<style scoped lang="scss">
//菜单字体
/deep/ .el-submenu__title {
  font-size: 18px;
}
/deep/ .el-menu-item {
  font-size: 18px;
}
.icon-font-size {
  font-size: 22px;
}
</style>

