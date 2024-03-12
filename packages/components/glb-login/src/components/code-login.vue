<template>
  <el-form
    class="login-form"
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    v-loading="isLoginLoading"
    label-width="0"
  >
    <!-- <el-form-item prop="phone">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model.trim="loginForm.phone"
        auto-complete="off"
        size="large"
        placeholder="请输入手机号"
      >
        <i slot="prefix" class="el-icon-phone"></i>
      </el-input>
    </el-form-item> -->
    <el-form-item prop="userPhone" class="phone-input">
      <el-select
        size="medium"
        filterable
        v-model="loginForm.userPhonePrefix"
        placeholder="请选择"
        popper-class="phone-area-code-select"
        class="phone-area-code"
      >
        <el-option
          v-for="item in areaCodeList"
          :key="item.id"
          :label="item.dictLabel"
          :value="item.id"
        >
          <span>+{{ item.dictCode }}</span> &nbsp;&nbsp;
          <span style="float: right">{{ item.dictName }}</span>
        </el-option>
      </el-select>
      <el-input
        @keyup.enter.native="handleRegister"
        v-model.trim="loginForm.userPhone"
        auto-complete="off"
        size="large"
        placeholder="请输入手机号"
        class="phone-input"
      >
        <i slot="prefix" class="el-icon-phone"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="smsVerifyCode" class="smsVerifyCode-input">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model.trim="loginForm.smsVerifyCode"
        size="large"
        auto-complete="off"
        placeholder="请输入验证码"
      >
        <i slot="prefix" class="el-icon-unlock"></i>
      </el-input>
      <el-button
        size="large"
        @click="handleSend"
        :class="[{ display: sendSmsFlag }]"
        >{{ msgText }}</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-row>
        <el-col :span="12">
          <el-button
            type="primary"
            @click="handleLogin"
            class="login-submit"
            :style="{
              background: `${icontitleLoginButton}`,
              borderColor: `${icontitleLoginButton}`,
            }"
            >登录
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            @click="handleRegister"
            class="login-submit"
            :style="{
              background: `${icontitleLoginButton}`,
              borderColor: `${icontitleLoginButton}`,
            }"
            >注册
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import AreaCodeMock from "../../../../mock/AreaCodeMock";
const MSGINIT = "发送验证码",
  MSGTIME = 60;
export default {
  name: "GlbCodeLogin",
  data() {
    const validateCode = (rule, value, callback) => {
      if (value.length != 6) {
        callback(new Error("请输入6位数的验证码"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      smsTimer: null,
      loginForm: {},
      loginRules: {
        userPhone: [
          { required: true, trigger: "blur", validator: validatePhone },
        ],
        smsVerifyCode: [
          { required: true, trigger: "blur", validator: validateCode },
        ],
      },
      areaCodeList: [],
    };
  },
  created() {
    this.buildAreaCode();
  },
  mounted() {},
  computed: {},
  props: {
    icontitleLoginButton: {
      type: String,
    },
    sendSmsFlag: {
      type: Boolean,
      default: false,
    },
    openRegister: {
      type: Boolean,
      default: false,
    },
    isLoginLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    buildAreaCode() {
      this.areaCodeList = AreaCodeMock.map((item) => {
        return {
          id: item.tel,
          dictName: item.name,
          dictCode: item.tel,
          dictLabel: "+".concat(item.tel),
        };
      });
      this.loginForm = { userPhonePrefix: this.areaCodeList[0].id };
    },
    handleSend() {
      this.$refs.loginForm.validateField(["userPhone"], (valid) => {
        if (valid) {
          this.$emit("sendSms", this.loginForm);
        }
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit("login", this.loginForm);
        }
      });
    },
    // 点击注册
    handleRegister() {
      this.$emit("register");
    },
  },
  destroyed() {
    if (this.smsTimer) {
      clearInterval(this.smsTimer);
    }
  },
  watch: {
    sendSmsFlag(val) {
      if (val) return;
      this.msgText = this.msgTime + "秒后重发";
      this.sendSmsFlag = true;
      this.smsTimer = setInterval(() => {
        this.msgTime--;
        this.msgText = this.msgTime + "秒后重发";
        if (this.msgTime == 0) {
          this.msgTime = 60;
          this.msgText = "发送验证码";
          this.sendSmsFlag = false;
          clearInterval(this.smsTimer);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form .el-input .el-input__prefix i {
  line-height: 2;
}

.login-submit {
  display: block;
  margin: 40px auto 0;
  width: 96%;
  height: 50px;
  font-size: 24px;
  letter-spacing: 12px;
  /*background: #264170;*/
  /*border-color: #264170;*/
  border: 0px solid;
}
.login-submit:hover {
  background: #264170;
}

.login-form {
  margin: 30px 0;
  .el-form-item__content {
    width: 100%;
    text-align: center;
  }
  .el-form-item {
    margin-bottom: 24px;
    .is-success {
      .el-input__inner {
        border-color: #dcdcdc;
      }
    }
    .el-input {
      line-height: 50px;
      /deep/ .el-input__inner {
        height: 50px;
      }
      input {
        text-indent: 5px;
        border-color: #dcdcdc;
        border-radius: 3px;
      }
      .el-input__prefix {
        i {
          padding: 0 5px;
          font-size: 16px !important;
        }
      }
    }
  }
  .smsVerifyCode-input {
    /deep/.el-form-item__content {
      display: flex;
      .el-input__inner {
        border-radius: 4px 0px 0px 4px;
      }
      .el-button {
        border-radius: 0px 4px 4px 0px;
        border-left: 0px;
      }
    }
  }

  .phone-input {
    /deep/.el-form-item__content {
      display: flex;
      .phone-area-code {
        width: 90px;
        height: 50px;

        .el-input {
          height: 100%;
          .el-input__inner {
            height: 100%;
            border-radius: 4px 0px 0px 4px;
            border-right: 0px;
          }
        }
      }
      .phone-input {
        width: calc(100% - 90px);
        .el-input__inner {
          border-radius: 0px 4px 4px 0px;
        }
      }
    }
  }
}
</style>
<style>
.phone-area-code-select .el-select-dropdown__item {
  width: 200px;
  padding: 0 10px;
}
</style>