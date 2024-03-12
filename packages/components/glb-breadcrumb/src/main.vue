<template>
  <div class="wrap-tags">
    <!-- tag盒子 -->
    <div class="tags-box">
      <div class="tags-list">
        <div
          class="tag-item"
          :class="{ 'is-active': nowTagValue == item.value }"
          v-for="(item, index) in selectedTags"
          :key="index"
          @click="openUrl(item)"
        >
          <span class="tag-text" :class="{ 'no-close': !item.close }">{{
            item.label
          }}</span>
          <i
            class="el-icon-close tag-close"
            @click.stop="closeTag(item)"
            v-if="item.close"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GlbBreadcrumb",
  data() {
    return {
      visible: false,
      lock: false,
      currTag: {},
      selectedTags: [],
      homeTag: {
        label: "首页",
        value: "/home",
        close: false,
      },
    };
  },
  created() {
    this.selectedTags.push(this.homeTag);
    this.addTagList(this.$route);
  },
  mounted() {},

  computed: {
    nowTagValue: function () {
      return this.$route.path;
    },
  },
  methods: {
    openUrl(item) {
      if (item.value === this.$route.path) return;
      this.$router.push({
        path: item.value,
        query: item.query,
      });
    },
    closeTag(item) {
      this.$router.push(this.homeTag.value);
    },
    //若是进入不同于当前页的路由，向selectedTags添加对应参数
    addTagList(data) {
      if (data.path !== this.homeTag.value) {
        let value = data.path;
        let label = data.matched.map((item) => item.meta.title).join(" > ");
        let close = true;
        this.selectedTags.push({ value, label, close });
      }
    },
  },
  watch: {
    $route(to) {
      this.selectedTags = [this.homeTag];
      if (to.path !== this.homeTag.value) {
        this.addTagList(to);
      }
    },
  },
};
</script>
<style lang="scss">
.wrap-tags {
  width: 100%;
  height: 40px;
  position: relative;
  box-sizing: border-box;
  .tags-box {
    width: 100%;
    height: 40px;
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid #499ddb;
  }
  .tags-list {
    position: absolute;
    padding: 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
  }
  .tag-item {
    position: relative;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin: 2px 4px 2px 0;
    padding: 0 10px;
    border-radius: 3px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
    background: #fff;
  }
  .tag-text {
    margin-left: 8px;
  }
  .no-close {
    margin-right: 8px;
  }
  .tag-close {
    margin-left: 8px;
  }
  .tag-item:hover {
    opacity: 0.85;
  }
  .contextmenu {
    left: 0px;
    top: 0px;
  }
}

//选中的面包屑背景
.tag-item.is-active {
  background-color: var(--mainThemeColor) !important;
  color: #ffffff;
}

//导航栏线背景
.tags-box {
  border-bottom: 1px solid var(--mainThemeColor) !important;
}

//导航操作按钮背景
.nav-tags {
  background-color: var(--mainThemeColor) !important;
  border-color: var(--mainThemeColor) !important;
}
</style>
