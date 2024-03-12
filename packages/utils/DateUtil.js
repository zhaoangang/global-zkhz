/**
 *
 * 日期格式化工具类
 *
 *
 * */

const DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm:ss';

export default {

  parse(date) {
    return new Date(date);
  },

  format(date, fmt) {
    if (!fmt) {
      fmt = DEFAULT_FORMAT;
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        let time = ('00' + str).substr(str.length);
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : time);
      }
    }
    return fmt;
  },


  /**
   * 返回指定长度的月份集合
   *
   * @param {time} 时间
   * @param {len} 长度
   * @param {direction} 方向： 1: 前几个月; 2: 后几个月; 3:前后几个月 默认 3
   * @return {Array} 数组
   *
   * @example  getMonths('2018-1-29', 6, 1) // -> ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
   */
  getMonths(time, len, direction) {
    var mm = new Date(time).getMonth(),
      yy = new Date(time).getFullYear(),
      direction = isNaN(direction) ? 3 : direction,
      index = mm;
    var cutMonth = function (index) {
      if (index <= len && index >= -len) {
        return direction === 1 ? formatPre(index).concat(cutMonth(++index)) :
          direction === 2 ? formatNext(index).concat(cutMonth(++index)) : formatCurr(index).concat(cutMonth(++index))
      }
      return []
    }
    var formatNext = function (i) {
      var y = Math.floor(i / 12),
        m = i % 12
      return [yy + y + '-' + (m + 1)]
    }
    var formatPre = function (i) {
      var y = Math.ceil(i / 12),
        m = i % 12
      m = m === 0 ? 12 : m
      return [yy - y + '-' + (13 - m)]
    }
    var formatCurr = function (i) {
      var y = Math.floor(i / 12),
        yNext = Math.ceil(i / 12),
        m = i % 12,
        mNext = m === 0 ? 12 : m
      return [yy - yNext + '-' + (13 - mNext), yy + y + '-' + (m + 1)]
    }
    // 数组去重
    var unique = function (arr) {
      if (Array.hasOwnProperty('from')) {
        return Array.from(new Set(arr));
      } else {
        var n = {},
          r = [];
        for (var i = 0; i < arr.length; i++) {
          if (!n[arr[i]]) {
            n[arr[i]] = true;
            r.push(arr[i]);
          }
        }
        return r;
      }
    }
    return direction !== 3 ? cutMonth(index) : unique(cutMonth(index).sort(function (t1, t2) {
      return new Date(t1).getTime() - new Date(t2).getTime()
    }))
  },

  /**
   * 返回指定长度的天数集合
   *
   * @param {time} 时间
   * @param {len} 长度
   * @param {direction} 方向： 1: 前几天; 2: 后几天; 3:前后几天 默认 3
   * @return {Array} 数组
   *
   * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
   */
  getDays(time, len, diretion) {
    var tt = new Date(time)
    var getDay = function (day) {
      var t = new Date(time)
      t.setDate(t.getDate() + day)
      var m = t.getMonth() + 1
      return t.getFullYear() + '-' + m + '-' + t.getDate()
    }
    var arr = []
    if (diretion === 1) {
      for (var i = 1; i <= len; i++) {
        arr.unshift(getDay(-i))
      }
    } else if (diretion === 2) {
      for (var i = 1; i <= len; i++) {
        arr.push(getDay(i))
      }
    } else {
      for (var i = 1; i <= len; i++) {
        arr.unshift(getDay(-i))
      }
      arr.push(tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate())
      for (var i = 1; i <= len; i++) {
        arr.push(getDay(i))
      }
    }
    return diretion === 1 ? arr.concat([tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()]) :
      diretion === 2 ? [tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()].concat(arr) : arr
  },

  /*获取某月有多少天*/
  getMonthOfDay(time) {
    var date = new Date(time)
    var year = date.getFullYear()
    var mouth = date.getMonth() + 1
    var days

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth == 2) {
      days = year % 4 == 0 ? 29 : 28
    } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
      //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
      days = 31
    } else {
      //其他月份，天数为：30.
      days = 30
    }
    return days
  },

  /*获取某年有多少天*/
  getYearOfDay(time) {
    var firstDayYear = this.getFirstDayOfYear(time);
    var lastDayYear = this.getLastDayOfYear(time);
    var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) / 1000;
    return Math.ceil(numSecond / (24 * 3600));
  },

  /*获取某年的第一天*/
  getFirstDayOfYear(time) {
    var year = new Date(time).getFullYear();
    return year + "-01-01 00:00:00";
  },

  /*获取某年最后一天*/
  getLastDayOfYear(time) {
    var year = new Date(time).getFullYear();
    var dateString = year + "-12-01 00:00:00";
    var endDay = this.getMonthOfDay(dateString);
    return year + "-12-" + endDay + " 23:59:59";
  },

  /*获取某个日期是当年中的第几天*/
  getDayOfYear(time) {
    var firstDayYear = this.getFirstDayOfYear(time);
    var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime()) / 1000;
    return Math.ceil(numSecond / (24 * 3600));
  },

  /*获取某个日期在这一年的第几周*/
  getDayOfYearWeek(time) {
    var numdays = this.getDayOfYear(time);
    return Math.ceil(numdays / 7);
  },

  /*获取当前是星期几*/
  getWeekDate() {
    let day = new Date().getDay()
    let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")
    let week = weeks[day]
    return week
  },

  /**
   * 获取农历第几天 
   * @param {number} param
   * @returns {number}
   */
  getLunarDay() {
    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = "甲乙丙丁戊己庚辛壬癸";
    var dzString = "子丑寅卯辰巳午未申酉戌亥";
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";
    var weekString = "日一二三四五六";
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
      return (m >> n) & 1;
    }

    function e2c() {
      TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      var total, m, n, k;
      var isEnd = false;
      var tmp = TheDate.getYear();
      if (tmp < 1900) {
        tmp += 1900;
      }
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

      if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0;; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
            isEnd = true;
            break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    }

    function GetcDateString() {
      var tmp = "";
      tmp += tgString.charAt((cYear - 4) % 10);
      tmp += dzString.charAt((cYear - 4) % 12);
      tmp += "(";
      tmp += sx.charAt((cYear - 4) % 12);
      tmp += ")年 ";
      if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += "月";
      tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
      if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) {
      //solarYear = solarYear<1900?(1900+solarYear):solarYear;
      if (solarYear < 1921) {
        return "";
      } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
      }
    }

    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    var ww = D.getDay();
    var ss = parseInt(D.getTime() / 1000);
    if (yy < 100) yy = "19" + yy;
    return GetLunarDay(yy, mm, dd)
  },

  calcDate(date1, date2) {
    var date3 = date2 - date1;

    var days = Math.floor(date3 / (24 * 3600 * 1000))

    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))

    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))

    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(date3 / 1000)
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }

}
