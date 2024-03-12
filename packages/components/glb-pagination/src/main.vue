<template>
  <div>
    <el-pagination
      :background="false"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="currentPageNo"
      :page-size="currentPageSize"
      layout="total,sizes,slot,prev"
      :total="total"
    >
      <el-button
        :disabled="firstPageBtnDisabled"
        class="first-pager"
        @click="toFirstPage"
        >首页</el-button
      >
    </el-pagination>
    <el-pagination
      :background="false"
      @current-change="handleCurrentChange"
      :current-page="currentPageNo"
      :page-size="currentPageSize"
      layout="pager,next,slot,jumper"
      :total="total"
    >
      <el-button
        :disabled="lastPageBtnDisabled"
        class="last-pager"
        @click="toLastPage"
        >末页</el-button
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "GlbPagination",
  data() {
    return {
      currentPageNo: this.pageNo,
      currentPageSize: this.pageSize,
      firstPageBtnDisabled: true,
      lastPageBtnDisabled: false,
      lastPageNum: Math.ceil(this.total / this.pageSize),
    };
  },
  props: {
    pageNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    total(newVal, oldVal) {
      this.total = newVal;
      this.lastPageNum = Math.ceil(newVal / this.currentPageSize);
    },
  },
  created() {},
  methods: {
    handleCurrentChange(val) {
      this.firstPageBtnDisabled = val === 1 ? true : false;
      this.lastPageBtnDisabled = val === this.lastPageNum ? true : false;
      this.currentPageNo = val;
      this.$emit("changePageNo", val);
    },
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.$emit("changePageSize", val);
    },
    toFirstPage(val) {
      this.handleCurrentChange(1);
    },
    toLastPage(val) {
      this.currentPageNo = this.lastPageNum;
      this.handleCurrentChange(this.lastPageNum);
    },
  },
};
</script>

<style scoped lang="scss">
.el-pagination {
  float: left;
}
</style>
