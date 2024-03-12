import StorageUtil from "./StorageUtil";
const STORAGE_TYPE_LOCAL = "local"; // 存储为localStorage
const STORAGE_TYPE_SESSION = "session"; // 存储为sessionStorage
const TOKEN_KEY = "token"; // token 存储在storage中的键名
export default {
  /**
   * @description: 存储token
   * @param {value: 键值, type: 存储类型, expireTime: 失效时间, }
   * @return:
   */
  setToken: (value, type, expireTime) => {
    if (type == STORAGE_TYPE_LOCAL) {
      StorageUtil.setLocalStorage(TOKEN_KEY, value, expireTime);
    } else {
      StorageUtil.setSessionStorage(TOKEN_KEY, value, expireTime);
    }
  },

  /**
   * @description: 获取localStorage存储
   * @param {type: 存储类型}
   * @return:
   */
  getToken: (type) => {
    if (type == STORAGE_TYPE_LOCAL) {
      return StorageUtil.getLocalStorage(TOKEN_KEY);
    } else {
      return StorageUtil.getSessionStorage(TOKEN_KEY);
    }
  },

  /**
   * @description: 移除localStorage存储
   * @param {type: 存储类型}
   * @return:
   */
  removeToken: (type) => {
    if (type == STORAGE_TYPE_LOCAL) {
      StorageUtil.removeLocalStorage(TOKEN_KEY);
    } else {
      StorageUtil.removeSessionStorage(TOKEN_KEY);
    }
  },
};
