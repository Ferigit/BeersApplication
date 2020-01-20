export const capilizeString = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const uncapilizeString = str => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const getPelakCode = str => {
  switch (str) {
    case "01":
      return "الف";
      break;
    case "02":
      return "ب";
      break;
    case "03":
      return "پ";
      break;
    case "04":
      return "ت";
      break;
    case "05":
      return "ث";
      break;
    case "06":
      return "ج";
      break;
    case "07":
      return "چ";
      break;
    case "08":
      return "ح";
      break;
    case "09":
      return "خ";
      break;
    case "10":
      return "د";
      break;
    case "11":
      return "ذ";
      break;
    case "12":
      return "ر";
      break;
    case "13":
      return "ز";
      break;
    case "14":
      return "ژ";
      break;
    case "15":
      return "س";
      break;
    case "16":
      return "ش";
      break;
    case "17":
      return "ص";
      break;
    case "18":
      return "ض";
      break;
    case "19":
      return "ط";
      break;
    case "20":
      return "ش";
      break;
    case "21":
      return "ع";
      break;
    case "22":
      return "غ";
      break;
    case "23":
      return "ف";
      break;
    case "24":
      return "ق";
      break;
    case "25":
      return "ک";
      break;
    case "26":
      return "گ";
      break;
    case "27":
      return "ل";
      break;
    case "28":
      return "م";
      break;
    case "29":
      return "ن";
      break;
    case "30":
      return "و";
      break;
    case "31":
      return "ه";
      break;
    case "32":
      return "ی";
      break;
    case "33":
      return "معلولین";
      break;
    case "54":
      return "D";
      break;
    case "69":
      return "S";
      break;
  }
};
