<template>
  <div style="overflow: hidden; height: 100%">
    <div
      class="shrink-wrap hg-100-percent"
      :style="{
        'margin-left': -(gutter / 2) + 'px',
        'margin-right': -(gutter / 2) + 'px',
      }"
    >
      <div
        v-for="(item, index) in spanList"
        :key="index"
        class="shrink-relative hg-100-percent"
        v-show="!item.hidden"
        :style="{
          width: (item.span / 24).toFixed(2) * 100 + '%',
          'overflow-x: ': 'hidden',
          'padding-left': item.span ? gutter / 2 + 'px' : 0,
          'padding-right': item.span ? gutter / 2 + 'px' : 0,
        }"
      >
        <div class="shrink-relative-slot hg-100-percent">
          <div
            class="shrink-icon"
            v-if="index !== 0"
            @click="shrinkHandle(index)"
          >
            <i
              class="el-icon-caret-right"
              v-show="!isShowShrinkIcon(index)"
            ></i>
            <i class="el-icon-caret-left" v-show="isShowShrinkIcon(index)"></i>
          </div>
          <slot :name="item.slot"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlbSpliter",
  props: {
    /*每个布局间的间隔距离*/
    gutter: {
      type: Number,
      default: 0,
    },
    /*需要布局的数组*/
    spanList: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
      validator: function (value) {
        // 各项span值必须是大于等于0、小于等于24的整数，并且总和不得超过24
        let validateValue = true;
        value.forEach((item) => {
          if (
            Math.floor(item.span) !== item.span ||
            item.span < 0 ||
            item.span > 24
          ) {
            validateValue = false;
            console.error(new Error("spanList不符合规范！"));
          }
        });
        if (
          value.map((item) => item.span).reduce((total, num) => total + num) >
          24
        ) {
          validateValue = false;
          console.error(new Error("spanList不符合规范！"));
        }
        return validateValue;
      },
    },
  },
  data() {
    return {
      colList: [],
    };
  },
  created() {},
  methods: {
    //判断显示左收缩icon还是右收缩icon
    isShowShrinkIcon(index) {
      return this.spanList[index - 1].span;
    },
    //收缩事件
    shrinkHandle(index) {
      let span = this.spanList[index - 1].span;
      if (span) {
        this.colList.push({ index: index - 1, span });
        this.spanList[index - 1].span = 0;
        this.spanList[index].span += span;
      } else {
        this.colList.forEach((item, colIndex) => {
          if (item.index === index - 1) {
            this.spanList[index - 1].span = item.span;
            this.spanList[index].span -= item.span;
            this.colList.splice(colIndex, 1);
          }
        });
      }
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped lang="scss">
.shrink-wrap {
  display: flex;
  box-sizing: border-box;
}
.shrink-relative {
  transition: all 1.5s;
  box-sizing: border-box;
  white-space: nowrap;
  .shrink-relative-slot {
    position: relative;
    white-space: normal;
    .shrink-icon {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 40px;
      border: 1px solid #dcdfe6;
      border-left: none;
      border-radius: 0 5px 5px 0;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
      /*color: #606266;*/
      color: var(--mainThemeColor);
      transition: all 1s;
    }
    .shrink-icon:hover {
      background-color: var(--mainThemeColor);
      color: #ffffff;
    }
  }
}
</style>
