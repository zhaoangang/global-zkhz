<template>
  <div class="login-main">
    <div
      class="main-left"
      :style="{
        backgroundImage: `url(${platIconTitleData.icontitleBackground})`,
      }"
    >
      <span class="left-title">{{ platIconTitleData.icontitleCompany }}</span>
      <div class="left-bottom-title">
        <div class="right-top-line"></div>
        <div class="right-projrct-name">
          {{ platIconTitleData.icontitlePlatCnname }}
        </div>
        <div class="right-projrct-english">
          {{ platIconTitleData.icontitlePlatEnname }}
        </div>
      </div>
    </div>

    <div class="main-right">
      <div class="right-top-logo">
        <img
          :style="{ width: `${platIconTitleData.icontitleLeftColor}%` }"
          :src="rightTopLogoUrl + platIconTitleData.icontitleCompanyLogo"
        />
      </div>
      <div
        class="right-title"
        :style="{ color: `${platIconTitleData.icontitleLoginColor}` }"
      >
        登录 | LOGIN
      </div>
      <div class="right-login-form">
        <el-tabs value="first" class="login-type">
          <el-tab-pane label="密码登录" name="first">
            <userLogin
              :icontitleLoginButton="platIconTitleData.icontitleLoginButton"
              :openRegister="openRegister"
              @register="handleRegister"
              @login="handlePwdLogin"
              :isLoginLoading="isLoginLoading"
            ></userLogin>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="second" v-if="openSmsLogin">
            <code-login
              :icontitleLoginButton="platIconTitleData.icontitleLoginButton"
              :openRegister="openRegister"
              @register="handleRegister"
              :sendSmsFlag="sendSmsFlag"
              @sendSms="handleSendSms"
              :isLoginLoading="isLoginLoading"
              @login="handleSmsLogin"
            ></code-login>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right-download-chrome" title="点击下载Google Chrome">
        <span>点击下载：</span>
        <img src="./imgs/google-chrome-logo.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlbLogin",
  components: {
    UserLogin: () => import("./components/user-login"),
    CodeLogin: () => import("./components/code-login"),
  },
  props: {
    platIconTitleData: {
      type: Object,
      default() {
        return {
          createTime: "2021-01-25 20:11:11.000",
          createAccountId: "1353676425401794562",
          updateTime: "2021-04-12 16:26:14.000",
          updateAccountId: "1353676425401794562",
          icontitleId: "1353676786111938561",
          icontitleName: "默认主题",
          icontitleCompany: "北京赛鼎",
          icontitlePlatCnname: "渐进式UI框架",
          icontitlePlatEnname: "Progressive UI Framework",
          icontitleBackground: "1381523989926539265",
          icontitleLeftColor: 35,
          icontitleCompanyLogo: "1381524001750282242",
          icontitleLoginColor: "rgba(210, 228, 16, 1)",
          icontitleLoginButton: "rgba(30, 88, 188, 1)",
          icontitleDoorTitle: "渐进式UI框架",
          icontitleDoorLogo: "1381524037989068802",
          icontitleIcon: "1381524014559686658",
          statusFlag: 1,
          icontitleNamePinyin: "mrzt",
          delFlag: "N",
          icontitleCompanyColor: null,
          icontitlePlatCnnameColor: null,
          icontitlePlatEnnameColor: null,
          stripeColor: null,
          loginWayColor: null,
          icontitleDoorTitleColor: null,
          menuCollapseButtonColor: null,
        };
      },
    },
    rightTopLogoUrl: {
      type: String,
      default: `${process.env.VUE_APP_SERVER_CODE}sysFileInfo/pubdownload?fileId=`,
    },
    openSmsLogin: {
      type: Boolean,
      default: false,
    },
    sendSmsFlag: {
      type: Boolean,
      default: false,
    },
    openRegister: {
      type: Boolean,
      default: false,
    },
    retisterPath: {
      type: String,
      default: "/register",
    },
    isLoginLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {
    if (this.platIconTitleData.icontitleIcon) {
      var link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = `${this.rightTopLogoUrl}${this.platIconTitleData.icontitleIcon}`;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  },
  methods: {
    // 点击注册
    handleRegister() {
      this.$router.push(this.retisterPath);
      this.$emit("register");
    },
    /**
     * 发送短信验证码
     * @param {number} param
     * @returns {number}
     */
    handleSendSms(formData) {
      this.$emit("sendSms", formData);
    },
    /**
     * 密码登录
     * @param {number} param
     * @returns {number}
     */
    handlePwdLogin(formData) {
      this.$emit("pwdLogin", formData);
    },
    /**
     * 短信登录
     * @param {number} param
     * @returns {number}
     */
    handleSmsLogin(formData) {
      this.$emit("smsLogin", formData);
    },
  },
};
</script>

<style scoped lang="scss">
.login-main {
  width: 100vw;
  height: 100vh;
  /*min-height: 768px;*/
  min-width: 1024px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .main-left {
    width: 70%;
    height: 100%;
    /*background: url("./imgs/loginPic.png") no-repeat;*/
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    .left-title {
      color: #ebeff2;
      font-weight: 600;
      font-size: 60px;
      position: relative;
      top: 50px;
      left: 50px;
    }
    .left-bottom-title {
      text-align: right;
      overflow: hidden;
      position: relative;
      right: 50px;
      bottom: 50px;
      .right-top-line {
        margin-left: auto;
        margin-right: 0;
        width: 160px;
        height: 5px;
        background-color: #ebeff2;
      }
      .right-projrct-name {
        font-size: 45px;
        color: #ebeff2;
        font-weight: 600;
        line-height: 1.5;
      }
      .right-projrct-english {
        font-size: 22px;
        color: #ebeff2;
      }
    }
  }
  .main-right {
    width: 30%;
    height: 100%;
    background-color: #fff;
    .right-top-logo {
      width: 100%;
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: block;
      }
    }
    .right-title {
      text-align: center;
      font-size: 30px;
      /*color: #264170;*/
      font-weight: 600;
      height: 60px;
      margin-bottom: 30px;
    }
    .right-login-form {
      width: 90%;
      margin: 0 auto;
      height: calc(70% - 120px);
      /deep/.el-tabs__nav {
        padding-bottom: 8px;
        width: 100%;
        .el-tabs__active-bar {
          height: 4px;
        }
        .el-tabs__item {
          width: 50%;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    .right-download-chrome {
      width: 230px;
      height: 22px;
      /*margin-left: auto;*/
      /*margin-right: 20px;*/
      margin: auto 20px 0px auto;
      position: absolute;
      bottom: 20px;
      right: 0px;
      img {
        width: 150px;
        height: 100%;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
}

@media screen and (max-width: 1093px) {
  .login-main .main-left .left-title {
    left: 0;
    top: 0;
  }
  .login-main .main-left .left-bottom-title {
    right: 0;
    bottom: 0;
  }
  .login-main .main-right .right-top-logo {
    height: 15%;
  }
  .login-main .main-right .right-title {
    margin-bottom: 0;
  }
  /deep/ .login-form .el-form-item {
    margin-bottom: 20px !important;
  }
}
</style>
