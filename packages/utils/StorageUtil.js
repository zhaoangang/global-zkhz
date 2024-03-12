let _ = require('lodash');
const DEFAULT_EXPIRE_TIME = 1000 * 60 * 60 * 24;
export default {
  /**
   * @description: 存储为localStorage
   * @param {key: 键名, value: 键值}
   * @return:
   */
  setLocalStorage: (key, value, expireTime) => {
    let curIime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
    let expTime = _.isNumber(expireTime) ? expireTime : DEFAULT_EXPIRE_TIME;
    let valueDate = JSON.stringify({
      val: value,
      timer: curIime,
      expireTime: expTime
    });
    try {
      localStorage.setItem(key, valueDate);
    } catch (e) {
      // 兼容性写法
      if (isQuotaExceeded(e)) {
        console.log(`Error: ${key}超出本地存储限制`);
        sessionStorage.clear();
      } else {
        console.log(`Error: ${key}保存到本地存储失败`);
      }
    }
  },

  /**
   * @description: 获取localStorage存储
   * @param {key: 键名}
   * @return:
   */
  getLocalStorage: (key) => {
    let vals = localStorage.getItem(key); // 获取本地存储的值
    if (vals) {
      let dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
      // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
      let isTimed = new Date().getTime() - dataObj.timer > dataObj.expireTime;
      if (isTimed) {
        console.log(`${key}存储已过期`);
        localStorage.removeItem(key);
        return null;
      } else {
        let newValue = dataObj.val;
        return newValue;
      }
    } else {
      return null;
    }
  },

  /**
   * @description: 移除localStorage存储
   * @param {key: 键名}
   * @return:
   */
  removeLocalStorage: (key) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  },

  /**
   * @description: 清空localStorage
   * @param {key: 键名}
   * @return:
   */
  clearLocalStorage: () => {
    localStorage.clear();
  },

  /**
   * @description: 存储为sessionStorage
   * @param {key: 键名, value: 键值}
   * @return:
   */
  setSessionStorage: (key, value, expireTime) => {
    let curIime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
    let expTime = _.isNumber(expireTime) ? expireTime : DEFAULT_EXPIRE_TIME;
    let valueDate = JSON.stringify({
      val: value,
      timer: curIime,
      expireTime: expTime
    });
    try {
      sessionStorage.setItem(key, valueDate);
    } catch (e) {
      // 兼容性写法
      if (isQuotaExceeded(e)) {
        console.log(`Error: ${key}超出本地存储限制`);
        sessionStorage.clear();
      } else {
        console.log(`Error: ${key}保存到本地存储失败`);
      }
    }
  },

  /**
   * @description: 获取sessionStorage存储
   * @param {key: 键名}
   * @return:
   */
  getSessionStorage: (key) => {
    let vals = sessionStorage.getItem(key); // 获取本地存储的值
    if (vals) {
      let dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
      // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
      let isTimed = new Date().getTime() - dataObj.timer > dataObj.expireTime;
      if (isTimed) {
        console.log('存储已过期');
        sessionStorage.removeItem(key);
        return null;
      } else {
        let newValue = dataObj.val;
        return newValue;
      }
    } else {
      return null;
    }
  },

  /**
   * @description: 移除SessionStorage存储
   * @param {key: 键名}
   * @return:
   */
  removeSessionStorage: (key) => {
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
    }
  },

  /**
   * @description: 清空sessionStorage
   * @param {key: 键名}
   * @return:
   */
  clearSessionStorage: () => {
    sessionStorage.clear();
  }
};
/**
 * @description: 判断异常是否为超过浏览器存储大小限制
 * @param {type}
 * @return:
 */
function isQuotaExceeded(e) {
  let quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014: // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // IE8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}
