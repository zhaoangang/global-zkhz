let Base64 = require("js-base64").Base64;
import crypto from "crypto";
import JsEncrypt from "jsencrypt";
const DEFAULT_PUBLISH_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgg0K7kYWmGD4nrsCEq0WhtHzo/gJkapHMrqKolASnNuTPEOI5j0h4tgZ89A2ljnl3Q6Qh9+MHqefl1Q1p0a3eYscTod47YieLMpp0404m04JzlHJSryO6kOU11FseDkxQGJc3LqBDmKdb/YuV4cAszXMuOo8WZjo54935B1ohgQIDAQAB"
export default {

  /**
   * @description: 对字符串进行base64加密
   * @param {param:要加密的变量}
   * @return:
   */
  setBase64(param) {
    return Base64.encode(param);
  },

  /**
   * @description: 对url进行base64加密
   * @param {param:要加密的变量}
   * @return:
   */
  setBase64URI(param) {
    return Base64.encodeURI(param);
  },

  /**
   * @description: base64解密
   * @param {param:要加密的变量}
   * @return:
   */
  getBase64(param) {
    return Base64.decode(param);
  },

  /**
   * @description: md5加密字符串
   * @param {param:要加密的变量}
   * @return: 加密后的字符串
   */
  md5Str(param) {
    const hash = crypto.createHash("md5");
    hash.update(param);
    return hash.digest("hex").toUpperCase();
  },

  /**
   * @description: 按照指定排序，md5加密字符串
   * @param {param: 要加密的对象,sort: 排序方法}
   * @return: 加密后的字符串
   */
  md5Obj(param, sort) {
    var keys = Object.keys(param).sort(sort);
    //遍历排序后的参数数组中的每一个简单的key/value对（value值不是对象、未定义、null）
    let str = "";
    keys.forEach(function(item) {
      keys.forEach(function(item) {
        if (
          typeof param[item] != "object" &&
          typeof param[item] != "undefined" &&
          param[item] != null
        ) {
          str = str + item + "=" + param[item] + "&";
        }
      });
    });

    //通过md5算法为签名字符串生成一个md5签名，该签名就是我们要追加的sign参数值
    return this.md5Str(str);
  },

  /**
   * @description: sha1加密字符串
   * @param {param:要加密的字符串}
   * @return:
   */
  sha1Str(param) {
    const hash = crypto.createHash("sha1");
    hash.update(param);
    return hash.digest("hex").toUpperCase();
  },

  /**
   * @description: 按照指定排序，md5加密字符串
   * @param {param: 要加密的对象,sort: 排序方法}
   * @return: 加密后的字符串
   */
  sha1Obj(param, sort) {
    var keys = Object.keys(param).sort(sort);
    //遍历排序后的参数数组中的每一个key/value对
    let str = "";
    keys.forEach(function(item) {
      if (
        typeof param[item] != "object" &&
        typeof param[item] != "undefined" &&
        param[item] != null
      ) {
        str = str + item + "=" + param[item] + "&";
      }
    });

    //通过md5算法为签名字符串生成一个md5签名，该签名就是我们要追加的sign参数值
    let result = this.sha1Str(str);
    // console.log(result);
    return result;
  },

  /**
   * @description: rsa加密
   * @param {params: 简单类型的加密参数, publicKey: 公钥}
   * @return: 加密后的字符串
   */

  setRsa(params, publicKey) {
    let encrypt = new JsEncrypt();
    if (!publicKey) {
      encrypt.setPublicKey(DEFAULT_PUBLISH_KEY);
    } else {
      encrypt.setPublicKey(publicKey);
    }
    return encrypt.encrypt(params);
  }
}