<template>
  <!--右键菜单-->
  <div
    v-show="visible"
    :style="{
      'top': rightMenuTop,
      'left': rightMenuLeft,
      'bottom': rightMenuBottom,
      'right': rightMenuRight
    }"
    class="right-menu">
    <el-scrollbar class="right-menu-scrollbar">
      <ul>
        <li>
          <span
            v-for="item in rightMenuList"
            v-show="!item.hidden"
            @click="item.method(item.arguments)"
            :key="item.id">
            {{item.label}}
          </span>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "rightMenu",
    data() {
      return {
        visible: false,
        rightMenuTop: '',
        rightMenuLeft: '',
        rightMenuBottom: '',
        rightMenuRight: '',
        rightMenuList: [],
      }
    },
    mounted() {
      document.addEventListener('click', this.resetData, false)
    },
    methods: {
      resetData() {
        this.visible = false
        this.rightMenuTop = ''
        this.rightMenuLeft = ''
        this.rightMenuBottom = ''
        this.rightMenuRight = ''
        this.rightMenuList = []
      },
    },
  }
</script>

<style scoped lang="scss">
  // 右键菜单样式
  .right-menu {
    position: fixed;
    width: 166px;
    max-height: 215px;
    overflow: hidden;
    background-color: #f2f2f2;
    border: 1px solid #E4E7ED;
    border-radius: 5px;
    color: #606266;
    .right-menu-scrollbar{
      .is-horizontal{
        display: none;
      }
      /deep/ .el-scrollbar__view{
        max-height: 215px;
      }
    }
    ul {
      padding: 0;
      margin: 0;
      font-size: 16px;
      li {
        list-style: none;
        box-sizing: border-box;
        padding: 6px 0;
        border-bottom: 1px solid rgb(216, 216, 217);
        &:nth-child(1) {
          padding-top: 2px;
        }
        &:nth-last-child(1) {
          border-bottom: none;
        }
        span {
          display: block;
          height: 30px;
          line-height: 30px;
          padding-left: 16px;
          &:hover {
            background-color: #0070F5;
            cursor: pointer;
            color: #FFFFFF;
          }
        }
      }
    }
  }
</style>
