<template>
  <div>
    <template v-if="selectType === 'radio'">
      <el-radio-group
        v-model="text"
        :disabled="disabled"
        @change="handleChange"
      >
        <el-radio
          v-for="item in dataSource"
          :key="item.dictId"
          :label="item[valueField]"
        >
          {{ item.dictName }}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="selectType === 'select'">
      <el-select
        v-model="text"
        :size="size"
        :filterable="filterable"
        :multiple="multiple"
        :placeholder="placeholder"
        @change="handleChange"
        :disabled="disabled"
        :style="{ width }"
        :clearable="clearable"
      >
        <el-option
          v-for="item in dataSource"
          :key="item.dictId"
          :label="item.dictName"
          :value="item[valueField]"
        >
        </el-option>
      </el-select>
    </template>

    <template v-if="selectType === 'cascader'">
      <el-cascader
        :style="{ width }"
        v-model="text"
        v-loading="dictLoading"
        :options="dataSource"
        :clearable="clearable"
        :show-all-levels="showAllLevels"
        :filterable="filterable"
        :multiple="multiple"
        :disabled="disabled"
        :placeholder="placeholder"
        :props="cascaderProps"
        :collapse-tags="collapseTags"
        @change="handleChange"
      >
      </el-cascader>
    </template>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "GlbDictSelect",
  props: {
    url: {
      type: String,
      required: true,
    },
    http: {
      type: Object,
      required: true,
    },
    value: {
      type: [String, Array],
    },
    /*
      选择模式:
      可选值： ['selct', 'radio', 'cascader']
      */
    selectType: {
      type: String,
      default: "select",
    },
    /*字典类型code*/
    dictTypeCode: {
      type: String,
      required: true,
    },
    /*以什么字段作为选择的值*/
    valueField: {
      type: String,
      default: "dictCode",
    },
    /*是否禁用*/
    disabled: {
      type: Boolean,
      default: false,
    },
    /*宽度*/
    width: {
      type: String,
      default: "100%",
    },
    /*大小*/
    size: {
      type: String,
      default: "—",
    },
    /*多选*/
    multiple: {
      type: Boolean,
      default: false,
    },
    /*可清除*/
    clearable: {
      type: Boolean,
      default: false,
    },
    /*可搜索*/
    filterable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    /*级联框自己菜单触发方式*/
    expandTrigger: {
      type: String,
      default: "hover",
    },
    /*级联框输入框中是否显示选中值的完整路径*/
    showAllLevels: {
      type: Boolean,
      default: false,
    },
    /*在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值*/
    emitPath: {
      type: Boolean,
      default: false,
    },
    /*折叠展示所有已选中的选项的Tag*/
    collapseTags: {
      type: Boolean,
      default: false,
    },
    /*是否严格的遵守父子节点不互相关联, 开启选择任意一级选项*/
    checkStrictly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: this.value,
      dataSource: [],
      cascaderProps: {},
      dictLoading: false,
    };
  },
  created() {
    this.cascaderProps = {
      value: this.valueField,
      label: "dictName",
      expandTrigger: this.expandTrigger,
      multiple: this.multiple,
      emitPath: this.emitPath,
      checkStrictly: this.checkStrictly,
    };
    this.findDict();
  },
  watch: {
    value(curVal, oldVal) {
      this.text = curVal;
    },
    dictTypeCode(curVal, oldVal) {
      this.findDict();
    },
    text(curVal, oldVal) {
      this.$emit("input", curVal);
    },
  },
  methods: {
    //根据字典类型code获取字典列表
    findDict() {
      this.dictLoading = true;
      let params = {
        dictTypeCode: this.dictTypeCode,
        statusFlag: 1,
      };
      http.post(this.url, params).then((res) => {
        this.dataSource = res.data;
        this.deepRemoveEmptyChildren(this.dataSource);
        this.dictLoading = false;
      });
    },
    //当字典变化时
    handleChange(val) {
      this.$emit("input", val);
      if (this.selectType !== "cascader") {
        if (this.multiple) {
          let multipleObjList = [];
          val.forEach((item) => {
            this.dataSource.forEach((item2) => {
              if (item === item2[this.valueField]) {
                multipleObjList.push(item2);
              }
            });
          });
          this.$emit("on-change", val, multipleObjList, this.dataSource);
        } else {
          let valObj = this.dataSource.find(
            (item) => item[this.valueField] === val
          );
          this.$emit("on-change", val, valObj, this.dataSource);
        }
      } else {
        this.$emit("on-change", val, this.dataSource);
      }
    },
    //deep遍历 去掉 空的children
    deepRemoveEmptyChildren(array = []) {
      array.forEach((item) => {
        if (_.isArray(item.children)) {
          if (item.children.length === 0) {
            delete item.children;
          } else {
            this.deepRemoveEmptyChildren(item.children);
          }
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
