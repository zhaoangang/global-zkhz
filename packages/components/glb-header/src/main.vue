<template>
  <el-header class="header-wrap">
    <div class="header-left">
      <slot name="left"></slot>
    </div>
    <div class="header-right">
      <!--      公司-->
      <div v-if="showCompany" class="header-info-box">
        <el-dropdown
          @command="switchCompany"
          trigger="click"
          v-if="companys.length !== 0"
          class="switch-dropdown"
        >
          <div class="topTag">
            {{ loginCompany.companyName }}
            <i
              class="el-icon-arrow-down el-icon--right"
              style="font-size: 14px"
            ></i>
          </div>
          <el-dropdown-menu
            v-show="companys.length !== 0"
            slot="dropdown"
            style="border: 0px"
          >
            <el-dropdown-item
              :command="item.companyId"
              v-for="(item, index) in companys"
              :key="index"
            >
              {{ item.companyName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="topTag" v-if="companys.length === 0">
          {{
            loginCompany.companyName ? loginCompany.companyName : "无公司信息"
          }}
        </div>
      </div>
      <div v-if="showCompany">|</div>
      <!--      部门-->
      <div v-if="showDept" class="header-info-box">
        <el-dropdown
          @command="switchDept"
          trigger="click"
          v-if="depts.length !== 0"
          class="switch-dropdown"
        >
          <div class="topTag">
            {{ loginDept.deptName }}
            <i
              class="el-icon-arrow-down el-icon--right"
              style="font-size: 14px"
            ></i>
          </div>
          <el-dropdown-menu
            v-show="depts.length !== 0"
            slot="dropdown"
            style="border: 0px"
          >
            <el-dropdown-item
              :command="item.deptId"
              v-for="item in depts"
              :key="item.deptId"
            >
              {{ item.deptName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="topTag" v-if="depts.length === 0">
          {{ loginDept.deptName ? loginDept.deptName : "无部门信息" }}
        </div>
      </div>
      <div v-if="showDept">|</div>
      <div class="header-info-box">
        <div class="topTag">{{ user.userFullNameCn }}</div>
      </div>
      <div>|</div>
      <div class="logout-icon">
        <i class="el-icon-switch-button" @click="logout"></i>
      </div>
    </div>
  </el-header>
</template>

<script>
import _ from "lodash";
export default {
  name: "GlbHeader",
  props: {
    clientId: {
      type: String,
      default: process.env.VUE_APP_SSO_ID,
    },
    loginRouteUrl: {
      type: String,
      default: "/login",
    },
  },
  data() {
    return {};
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    showCompany: {
      type: Boolean,
      default: true,
    },
    companys: {
      type: Array,
      required: true,
    },
    loginCompany: {
      type: Object,
      required: true,
    },
    showDept: {
      type: Boolean,
      default: true,
    },
    depts: {
      type: Array,
      required: true,
    },
    loginDept: {
      type: Object,
      required: true,
    },
  },
  created() {},
  methods: {
    //切换部门
    switchDept(deptId) {
      this.$emit("switchDept", deptId);
    },
    //切换公司
    switchCompany(companyId) {
      this.$emit("switchCompany", companyId);
    },
    //退出
    logout() {
      this.$confirm("确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("logout");
        })
        .catch(() => {
          this.$message.info("已取消退出！");
        });
    },
  },
};
</script>

<style scoped lang="scss">
.header-wrap {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  background-color: #0270c1;
  color: #ffffff;
  .header-right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 49%;
  }
  .header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 49%;
    div {
      margin: 0 5px;
      font-size: 14px;
    }
    .logout-icon {
      i {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .header-info-box {
      display: flex;
      align-items: center;
      div {
        height: 36px;
        line-height: 36px;
        border-radius: 5px;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .switch-dropdown {
        padding: 0;
        margin: 0;
        color: white;
      }
    }
  }
}
</style>
<style lang="scss">
//顶部信息栏样式
.header-wrap {
  background-color: var(--mainThemeColor) !important;
}
//顶部信息tag
.topTag {
  background-color: var(--threeThemeColor) !important;
  cursor: pointer;
}
</style>
