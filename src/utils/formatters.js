
import moment from "moment-jalaali";

const FA_ZERO_CODE = "۰".charCodeAt(0);
const EN_ZERO_CODE = "0".charCodeAt(0);

export const toPersianDigit = a =>
  a.toString().replace(/\d+/g, digit =>
    digit
      .split("")
      .map(d => d.charCodeAt(0))
      .map(d =>
        String.fromCharCode(
          d + (d < FA_ZERO_CODE ? FA_ZERO_CODE - EN_ZERO_CODE : 0)
        )
      )
      .join("")
  );

export const Currency = (value, decimal, separator) => {
  function formatMoney(number, c, d, t) {
    c = isNaN((c = Math.abs(c))) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;
    var s = number < 0 ? "-" : "";
    var i = String(
      parseInt((number = Math.abs(Number(number) || 0).toFixed(c)))
    );
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      s +
      (j ? i.substr(0, j) + t : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) +
      (c
        ? d +
          Math.abs(number - i)
            .toFixed(c)
            .slice(2)
        : "")
    );
  }

  // let safeSymbol = currencySymbol === undefined ? 'ریال' : currencySymbol
  let safeSeparator = separator === undefined ? "," : separator;
  return formatMoney(value, decimal || 0, ".", safeSeparator); //0 ---> 2
};
// + ' ' + safeSymbol

export const jalaaliMoment = (timeDate = "null") => {
  if (timeDate == null) return;
  return moment(timeDate, "YYYY-MM-DDTHH:mm:ss") //"2013-8-25 16:40:00"
    .format("jYYYY/jM/jD | HH:mm:ss"); // 1392/6/31 23:59:59
};

export const jalaaliMomentClock = (timeDate = "null") => {
    if (timeDate == null) return;
    return moment(timeDate, "YYYY-MM-DDTHH:mm:ss") //"2013-8-25 16:40:00"
      .format("jYYYY/jM/jD | HH:mm"); // 1392/6/31 23:59:59
  };

export const jalaaliMomentYear = (timeDate = "null") => {
  if (timeDate == null) return;
  return moment(timeDate, "YYYY-M-D") //"2013-8-25 16:40:00"
    .format("jYYYY/jM/jD"); // 1392/6/31 23:59:59
};

export const addComma = str => {
  str += "";
  var x = str.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "،" + "$2");
  }
  return x1 + x2;
};

export const reverseCodephone = phone =>
  phone
    .toString()
    .replace(/\s/, "")
    .replace(/\+98/, "0");

export const formatDate = date =>
  toPersianDigit(moment(date).format(" jYYYY/jMM/jDD | HH:mm  "));

export const formatDateJustDate = date =>
  toPersianDigit(moment(date).format(" jYYYY/jMM/jDD  "));

export const persianMonthDate = time => {
  let tmp = jalaaliMomentYear(time);
  let arr = tmp.split("/");
  let clock = jalaaliMomentClock(time);

  let m = arr[1];
  let month = "";
  switch (m) {
    case "1":
      month = "فروردین";
      break;
    case "2":
      month = "اردیبهشت";
      break;
    case "3":
      month = "خرداد";
      break;
    case "4":
      month = "تیر";
      break;
    case "5":
      month = "مرداد";
      break;
    case "6":
      month = "شهریور";
      break;
    case "7":
      month = "مهر";
      break;
    case "8":
      month = "آبان";
      break;
    case "9":
      month = "اذر";
      break;
    case "10":
      month = "دی";
      break;
    case "11":
      month = "بهمن";
      break;
    case "12":
      month = "اسفند";
      break;
  }

  let persianTime = arr[2] + " " + month + " " + arr[0];
  return persianTime + " | "+ clock.split('|')[1];
};

export const diffDates = (start, end) => {
  let a = moment(start);
  let b = moment(end);
  return a.diff(b, "days");
};

export const gregorianMomentYear = (timeDate = "null") => {
  if (timeDate == null) return;
  console.log("formatter>> time date is:", timeDate);
  let m = moment(timeDate, 'jYYYY/jM/jD') // Parse a Jalaali date
  return m.format('YYYY-MM-DD')

};