/**
 *
 * 对象类型工具类
 *
 *
 * */

export default {
  isEmpty(obj) {
    //为null 或者 undefined
    if (!obj) {
      return true;
    }

    // 为 {}
    if (obj == {}) {
      return true;
    }

    // 为 []
    if (obj == []) {
      return true;
    }

    return false;
  },

  isString(o) {
    //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === "String";
  },
  isNumber(o) {
    //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === "Number";
  },
  isObjject(o) {
    //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === "Object";
  },
  isArray(o) {
    //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === "Array";
  },
  isDate(o) {
    //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === "Date";
  },
  isBoolean(o) {
    //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
  },
  isFunction(o) {
    //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === "Function";
  },
  isNull(o) {
    //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === "Null";
  },
  isUndefined(o) {
    //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
  }
}
