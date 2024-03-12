<template>
  <el-form
    class="login-form"
    :rules="loginRules"
    ref="loginFormRef"
    :model="loginForm"
    label-width="0"
    v-loading="isLoginLoading"
  >
    <el-form-item prop="username">
      <el-input
        @keyup.enter.native="handleLogin"
        v-model.trim="loginForm.username"
        auto-complete="off"
        size="large"
        placeholder="请输入用户名"
      >
        <i slot="prefix" class="el-icon-user-solid"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model.trim="loginForm.password"
        size="large"
        auto-complete="off"
        placeholder="请输入密码"
      >
        <i slot="prefix" class="el-icon-unlock"></i>
        <i
          slot="suffix"
          class="el-icon-view el-input__icon"
          @click="showPassword"
        ></i>
      </el-input>
    </el-form-item>
    <el-form-item v-if="openRegister">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-button
            type="primary"
            @click="handleLogin"
            class="login-submit"
            :style="{
              background: `${icontitleLoginButton}`,
              borderColor: `${icontitleLoginButton}`,
            }"
            >登录</el-button
          >
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
            >注册</el-button
          >
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item v-else>
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="handleLogin"
            class="login-submit"
            :style="{
              background: `${icontitleLoginButton}`,
              borderColor: `${icontitleLoginButton}`,
            }"
            >登录</el-button
          >
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "GlbUserLogin",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      passwordType: "password",
    };
  },
  props: {
    icontitleLoginButton: {
      type: String,
    },
    isLoginLoading: {
      type: Boolean,
      default: false,
    },
    openRegister: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {
    showPassword() {
      this.passwordType = this.passwordType ? "" : "password";
    },
    //点击登录
    handleLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
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
};
</script>

<style lang="scss" scoped>
.login-form .el-input .el-input__prefix i {
  line-height: 2;
}

.login-submit {
  display: block;
  margin: 40px auto 0;
  width: 100%;
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
  .el-form-item.is-success {
    .el-input__inner {
      border-color: #dcdcdc;
    }
  }
}
</style>
