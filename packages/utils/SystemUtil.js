/**
 *
 * 系统工具类
 *
 *
 * */
import _ from 'lodash'
export default {

  convertMenus(menuArr, parentPath = '') {
    menuArr.forEach(item => {
      item.code = parentPath.concat(filterUrl(item.code))
      if (item.children.length !== 0) {
        this.convertMenus(item.children, item.code)
      }
    })

    function filterUrl(url) {
      if (!url) {
        return ""
      }
      if (url && !url.startsWith("/")) {
        url = "/".concat(url)
      }
      return url
    }
    return menuArr
  },

  findMenuByPath(menu, menuArr) {
    let result = {}
    findMenuTagByPath(menu, menuArr)

    function findMenuTagByPath(menuItem, menus) {
      menus.forEach(item => {
        if (item.code === menuItem.code) {
          result = item
        }
        if (item.children.length !== 0) {
          findMenuTagByPath(menuItem, item.children)
        }
      })
    }
    return result
  },

  //扁平数据转树形数据  list代表需要转换的数据，id代表每一条的id键值名称，parentId代表父级id键值名称，topNodeIdenty表示顶级节点的标识内容
  flatTurnTree(list, id, parentId, topNodeIdenty = -1) {
    let temp = {}
    let ans = []
    for (let i in list) {
      temp[list[i][id]] = list[i]
    }
    for (let i in temp) {
      if (temp[i][parentId] != topNodeIdenty && temp[i][id]) {
        // if (!temp[temp[i][parentId]]) {
        //   console.log(temp[i])
        // } //查看问题数据
        if (!temp[temp[i][parentId]].children) {
          temp[temp[i][parentId]].children = new Array()
        }
        temp[temp[i][parentId]].children.push(temp[i])
      } else {
        ans.push(temp[i])
      }
    }
    if (ans.length !== 0 && !_.isArray(ans[0].children)) {
      ans[0].children = []
    }
    return ans
  },



  ramdomStrKey(length) {
    let password = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
      "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D",
      "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
      "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ]
    let result = ""
    for (let i = 0; i < length; i++) {
      result += password[Math.floor(Math.random() * password.length)]
    }
    return result
  },

  //获取表格数据源 其中http代表api接口类, data代表请求接口参数，path代表请求路径
  getTableListData(http, data, path) {
    return new Promise(async (resolve, reject) => {
      let tableListData = await http[path](data)
      let dataList = tableListData.data.rows
      let pageNo = tableListData.data.pageNo
      let pageSize = tableListData.data.pageSize
      let total = tableListData.data.totalRows
      resolve({
        dataList,
        pageNo,
        pageSize,
        total
      })
    })
  },

  /**
   * 根据身份证号得到出生日期和性别
   */
  getBirth(idCard) {
    var birthday = "";
    if (idCard != null && idCard != "") {
      if (idCard.length == 15) {
        birthday = "19" + idCard.slice(6, 12);
      } else if (idCard.length == 18) {
        birthday = idCard.slice(6, 14);
      }
      birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
      //通过正则表达式来指定输出格式为:1990-01-01
    }
    return birthday;
  },

  getSex(idCard) {
    var sexStr = '';
    if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
      sexStr = 'SEX_M';
    } else {
      sexStr = 'SEX_F';
    }
    return sexStr;
  },
  isAssetTypeAnImage(ext) {
    return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff', 'ico'].indexOf(ext.toLowerCase()) !== -1
  },

  uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "_";
    let uuid = s.join("");
    return uuid;
  },

  cloneDeep(data) {
    return _.cloneDeep(data);
  }
}
