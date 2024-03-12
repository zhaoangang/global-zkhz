<template>
  <div v-loading="loading">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :action="uploadUrl"
      :headers="{ Authorization: token }"
      name="file"
      :data="fileData"
      :show-file-list="false"
      :disabled="isDetail"
      :on-success="handleAvatarSuccess"
      :on-progress="handleLoading"
      :on-error="handleError"
      :before-upload="beforeAvatarUpload"
    >
      <el-image
        v-if="secretFlag && imageFileId"
        :src="pubPreviewUrl + '?fileId=' + imageFileId + '&token=' + token"
        :fit="fit"
        :style="{ width, height }"
        class="avatar"
      >
      </el-image>
      <el-image
        v-if="!secretFlag && imageFileId"
        :src="pubPreviewUrl + '?fileId=' + imageFileId + '&token=' + token"
        :fit="fit"
        :style="{ width, height }"
        class="avatar"
      >
      </el-image>
      <div class="delete-curtain" v-if="imageFileId && !isDetail">
        <i class="el-icon-delete operate-icon" @click.stop="deleteImg"></i>
      </div>
      <i
        v-if="!imageFileId"
        class="avatar-uploader-icon"
        :style="{ width, height }"
      >
        <span>{{ isDetail ? "暂无图片" : imgInfo }}</span>
      </i>
    </el-upload>
  </div>
</template>

<script>
import StorageUtil from "../../../utils/StorageUtil";
export default {
  name: "GlbImgUpload",
  data() {
    return {
      proxyUrl: process.env.VUE_APP_SERVER_CODE,
      token: "",
      loading: false,
      imageFileId: this.value,
      fileData: {
        secretFlag: this.secretFlag ? "Y" : "N",
        appCode: "",
      },
    };
  },
  props: {
    value: {
      type: String,
    },
    /*是否只展示图片*/
    isDetail: {
      type: Boolean,
      default: false,
    },
    //图片如何适应到容器框
    fit: {
      type: String,
    },
    // 最大文件大小
    maxUploadSize: {
      type: Number,
      default: 100,
      // 100 * 1024 * 1024 => 100M
    },
    /*
     * 是否为机密文件
     * */
    secretFlag: {
      type: Boolean,
      default: false,
    },
    /*当前项目应用的appCode*/
    appCode: {
      type: String,
    },
    /*上传时提示信息*/
    imgInfo: {
      type: String,
      default: "上传图片",
    },
    /*宽度*/
    width: {
      type: String,
      default: "100px",
    },
    /*高度度*/
    height: {
      type: String,
      default: "100px",
    },
    /*宽度*/
    uploadUrl: {
      type: String,
      default: "",
    },
    pubPreviewUrl: {
      type: String,
      default: "",
    },
  },
  watch: {
    value(curVal, oldVal) {
      this.imageFileId = curVal;
    },
  },
  created() {
    this.token = StorageUtil.getSessionStorage("token");
  },
  methods: {
    //上传成功后
    handleAvatarSuccess(res, file) {
      this.loading = false;
      this.imageFileId = res.data.fileId;
      this.$emit("input", res.data.fileId);
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isMaxSize =
        this.maxUploadSize && this.maxUploadSize > file.size / 1024 / 1024;
      if (!isJPG) {
        this.$message.error("上传的图片只能是 JPG/JPEG/PNG 格式!");
        return false;
      }
      if (!isMaxSize) {
        this.$message.error(`文件大小不能超过${this.maxUploadSize}M`);
        return false;
      }
    },
    //上传过程中
    handleLoading(event, file, fileList) {
      this.loading = true;
    },
    //上传失败
    handleError(file, fileList) {
      this.loading = false;
      this.$message.error("上传失败！");
    },
    //删除图片
    deleteImg() {
      this.imageFileId = "";
      this.$emit("input", "");
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ .avatar-uploader {
  .el-upload {
    position: relative;
  }
  .el-upload:hover {
    .delete-curtain {
      opacity: 1;
    }
  }
}

.avatar-uploader-icon {
  color: #8c939d;
  text-align: center;
  font-style: normal;
  font-size: 18px;
  border: 1px dashed #7f7f7f;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
  display: block;
}
.delete-curtain {
  transition: opacity 0.3s;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  text-align: center;
  cursor: default;
  .operate-icon {
    font-size: 16px;
    color: white;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>
