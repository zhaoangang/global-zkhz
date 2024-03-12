/**
 *
 * 生成指定mock数据
 *
 *
 * */

export default {

  /*生成指定范围的mock数据*/
  randomMock(objCon, start, end) {
    let result = [];
    for (let i = start + 1; i <= end; i++) {
      let objItem = {};
      objCon.forEach(item => {
        if (item.filedType == 'string') {
          objItem[item.filedId] = item.filedName + i;
        } else if (item.filedType == 'int') {
          objItem[item.filedId] = i;
        } else if (item.filedType == 'enum') {
          objItem[item.filedId] = item.enumItem[i % item.enumItem.length];
        }
      })
      result.push(objItem);
    }
    return result;
  }

}
