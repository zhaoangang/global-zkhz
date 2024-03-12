<template>
  <el-aside :width="isCollapse ? '64px' : '250px'" class="aside-menu">
    <div
      class="collapse-icon"
      :style="{ left: isCollapse ? '74px' : '260px' }"
      @click="isCollapse = !isCollapse"
    >
      <i
        class="el-icon-s-unfold"
        :style="{ color: `${platIconTitleData.menuCollapseButtonColor}` }"
        v-show="isCollapse"
      ></i>
      <i
        class="el-icon-s-fold"
        :style="{ color: `${platIconTitleData.menuCollapseButtonColor}` }"
        v-show="!isCollapse"
      ></i>
    </div>
    <!-- 系统logo -->
    <div class="aside-logo" :style="{ padding: isCollapse ? '' : '0 10px' }">
      <img :src="asideLogoUrl + platIconTitleData.icontitleDoorLogo" />
      <div
        class="aside-title"
        :style="{ color: `${platIconTitleData.icontitleDoorTitleColor}` }"
        v-if="!isCollapse"
      >
        {{ platIconTitleData.icontitleDoorTitle }}
      </div>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        v-loading="menuLoading"
        :default-active="activeId"
        mode="vertical"
        :show-timeout="200"
        text-color="#fff"
        unique-opened
        :collapse="isCollapse"
        active-text-color="#fff"
        class="menu-wrap"
      >
        <menu-item :menus="menus" :collapse="isCollapse"></menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import _ from "lodash";

export default {
  name: "GlbLeftMenu",
  components: {
    MenuItem: () => import("./components/menu-item"),
  },
  data() {
    return {
      activeId: "",
      isCollapse: false,
    };
  },
  props: {
    platIconTitleData: {
      type: Object,
      default: {},
    },
    asideLogoUrl: {
      type: String,
      default: `${process.env.VUE_APP_SERVER_CODE}sysFileInfo/pubdownload?fileId=`,
    },
    menus: {
      type: Array,
      default() {
        return [];
      },
    },
    menuLoading: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  mounted() {
    this.searchFormWidth();
    //监听浏览器窗口事件 防抖
    window.onresize = _.debounce(() => {
      if (!this.timer) {
        this.timer = true;
        setTimeout(() => {
          this.searchFormWidth();
          this.timer = false;
        }, 400);
      }
    }, 500);
  },
  watch: {
    $route(to) {
      this.activeId = "";
      this.deepRecursionFindPath(this.menus, to.path);
    },
  },
  methods: {
    //深度遍历找出当前路由对应的左侧树节点
    deepRecursionFindPath(menus = [], path) {
      menus.forEach((item) => {
        if (item.menuRouterUrl === path) {
          this.activeId = item.menuId;
        } else {
          if (_.isArray(item.children) && !_.isEmpty(item.children)) {
            this.deepRecursionFindPath(item.children, path);
          }
        }
      });
    },
    //获取当前窗口宽度
    searchFormWidth() {
      let w = window.innerWidth;
      if (w <= 1200) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.aside-logo {
  width: 100%;
  height: 60px;
  background-color: #008df7;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  img {
    width: 54px;
    height: 54px;
    margin: 0 auto;
    object-fit: contain;
  }
  .aside-title {
    width: 100%;
    height: 100%;
    line-height: 60px;
    padding-left: 10px;
    box-sizing: border-box;
    display: inline-block;
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    text-align: justify;
  }
  .aside-title:after {
    content: "";
    width: 100%;
    display: inline-block;
  }
}

.menu-wrap {
  min-height: calc(100vh - 60px);
  background-color: #ffffff;
}

.collapse-icon {
  font-size: 26px;
  width: 16px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  z-index: 1;
  background: transparent;
  position: fixed;
  top: 10px;
  box-sizing: border-box;
  cursor: pointer;
  color: var(--mainThemeColor);
  transition: all 0.3s;
  color: #ffffff;
}

/*隐藏文字*/
/deep/ .el-menu--collapse .el-submenu__title span {
  display: none;
}

/*隐藏 > */
/deep/ .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
<style lang="scss">
.aside-menu {
  overflow: hidden !important;
  transition: all 0.3s;

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
    height: calc(100vh - 60px) !important;
    background-color: #ffffff !important;
    margin-bottom: 0 !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .is-horizontal {
    display: none;
  }
}

//logo背景
.aside-logo {
  background-color: var(--secondThemeColor) !important;
}

//菜单hover背景
.el-submenu__title:hover,
.el-menu-item:hover {
  background-color: var(--mainThemeColor) !important;
  color: white !important;
  i {
    color: white !important;
  }
}

//菜单选中字体颜色,选中背景
.el-menu-item.is-active {
  background-color: var(--mainThemeColor) !important;
  color: white !important;
  .el-submenu__title {
    color: white !important;
    i {
      color: white !important;
    }
  }
}

.submenu-title .is-active {
  color: white !important;
  .el-submenu__title {
    color: white !important;
    i {
      color: white !important;
    }
  }
}

//菜单字体颜色
.el-submenu__title {
  color: var(--fourThemeColor) !important;
  i {
    color: var(--fourThemeColor) !important;
  }
}

.el-menu-item {
  color: var(--fourThemeColor) !important;
}

//菜单选中背景颜色
.submenu-title .is-active {
  background-color: var(--mainThemeColor) !important;
}
</style>
